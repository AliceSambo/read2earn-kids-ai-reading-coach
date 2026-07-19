/**
 * Read2Earn Kids semantic design tokens.
 *
 * The live prototype does not import this module yet. The component laboratory
 * consumes it in isolation so future screen migrations stay reversible.
 */

const freeze = (value) => Object.freeze(value);

export const designTokens = freeze({
  color: freeze({
    brand: freeze({ primary: '#5B4BDB', primaryStrong: '#4032AF', secondary: '#25877F', accent: '#E76F51' }),
    background: freeze({ page: '#FCFBFF', surface: '#FFFFFF', story: '#FFF8E8', childTint: '#F1EFFF', adult: '#F5F7FA' }),
    text: freeze({ primary: '#24203B', secondary: '#59556B', inverse: '#FFFFFF', link: '#205F99' }),
    state: freeze({ success: '#237A52', reward: '#8A5A00', warning: '#8A4F00', error: '#A62F49', information: '#205F99' }),
    border: freeze({ default: '#C8C3D8', strong: '#716B82', focus: '#005FCC' }),
    contrast: freeze({ onPrimary: '#FFFFFF', onReward: '#24203B', disabledText: '#575364', disabledSurface: '#E2DFE9' })
  }),
  typography: freeze({
    family: freeze({
      display: '"Nunito Sans", system-ui, "Segoe UI", sans-serif',
      reading: '"Atkinson Hyperlegible Next", "Atkinson Hyperlegible", system-ui, sans-serif',
      ui: '"Nunito Sans", system-ui, "Segoe UI", sans-serif'
    }),
    role: freeze({
      display: freeze({ size: 'clamp(2.25rem, 7vw, 4.5rem)', lineHeight: 1.12, weight: 800 }),
      reading: freeze({ size: 'clamp(1.125rem, 2vw, 1.25rem)', lineHeight: 1.65, weight: 400 }),
      ui: freeze({ size: '1rem', lineHeight: 1.5, weight: 600 }),
      button: freeze({ size: '1rem', lineHeight: 1.25, weight: 700 }),
      parentDashboard: freeze({ size: '1rem', lineHeight: 1.55, weight: 400 })
    }),
    measure: freeze({ reading: '45rem', parent: '70ch' })
  }),
  spacing: freeze({ small: '0.5rem', medium: '1rem', large: '1.5rem', extraLarge: '2.5rem' }),
  radius: freeze({ control: '0.875rem', card: '1.5rem', adultCard: '1rem', dialog: '1.75rem', round: '999px' }),
  motion: freeze({
    duration: freeze({ fast: '100ms', standard: '200ms', reward: '650ms', reduced: '1ms' }),
    easing: freeze({ standard: 'cubic-bezier(0.4, 0, 0.2, 1)', enter: 'cubic-bezier(0.2, 0.8, 0.2, 1)' }),
    reduced: freeze({ transform: 'none', iterationCount: 1 })
  }),
  size: freeze({ touchTargetMinimum: '3rem', contentMaximum: '70rem' }),
  elevation: freeze({ card: '0 0.5rem 1.5rem rgb(36 32 59 / 0.09)', dialog: '0 1.5rem 4rem rgb(36 32 59 / 0.18)' }),
  layer: freeze({ base: 0, navigation: 10, overlay: 100, dialog: 110, status: 120 })
});

export const cssTokenMap = freeze({
  '--r2e-brand-primary': designTokens.color.brand.primary,
  '--r2e-brand-primary-strong': designTokens.color.brand.primaryStrong,
  '--r2e-brand-secondary': designTokens.color.brand.secondary,
  '--r2e-brand-accent': designTokens.color.brand.accent,
  '--r2e-page': designTokens.color.background.page,
  '--r2e-surface': designTokens.color.background.surface,
  '--r2e-story': designTokens.color.background.story,
  '--r2e-child-tint': designTokens.color.background.childTint,
  '--r2e-adult-canvas': designTokens.color.background.adult,
  '--r2e-text': designTokens.color.text.primary,
  '--r2e-text-muted': designTokens.color.text.secondary,
  '--r2e-text-inverse': designTokens.color.text.inverse,
  '--r2e-success': designTokens.color.state.success,
  '--r2e-reward': designTokens.color.state.reward,
  '--r2e-warning': designTokens.color.state.warning,
  '--r2e-error': designTokens.color.state.error,
  '--r2e-focus': designTokens.color.border.focus,
  '--r2e-border': designTokens.color.border.default,
  '--r2e-space-s': designTokens.spacing.small,
  '--r2e-space-m': designTokens.spacing.medium,
  '--r2e-space-l': designTokens.spacing.large,
  '--r2e-space-xl': designTokens.spacing.extraLarge,
  '--r2e-radius-control': designTokens.radius.control,
  '--r2e-radius-card': designTokens.radius.card,
  '--r2e-motion-fast': designTokens.motion.duration.fast,
  '--r2e-motion-standard': designTokens.motion.duration.standard,
  '--r2e-motion-reward': designTokens.motion.duration.reward,
  '--r2e-font-display': designTokens.typography.family.display,
  '--r2e-font-reading': designTokens.typography.family.reading,
  '--r2e-font-ui': designTokens.typography.family.ui
});

export function applyDesignTokens(root = document.documentElement) {
  for (const [name, value] of Object.entries(cssTokenMap)) root.style.setProperty(name, value);
  return root;
}

export default designTokens;
