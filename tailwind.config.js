/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#071122',
          800: '#0B1A33',
          700: '#0F2547',
          600: '#16335E',
        },
        cyan: {
          DEFAULT: '#19C3F0',
          400: '#19C3F0',
          500: '#0FA6D1',
        },
        risk: {
          veryHigh: '#EF4444',
          high: '#F97316',
          moderate: '#EAB308',
          low: '#22C55E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'cyan-glow': '0 0 18px rgba(25, 195, 240, 0.16), inset 0 0 12px rgba(25, 195, 240, 0.06)',
        'cyan-glow-strong': '0 0 24px rgba(25, 195, 240, 0.32)',
      }
    },
  },
  plugins: [],
}
