/**
 * Read2Earn Kids component architecture registry.
 *
 * This module names future components and their required states. It deliberately
 * renders nothing and does not replace or modify the current prototype UI.
 */

import { designTokens } from './tokens.js';

const interactiveStates = Object.freeze([
  'default',
  'focus-visible',
  'pressed',
  'selected',
  'disabled',
  'loading'
]);

const component = (name, variants, requirements = []) => Object.freeze({
  name,
  variants: Object.freeze(variants),
  states: interactiveStates,
  requirements: Object.freeze(requirements)
});

export const componentCatalog = Object.freeze({
  button: component(
    'ActionButton',
    ['primary', 'secondary', 'reward', 'navigation'],
    ['48px minimum target', 'visible focus', 'accessible name', 'stable loading label']
  ),
  card: component(
    'ContentCard',
    ['book', 'mission', 'achievement', 'parent-report'],
    ['semantic heading', 'explicit state text', 'no nested competing actions']
  ),
  dialog: component(
    'GuidanceDialog',
    ['grown-up-confirmation', 'help-prompt', 'reward-celebration'],
    ['labelled title', 'managed focus', 'escape or close action', 'reduced-motion equivalent']
  ),
  progress: component(
    'LearningProgress',
    ['reading', 'knowledge-gem', 'learning-passport'],
    ['text equivalent', 'current and maximum values', 'evidence before reward']
  ),
  navigation: component(
    'ExperienceNavigation',
    ['child', 'parent'],
    ['current location', 'keyboard order', 'predictable home action', 'no gesture-only path']
  ),
  choice: component(
    'ChoiceTile',
    ['companion', 'reading-level', 'reading-mode', 'enjoyment-rating'],
    ['native choice semantics', 'label and description', 'non-color selected state']
  ),
  feedback: component(
    'LearningFeedback',
    ['field-message', 'status-toast', 'comprehension-clue', 'evidence-summary'],
    ['warm recovery language', 'controlled live-region lifecycle', 'persistent critical information']
  )
});

export const componentDefaults = Object.freeze({
  touchTarget: designTokens.size.touchTargetMinimum,
  focusRing: designTokens.elevation.focusRing,
  transitionDuration: designTokens.motion.duration.component,
  reducedMotionDuration: designTokens.motion.reduced.duration
});

export { interactiveStates };
