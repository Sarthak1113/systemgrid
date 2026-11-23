/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['var(--font-space-grotesk)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        brand: {
          DEFAULT: '#047857',
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857', // Primary Color requested by user
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        slate: {
          850: '#151e2e',
          950: '#0b0f17',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            color: '#334155',
            a: {
              color: '#047857',
              textDecoration: 'underline',
              fontWeight: '500',
              '&:hover': {
                color: '#065f46',
              },
            },
            h1: {
              fontFamily: 'var(--font-space-grotesk), sans-serif',
              color: '#0f172a',
              fontWeight: '700',
              letterSpacing: '-0.025em',
            },
            h2: {
              fontFamily: 'var(--font-space-grotesk), sans-serif',
              color: '#0f172a',
              fontWeight: '700',
              letterSpacing: '-0.02em',
              marginTop: '2em',
              marginBottom: '0.8em',
            },
            h3: {
              fontFamily: 'var(--font-space-grotesk), sans-serif',
              color: '#1e293b',
              fontWeight: '600',
              marginTop: '1.6em',
            },
            h4: {
              fontFamily: 'var(--font-space-grotesk), sans-serif',
              color: '#1e293b',
              fontWeight: '600',
            },
            'code, pre, kbd': {
              fontFamily: 'var(--font-jetbrains-mono), monospace',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
