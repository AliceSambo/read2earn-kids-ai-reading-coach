const state = {
  screen: 'welcome', childName: '', companionName: 'Kiko', avatar: '🦊', mode: 'together', page: 0,
  story: null, wordsExplored: new Set(), answer: '', feedback: null, rating: null, gems: 0,
  quiet: false, reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches, speechRate: .9,
  readingLevel: 'emerging', grownUpConfirmed: false
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const blockedNameWords = new Set(['hate', 'kill', 'sex', 'stupid', 'idiot']);
let recognition;
let toastTimeout = null;

async function loadStory() {
  const response = await fetch('/data/story.json');
  state.story = await response.json();
}

function showScreen(name) {
  if (!name || (name === 'map' && !state.grownUpConfirmed)) name = name === 'map' ? (state.childName ? 'confirm' : 'welcome') : name;
  state.screen = name;
  $$('.screen').forEach((screen) => {
    const active = screen.dataset.screen === name;
    screen.classList.toggle('active', active);
    screen.hidden = !active;
  });
  clearToast();
  window.speechSynthesis?.cancel();
  window.scrollTo({ top: 0, behavior: state.reducedMotion ? 'auto' : 'smooth' });
  requestAnimationFrame(() => $('.screen.active')?.focus({ preventScroll: true }));
}

function clearToast() {
  const node = $('#toast');
  node.classList.remove('show');
  node.textContent = '';
  if (toastTimeout !== null) clearTimeout(toastTimeout);
  toastTimeout = null;
}

function toast(message) {
  clearToast();
  const node = $('#toast');
  node.textContent = message;
  node.classList.add('show');
  toastTimeout = setTimeout(() => {
    node.classList.remove('show');
    node.textContent = '';
    toastTimeout = null;
  }, 2400);
}

function cleanName(value, fallback) {
  const clean = String(value).normalize('NFKC').trim().replace(/[^\p{L}' -]/gu, '').replace(/\s+/g, ' ').slice(0, 18);
  if (!clean) return fallback;
  const words = clean.toLocaleLowerCase().split(/[\s'-]+/u).filter(Boolean);
  if (words.some((word) => blockedNameWords.has(word))) return null;
  return clean;
}

function saveCompanion() {
  const child = cleanName($('#childName').value, 'Explorer');
  const companion = cleanName($('#companionName').value, 'Kiko');
  if (!child || !companion) {
    $('#nameError').textContent = 'Our basic local screening flagged a name. It is not guaranteed moderation; please ask a grown-up to review or correct it.';
    return;
  }
  state.childName = child;
  state.companionName = companion;
  state.avatar = $('input[name=avatar]:checked').value;
  $('#nameError').textContent = '';
  updateIdentity();
  renderConfirmation();
  showScreen('confirm');
}

function renderConfirmation() {
  $('#confirmChildName').textContent = state.childName;
  $('#confirmAvatar').textContent = state.avatar;
  $('#confirmCompanionName').textContent = state.companionName;
  $('#onboardingQuietMode').checked = state.quiet;
  $('#onboardingSpeechRate').value = state.speechRate;
  $('#onboardingSpeedOutput').textContent = `${state.speechRate.toFixed(1)}×`;
}

function confirmProfile() {
  if (!$('#grownUpGate').checked) return;
  state.readingLevel = $('input[name=readingLevel]:checked')?.value || 'emerging';
  state.quiet = $('#onboardingQuietMode').checked;
  state.speechRate = Number($('#onboardingSpeechRate').value);
  state.grownUpConfirmed = true;
  localStorage.setItem('read2earn-demo-profile', JSON.stringify({
    childName: state.childName, companionName: state.companionName, avatar: state.avatar,
    readingLevel: state.readingLevel, quiet: state.quiet, speechRate: state.speechRate, grownUpConfirmed: true
  }));
  $('#quietMode').checked = state.quiet;
  $('#speechRate').value = state.speechRate;
  $('#speedOutput').textContent = `${state.speechRate.toFixed(1)}×`;
  updateIdentity();
  showScreen('map');
}

function updateIdentity() {
  $('#mapGreeting').textContent = `Welcome, ${state.childName}. Every path holds something new to discover.`;
  ['#mapAvatar','#modeAvatar','#readerAvatar','#questionAvatar','#reportAvatar'].forEach((id) => $(id).textContent = state.avatar);
  $('#mapCompanion').textContent = state.companionName;
  $('#readerEncouragement').textContent = `${state.companionName} is exploring with you.`;
  $('#reportName').textContent = state.childName;
  $('#reportCompanion').textContent = state.companionName;
  $('#reportLevel').textContent = ({ emerging: 'Emerging Reader', growing: 'Growing Reader', confident: 'Confident Reader' })[state.readingLevel] || 'Emerging Reader';
}

function selectMode(mode) {
  state.mode = mode;
  state.page = 0;
  const labels = { self: 'Read by myself', together: `Read with ${state.companionName}`, listen: 'Listen and follow' };
  $('#readingModeLabel').textContent = labels[mode];
  renderPage();
  showScreen('reader');
  if (mode === 'listen') setTimeout(() => speakCurrentPart(), 450);
}

function renderPage() {
  const paragraph = state.story.paragraphs[state.page];
  let html = paragraph;
  Object.keys(state.story.words).forEach((word) => {
    html = html.replace(new RegExp(`\\b(${word})\\b`, 'gi'), `<button class="vocab-word" data-word="${word.toLowerCase()}">$1</button>`);
  });
  $('#storyText').innerHTML = html;
  $('#pageNumber').textContent = state.page + 1;
  $('#storyProgress').style.width = `${((state.page + 1) / state.story.paragraphs.length) * 100}%`;
  $('#nextPage').textContent = state.page === state.story.paragraphs.length - 1 ? 'Tell what happened →' : 'Next part →';
  const encouragements = [
    `${state.companionName} spotted a light ahead.`,
    `${state.companionName} noticed Nia chose to be gentle.`,
    `${state.companionName} is waiting patiently with Lumi.`,
    `${state.companionName} can see the safe path glowing!`
  ];
  $('#readerEncouragement').textContent = encouragements[state.page];
  $('#wordHelp').hidden = true;
  $$('.vocab-word').forEach((button) => button.addEventListener('click', () => showWord(button.dataset.word)));
}

function showWord(word) {
  const detail = state.story.words[word];
  if (!detail) return;
  state.wordsExplored.add(word);
  $('#helpWord').textContent = word;
  $('#helpSyllables').textContent = `Say it in parts: ${detail.syllables}`;
  $('#helpMeaning').textContent = detail.meaning;
  $('#wordHelp').hidden = false;
  $('#sayWord').dataset.word = word;
  $('#wordHelp').scrollIntoView({ behavior: state.reducedMotion ? 'auto' : 'smooth', block: 'nearest' });
}

function speak(text) {
  if (state.quiet || !window.speechSynthesis || typeof window.SpeechSynthesisUtterance !== 'function') {
    toast(state.quiet ? 'Quiet mode is on.' : 'Spoken narration is not supported here.');
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new window.SpeechSynthesisUtterance(text);
  utterance.rate = state.speechRate;
  utterance.pitch = 1.05;
  utterance.onstart = () => $('#storyText').classList.add('is-speaking');
  utterance.onend = () => $('#storyText').classList.remove('is-speaking');
  utterance.onerror = () => $('#storyText').classList.remove('is-speaking');
  window.speechSynthesis.speak(utterance);
}

function speakCurrentPart() { speak(state.story.paragraphs[state.page]); }

function nextPage() {
  window.speechSynthesis?.cancel();
  if (state.page < state.story.paragraphs.length - 1) {
    state.page += 1;
    renderPage();
    if (state.mode === 'listen') speakCurrentPart();
  } else showScreen('comprehension');
}

function toggleAnswerMode(mode) {
  const voice = mode === 'voice';
  $('#typeTab').classList.toggle('active', !voice);
  $('#voiceTab').classList.toggle('active', voice);
  $('#typeTab').setAttribute('aria-pressed', String(!voice));
  $('#voiceTab').setAttribute('aria-pressed', String(voice));
  $('#voiceBox').hidden = !voice;
  $('#answerText').hidden = voice;
}

function startRecognition() {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) {
    $('#voiceStatus').textContent = 'Voice answers are not supported in this browser. Please use the typing option.';
    return;
  }
  recognition = new Recognition();
  recognition.lang = 'en';
  recognition.interimResults = true;
  recognition.onstart = () => { $('#voiceStatus').textContent = 'Listening… speak in your own words.'; $('#recordButton').classList.add('recording'); };
  recognition.onresult = (event) => { $('#answerText').value = [...event.results].map((result) => result[0].transcript).join(' '); };
  recognition.onerror = () => { $('#voiceStatus').textContent = 'I could not hear that clearly. You can try again or type your answer.'; };
  recognition.onend = () => { $('#recordButton').classList.remove('recording'); $('#voiceStatus').textContent = 'Your answer is ready. You can edit it in typing mode before sending.'; };
  recognition.start();
}

async function checkAnswer() {
  const answer = $('#answerText').value.trim();
  if (answer.length < 12) {
    $('#answerError').textContent = 'Tell us a little more. Who needed help, and what did Nia do?';
    return;
  }
  $('#answerError').textContent = '';
  $('#checkAnswer').disabled = true;
  $('#checkAnswer').textContent = 'Thinking with you…';
  try {
    const response = await fetch('/api/comprehension', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ answer }) });
    if (!response.ok) throw new Error('Feedback unavailable');
    state.feedback = await response.json();
  } catch {
    state.feedback = { understood: false, evidence: [], message: 'You shared an important idea. Let’s look once more at who Nia helped and what became safer.', nextPrompt: 'What changed after Nia waited patiently?' };
  }
  state.answer = answer;
  $('#feedbackTitle').textContent = state.feedback.understood ? `That was thoughtful, ${state.childName}!` : 'You found part of the story!';
  $('#feedbackMessage').textContent = state.feedback.message;
  $('#nextPrompt').textContent = state.feedback.nextPrompt;
  $('#promptLabel').textContent = state.feedback.understood ? 'Think a little deeper:' : 'Try this clue:';
  $('#continueToReward').textContent = state.feedback.understood ? 'Continue mission →' : 'Improve my answer';
  $('#feedbackCard').hidden = false;
  $('#checkAnswer').hidden = true;
  $('#feedbackCard').scrollIntoView({ behavior: state.reducedMotion ? 'auto' : 'smooth' });
}

function continueToReward() {
  if (!state.feedback?.understood) {
    $('#feedbackCard').hidden = true;
    $('#checkAnswer').hidden = false;
    $('#checkAnswer').disabled = false;
    $('#checkAnswer').textContent = 'Share with my companion';
    toggleAnswerMode('type');
    $('#answerText').focus();
    toast('Your effort counts. Use the clue and add to your answer.');
    return;
  }
  state.gems = 1;
  $('#gemCount').textContent = state.gems;
  const evidence = state.feedback.evidence?.length ? `Evidence: your answer included ${state.feedback.evidence.join(', ')}.` : 'Evidence: you explained the helping action and story outcome with support.';
  $('#gemEvidence').textContent = evidence;
  $('#rewardMessage').textContent = state.feedback.message;
  showScreen('reward');
}

function finishMission() {
  state.rating = Number($('input[name=rating]:checked')?.value || 0) || null;
  updateReport();
  const saved = { childName: state.childName, companionName: state.companionName, avatar: state.avatar, readingLevel: state.readingLevel, grownUpConfirmed: state.grownUpConfirmed, mode: state.mode, words: [...state.wordsExplored], rating: state.rating, gems: state.gems, evidence: state.feedback?.evidence || [], feedback: state.feedback };
  localStorage.setItem('read2earn-demo-progress', JSON.stringify(saved));
  showScreen('report');
}

function updateReport() {
  const completed = state.gems > 0 && state.feedback?.understood;
  $('#reportStories').textContent = completed ? '1' : '0';
  $('#reportGems').textContent = state.gems || 0;
  $('#reportRating').textContent = state.rating ?? '—';
  $('#reportWords').textContent = state.wordsExplored.size ? [...state.wordsExplored].join(' • ') : 'No words selected this time';
  $('#reportMode').textContent = completed ? { self: 'Read independently', together: `Read with ${state.companionName}`, listen: 'Listen and follow' }[state.mode] : 'Not selected yet';
  $('#reportSupport').textContent = completed ? `${state.wordsExplored.size} word${state.wordsExplored.size === 1 ? '' : 's'} explored; optional narration was available.` : 'The child can choose independent, companion-supported, or listen-and-follow reading.';
  $('#reportUnderstanding').textContent = completed ? 'Main idea demonstrated' : 'Mission not completed yet';
  $('#reportEvidence').textContent = completed ? state.feedback.message : 'Complete the Story Forest mission to create evidence of understanding.';
  $('#evidencePill').textContent = completed ? '✓ Evidence-backed' : 'Awaiting evidence';
}

function restoreProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem('read2earn-demo-progress'));
    if (!saved) return;
    Object.assign(state, saved, {
      wordsExplored: new Set(saved.words || []),
      feedback: saved.feedback || (saved.gems ? { understood: true, evidence: saved.evidence || [], message: 'The saved mission shows demonstrated story understanding.' } : null)
    });
    updateIdentity(); updateReport(); $('#gemCount').textContent = state.gems;
  } catch { localStorage.removeItem('read2earn-demo-progress'); }
}

function restoreProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem('read2earn-demo-profile'));
    if (!saved?.grownUpConfirmed) return;
    Object.assign(state, saved);
    updateIdentity();
  } catch { localStorage.removeItem('read2earn-demo-profile'); }
}

function bindEvents() {
  $$('[data-go]').forEach((button) => button.addEventListener('click', () => showScreen(button.dataset.go)));
  $('#saveCompanion').addEventListener('click', saveCompanion);
  $('#backToSetup').addEventListener('click', () => showScreen('setup'));
  $('#grownUpGate').addEventListener('change', (event) => { $('#confirmProfile').disabled = !event.target.checked; });
  $('#confirmProfile').addEventListener('click', confirmProfile);
  $('#onboardingSpeechRate').addEventListener('input', (event) => { $('#onboardingSpeedOutput').textContent = `${Number(event.target.value).toFixed(1)}×`; });
  $$('[data-mode]').forEach((button) => button.addEventListener('click', () => selectMode(button.dataset.mode)));
  $('#nextPage').addEventListener('click', nextPage);
  $('#narrateButton').addEventListener('click', speakCurrentPart);
  $('#sayWord').addEventListener('click', () => speak($('#sayWord').dataset.word));
  $('.close-help').addEventListener('click', () => $('#wordHelp').hidden = true);
  $('#typeTab').addEventListener('click', () => toggleAnswerMode('type'));
  $('#voiceTab').addEventListener('click', () => toggleAnswerMode('voice'));
  $('#recordButton').addEventListener('click', startRecognition);
  $('#checkAnswer').addEventListener('click', checkAnswer);
  $('#continueToReward').addEventListener('click', continueToReward);
  $('#finishMission').addEventListener('click', finishMission);
  $('#settingsButton').addEventListener('click', () => $('#settingsDialog').showModal());
  $('#quietMode').addEventListener('change', (event) => { state.quiet = event.target.checked; if (state.quiet) window.speechSynthesis?.cancel(); });
  $('#printReport').addEventListener('click', () => window.print());
  $('#reducedMotion').addEventListener('change', (event) => { state.reducedMotion = event.target.checked; document.body.classList.toggle('reduce-motion', state.reducedMotion); });
  $('#speechRate').addEventListener('input', (event) => { state.speechRate = Number(event.target.value); $('#speedOutput').textContent = `${state.speechRate.toFixed(1)}×`; });
  $('#settingsDialog').addEventListener('close', () => {
    localStorage.setItem('read2earn-demo-settings', JSON.stringify({ quiet: state.quiet, reducedMotion: state.reducedMotion, speechRate: state.speechRate }));
  });
}

function restoreSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem('read2earn-demo-settings'));
    if (!saved) return;
    state.quiet = Boolean(saved.quiet);
    state.reducedMotion = Boolean(saved.reducedMotion);
    state.speechRate = Number(saved.speechRate) || .9;
  } catch { localStorage.removeItem('read2earn-demo-settings'); }
}

await loadStory();
$$('.screen').forEach((screen) => screen.hidden = screen.dataset.screen !== 'welcome');
bindEvents();
restoreSettings();
restoreProfile();
restoreProgress();
document.body.classList.toggle('reduce-motion', state.reducedMotion);
$('#reducedMotion').checked = state.reducedMotion;
$('#quietMode').checked = state.quiet;
$('#speechRate').value = state.speechRate;
$('#speedOutput').textContent = `${state.speechRate.toFixed(1)}×`;
