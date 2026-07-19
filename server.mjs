import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

try {
  process.loadEnvFile?.();
} catch {
  // `.env` is optional; deployment environments normally inject variables.
}

const root = fileURLToPath(new URL('./public/', import.meta.url));
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || '0.0.0.0';
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml' };

function localFeedback(answer = '') {
  const text = String(answer).normalize('NFKC').toLowerCase();
  const categories = {
    character: /\b(lumi|firefly)\b/.test(text),
    action: /\b(help(?:ed|ing|s)?|wait(?:ed|ing|s)?(?:\s+patiently)?|patient(?:ly|ce)?|gentl(?:e|y)|guid(?:e|ed|ing|es)|protect(?:ed|ing|s)?)\b/.test(text),
    outcome: /\b(?:path|forest)\b[^.!?]{0,60}\b(?:safe|safer|bright|brighter|glow(?:ed|ing|s)?)\b|\b(?:safe|safer|bright|brighter|glow(?:ed|ing|s)?)\b[^.!?]{0,60}\b(?:path|forest)\b|\blantern\b[^.!?]{0,60}\b(?:restor(?:e|ed|ing)|relit|lit|glow(?:ed|ing|s)?|bright|brighter)\b|\b(?:restor(?:e|ed|ing)|relit|lit)\b[^.!?]{0,60}\blantern\b/.test(text)
  };
  const evidence = Object.entries(categories).filter(([, present]) => present).map(([category]) => category);
  const understood = Object.values(categories).every(Boolean);
  return {
    understood,
    evidence,
    message: understood
      ? 'You noticed how Nia helped the firefly patiently and made the forest safer. That shows strong story understanding.'
      : 'You remembered part of the mission. Look again for who needed help, what Nia did, and what changed in the forest.',
    nextPrompt: understood ? 'What does patience mean in your own words?' : 'Who did Nia help, and how did she help?'
  };
}

async function aiFeedback(answer) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-5.6',
        input: [
          {
            role: 'system',
            content: 'Assess a child’s retelling of a fixed story. Be warm, concise, non-shaming, and do not ask for personal information. Understanding requires who needed help (Lumi/firefly), Nia’s gentle or patient help, and the safer or brighter outcome. Never reward unsupported completion.'
          },
          { role: 'user', content: `Child retelling: ${String(answer).slice(0, 500)}` }
        ],
        text: {
          format: {
            type: 'json_schema',
            name: 'reading_feedback',
            strict: true,
            schema: {
              type: 'object',
              additionalProperties: false,
              properties: {
                understood: { type: 'boolean' },
                evidence: { type: 'array', items: { type: 'string' }, maxItems: 4 },
                message: { type: 'string' },
                nextPrompt: { type: 'string' }
              },
              required: ['understood', 'evidence', 'message', 'nextPrompt']
            }
          }
        },
        max_output_tokens: 220
      })
    });
    if (!response.ok) return null;
    const payload = await response.json();
    const raw = payload.output_text || payload.output?.flatMap((item) => item.content || []).find((item) => item.type === 'output_text')?.text;
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return typeof parsed.understood === 'boolean' ? parsed : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

async function bodyOf(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
}

const server = createServer(async (request, response) => {
  try {
    if (request.method === 'GET' && request.url?.split('?')[0] === '/health') {
      response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
      response.end(JSON.stringify({ status: 'ok' }));
      return;
    }
    if (request.method === 'POST' && request.url === '/api/comprehension') {
      const { answer } = await bodyOf(request);
      const deterministic = localFeedback(answer);
      const enhanced = deterministic.understood ? await aiFeedback(answer) : null;
      response.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
        'X-Feedback-Source': enhanced ? 'ai' : 'local'
      });
      response.end(JSON.stringify(enhanced ? { ...enhanced, understood: true, evidence: deterministic.evidence } : deterministic));
      return;
    }
    const requested = request.url === '/' ? 'index.html' : request.url.split('?')[0].replace(/^\/+/, '');
    const safe = normalize(requested).replace(/^(\.\.[/\\])+/, '');
    const path = join(root, safe);
    if (!path.startsWith(root)) throw new Error('Unsafe path');
    const content = await readFile(path);
    response.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff' });
    response.end(content);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  }
});

server.listen(port, host, () => console.log(`Read2Earn Kids running on ${host}:${port}`));
