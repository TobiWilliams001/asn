/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        asn: {
          red: '#CC2630',
          'red-dark': '#a81f27',
          'red-light': '#ea2a33',
          cream: '#FFFDF3',
          'cream-dark': '#FFF6F6',
          black: '#161616',
          gray: '#777777',
        },
        dark: {
          bg: '#181111',
          surface: '#261c1c',
          'surface-hover': '#2d2222',
          border: '#382929',
          'border-hover': '#533c3d',
          'text-muted': '#b89d9f',
          'text-accent': '#EEB7BA',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-asn': 'linear-gradient(135deg, #CC2630 0%, #ea2a33 100%)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      screens: {
        smallTablet: { 'max': '600px' },
        phone: { 'max': '768px' },
        phoneTab: { 'min': '768px', 'max': '1280px' },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}