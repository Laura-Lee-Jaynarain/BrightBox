export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // All colours resolve to CSS variables set at runtime by userPrefs.js
        // This means theme changes are instant  re-rendering
        primary:                    'var(--color-primary)',
        'primary-dim':              'var(--color-primary-dim)',
        'primary-fixed':            'var(--color-primary-fixed)',
        'primary-fixed-dim':        'var(--color-primary-fixed-dim)',
        'on-primary':               'var(--color-on-primary)',
        'primary-container':        'var(--color-primary-container)',
        'on-primary-container':     'var(--color-on-primary-container)',
        secondary:                  'var(--color-secondary)',
        'secondary-container':      'var(--color-secondary-container)',
        'on-secondary-container':   'var(--color-on-secondary-container)',
        'on-primary-fixed':         'var(--color-on-primary-container)',
        tertiary:                   'var(--color-tertiary)',
        'tertiary-container':       'var(--color-tertiary-container)',
        'on-tertiary-container':    'var(--color-on-tertiary-container)',
        background:                 'var(--color-background)',
        'on-background':            'var(--color-on-background)',
        surface:                    'var(--color-surface)',
        'surface-dim':              'var(--color-surface-dim)',
        'surface-bright':           'var(--color-surface-bright)',
        'surface-variant':          'var(--color-surface-variant)',
        'on-surface':               'var(--color-on-surface)',
        'on-surface-variant':       'var(--color-on-surface-variant)',
        'inverse-surface':          'var(--color-inverse-surface)',
        'surface-container-lowest': 'var(--color-surface-container-lowest)',
        'surface-container-low':    'var(--color-surface-container-low)',
        'surface-container':        'var(--color-surface-container)',
        'surface-container-high':   'var(--color-surface-container-high)',
        'surface-container-highest':'var(--color-surface-container-highest)',
        outline:                    'var(--color-outline)',
        'outline-variant':          'var(--color-outline-variant)',
        error:                      'var(--color-error)',
        'error-dim':                'var(--color-error-dim)',
        'on-error':                 'var(--color-on-error)',
        'error-container':          'var(--color-error)',
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '10px',
        sm:  '6px',
        md:  '10px',
        lg:  '14px',
        xl:  '18px',
        '2xl':'24px',
        full: '9999px',
      },
      screens: {
        xs: '390px',   // iPhone 14
        sm: '640px',   // large phones
        md: '768px',   // tablets
        lg: '1024px',  // small desktops
        xl: '1280px',  // desktops
        '2xl': '1536px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}
