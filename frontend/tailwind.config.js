/** @type {import('tailwindcss').Config} */
// import tailwindVite from '@tailwindcss/vite';

import animate from 'tailwindcss-animate'
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx}",
    ],
    plugins: [animate],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#2563eb',
            light: '#3b82f6',
          },
        },
      },
    },
  }