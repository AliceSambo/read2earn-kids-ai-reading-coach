/**
 * Read2Earn Kids design tokens.
 *
 * Architecture only: the current prototype does not import this module yet.
 * Components should consume semantic roles rather than hard-coded values.
 */

export const designTokens = Object.freeze({
  color: Object.freeze({
    brand: Object.freeze({
      journeyViolet: '#5B4BDB',
      journeyVioletDark: '#4032AF',
      discoveryBlue: '#2F79C8',
      canopyTeal: '#25877F',
      companionCoral: '#E76F51'
    }),
    text: Object.freeze({
      primary: '#24203B',
      secondary: '#59556B',
      inverse: '#FFFFFF',
      link: '#286FAE'
    }),
    surface: Object.freeze({
      page: '#FCFBFF',
      raised: '#FFFFFF',
      lavenderMist: '#F1EFFF',
      warmParchment: '#FFF8E8',
      adultCanvas: '#F5F7FA',
      border: '#D9D6E5'
    }),
    state: Object.freeze({
      success: '#237A52',
      learningReward: '#D39A16',
      warning: '#A15F00',
      error: '#B5415A',
      information: '#286FAE',
      focus: '#1463D6'
    })
  }),
  spacing: Object.freeze({
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem'
  }),
  radius: Object.freeze({
    control: '0.875rem',
    cardAdult: '1rem',
    cardChild: '1.5rem',
    dialog: '1.75rem',
    round: '999px'
  }),
  typography: Object.freeze({
    family: Object.freeze({
      display: '"Nunito Sans", system-ui, "Segoe UI", sans-serif',
      reading: '"Atkinson Hyperlegible Next", "Atkinson Hyperlegible", system-ui, sans-serif',
      ui: '"Nunito Sans", system-ui, "Segoe UI", sans-serif'
    }),
    size: Object.freeze({
      label: '0.875rem',
      body: '1rem',
      bodyChild: '1.125rem',
      reading: '1.25rem',
      title: 'clamp(1.75rem, 4vw, 2.75rem)',
      display: 'clamp(2.25rem, 7vw, 4.5rem)'
    }),
    lineHeight: Object.freeze({
      compact: 1.2,
      ui: 1.4,
      body: 1.55,
      reading: 1.65
    }),
    weight: Object.freeze({
      regular: 400,
      medium: 600,
      bold: 700,
      extraBold: 800
    })
  }),
  motion: Object.freeze({
    duration: Object.freeze({
      instant: '100ms',
      component: '180ms',
      screen: '280ms',
      storyTransform: '650ms'
    }),
    easing: Object.freeze({
      enter: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      exit: 'cubic-bezier(0.4, 0, 1, 1)',
      standard: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }),
    reduced: Object.freeze({
      duration: '0ms',
      transform: 'none'
    })
  }),
  size: Object.freeze({
    touchTargetMinimum: '3rem',
    readingMeasure: '45rem',
    contentMeasure: '70rem'
  }),
  elevation: Object.freeze({
    card: '0 0.5rem 1.5rem rgb(36 32 59 / 0.08)',
    dialog: '0 1.5rem 4rem rgb(36 32 59 / 0.16)',
    focusRing: '0 0 0 0.25rem rgb(20 99 214 / 0.3)'
  }),
  layer: Object.freeze({
    base: 0,
    navigation: 10,
    overlay: 100,
    dialog: 110,
    status: 120
  })
});

export default designTokens;
