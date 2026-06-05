/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary:  '#050810',
          surface:  '#0a0f1e',
          card:     '#0d1526',
        },
        blue: {
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        purple: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        electric: '#0ea5e9',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'SF Mono', 'monospace'],
      },
      animation: {
        'fade-in':        'fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-up':       'slide-up-fade 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'gradient-x':     'gradient-x 5s ease infinite',
        'shimmer':        'shimmer 2.5s linear infinite',
        'glow-pulse':     'glow-pulse 3s ease-in-out infinite',
        'cursor-blink':   'cursor-blink 1s step-end infinite',
        'dot-pulse':      'dot-pulse 2s ease-in-out infinite',
        'progress-fill':  'progress-fill 1.2s cubic-bezier(0.16, 1, 0.3, 1) both',
        'line-draw':      'line-draw 1s cubic-bezier(0.16, 1, 0.3, 1) both',
        'pulse-ring':     'pulse-ring 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'scanline':       'scanline 4s linear infinite',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'slide-up-fade': {
          from: { transform: 'translateY(24px)', opacity: '0' },
          to:   { transform: 'translateY(0)',    opacity: '1' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.6' },
          '50%':      { opacity: '1' },
        },
        'cursor-blink': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        'dot-pulse': {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 rgba(59,130,246,0)' },
          '50%':      { transform: 'scale(1.4)', boxShadow: '0 0 12px rgba(59,130,246,0.6)' },
        },
        'progress-fill': {
          from: { width: '0' },
        },
        'line-draw': {
          from: { height: '0' },
          to:   { height: '100%' },
        },
        'pulse-ring': {
          '0%':   { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(2.8)', opacity: '0' },
        },
        'scanline': {
          '0%':   { transform: 'translateY(-8px)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      boxShadow: {
        'glow-blue':   '0 0 30px rgba(59, 130, 246, 0.35), 0 0 60px rgba(59, 130, 246, 0.15)',
        'glow-cyan':   '0 0 30px rgba(6, 182, 212, 0.35), 0 0 60px rgba(6, 182, 212, 0.15)',
        'glow-purple': '0 0 30px rgba(139, 92, 246, 0.35), 0 0 60px rgba(139, 92, 246, 0.15)',
        'card':        '0 4px 24px rgba(0, 0, 0, 0.4)',
      },
      backgroundSize: {
        '300%': '300%',
        '200%': '200%',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
  },
  plugins: [],
}
export default config
