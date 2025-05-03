/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '20': '5rem', // This adds pl-20 support
        '8': '2rem',  // For pl-8
        '6': '1.5rem', // For other spacing values used in your project
        '10': '2.5rem',
        '4': '1rem',
        '5': '1.25rem',
        '2': '0.5rem',
        '1': '0.25rem',
        '2.5': '0.625rem',
      },
    },
  },
  plugins: [],
}