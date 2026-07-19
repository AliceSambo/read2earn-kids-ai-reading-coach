/** Accessible, side-effect-free DOM component primitives for the design lab. */

import { applyDesignTokens, designTokens } from './tokens.js';

const requireLabel = (label) => {
  if (typeof label !== 'string' || !label.trim()) throw new TypeError('Components require a visible label.');
  return label.trim();
};

const element = (tag, className, text) => {
  const node = document.createElement(tag);
  node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

const button = (variant, { label, onActivate, disabled = false, ariaLabel } = {}) => {
  const control = element('button', `r2e-button r2e-button--${variant}`, requireLabel(label));
  control.type = 'button';
  control.disabled = Boolean(disabled);
  if (ariaLabel) control.setAttribute('aria-label', ariaLabel);
  if (typeof onActivate === 'function') control.addEventListener('click', onActivate);
  return control;
};

export const PrimaryButton = (options) => button('primary', options);
export const SecondaryButton = (options) => button('secondary', options);
export const RewardButton = (options) => button('reward', options);
export const NavigationButton = (options) => button('navigation', options);

const card = (variant, { title, description, status, action } = {}) => {
  const article = element('article', `r2e-card r2e-card--${variant}`);
  const heading = element('h3', 'r2e-card__title', requireLabel(title));
  article.append(heading);
  if (description) article.append(element('p', 'r2e-card__description', description));
  if (status) article.append(element('p', 'r2e-card__status', status));
  if (action instanceof HTMLElement) article.append(action);
  article.setAttribute('aria-label', title);
  return article;
};

export const BookCard = (options) => card('book', options);
export const MissionCard = (options) => card('mission', options);
export const AchievementCard = (options) => card('achievement', options);
export const LearningReportCard = (options) => card('learning-report', options);

const focusableSelector = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function dialog(variant, { title, body, confirmLabel = 'Continue', onConfirm } = {}) {
  const overlay = element('div', 'r2e-dialog-overlay');
  overlay.hidden = true;
  const panel = element('section', `r2e-dialog r2e-dialog--${variant}`);
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');
  const titleId = `r2e-dialog-${crypto.randomUUID?.() || Math.random().toString(36).slice(2)}`;
  const heading = element('h2', 'r2e-dialog__title', requireLabel(title));
  heading.id = titleId;
  panel.setAttribute('aria-labelledby', titleId);
  const copy = element('p', 'r2e-dialog__body', body || '');
  const actions = element('div', 'r2e-dialog__actions');
  const closeButton = SecondaryButton({ label: 'Close' });
  const confirmButton = PrimaryButton({ label: confirmLabel, onActivate: () => { onConfirm?.(); api.close(); } });
  actions.append(closeButton, confirmButton);
  panel.append(heading, copy, actions);
  overlay.append(panel);

  let opener = null;
  const handleKeydown = (event) => {
    if (event.key === 'Escape') { event.preventDefault(); api.close(); return; }
    if (event.key !== 'Tab') return;
    const controls = [...panel.querySelectorAll(focusableSelector)];
    if (!controls.length) return;
    const first = controls[0];
    const last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  };

  const api = Object.freeze({
    element: overlay,
    panel,
    open(trigger = document.activeElement) {
      opener = trigger instanceof HTMLElement ? trigger : null;
      overlay.hidden = false;
      document.addEventListener('keydown', handleKeydown);
      closeButton.focus();
    },
    close() {
      overlay.hidden = true;
      document.removeEventListener('keydown', handleKeydown);
      opener?.focus();
    },
    destroy() {
      document.removeEventListener('keydown', handleKeydown);
      overlay.remove();
    }
  });
  closeButton.addEventListener('click', api.close);
  return api;
}

export const ConfirmationDialog = (options) => dialog('confirmation', options);
export const HelpDialog = (options) => dialog('help', options);
export const RewardDialog = (options) => dialog('reward', options);

export const companionEmotionStates = Object.freeze(['happy', 'thinking', 'encouraging', 'celebrating', 'resting']);

export const CompanionAvatar = ({ appearance = 'trail-guide', name = 'My companion', emotion = 'happy' } = {}) => {
  if (!companionEmotionStates.includes(emotion)) throw new RangeError('Unsupported companion emotion state.');
  const avatar = element('div', `r2e-companion r2e-companion--${appearance} r2e-companion--${emotion}`);
  avatar.setAttribute('role', 'img');
  avatar.setAttribute('aria-label', `${name}, companion feeling ${emotion}`);
  avatar.dataset.emotion = emotion;
  avatar.textContent = appearance === 'spark-inventor' ? '✦' : '●';
  return avatar;
};

export const CompanionSpeechBubble = ({ companionName = 'Your companion', message } = {}) => {
  const bubble = element('aside', 'r2e-companion-speech');
  bubble.setAttribute('aria-label', `${companionName} says`);
  bubble.append(element('p', '', requireLabel(message)));
  return bubble;
};

export const CompanionEmotionState = (avatar, emotion) => {
  if (!(avatar instanceof HTMLElement) || !companionEmotionStates.includes(emotion)) throw new TypeError('A companion avatar and supported emotion are required.');
  for (const state of companionEmotionStates) avatar.classList.remove(`r2e-companion--${state}`);
  avatar.classList.add(`r2e-companion--${emotion}`);
  avatar.dataset.emotion = emotion;
  const name = avatar.getAttribute('aria-label')?.split(',')[0] || 'Companion';
  avatar.setAttribute('aria-label', `${name}, companion feeling ${emotion}`);
  return avatar;
};

export const componentCatalog = Object.freeze({
  buttons: [PrimaryButton, SecondaryButton, RewardButton, NavigationButton],
  cards: [BookCard, MissionCard, AchievementCard, LearningReportCard],
  dialogs: [ConfirmationDialog, HelpDialog, RewardDialog],
  companions: [CompanionAvatar, CompanionSpeechBubble, CompanionEmotionState]
});

export const componentDefaults = Object.freeze({
  touchTarget: designTokens.size.touchTargetMinimum,
  transitionDuration: designTokens.motion.duration.standard,
  reducedMotionDuration: designTokens.motion.duration.reduced
});

export function initializeDesignSystem(root = document.documentElement) {
  applyDesignTokens(root);
  root.dataset.read2earnDesignSystem = 'ready';
  return root;
}
