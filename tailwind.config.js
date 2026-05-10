/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#dc2626', // Racing Red
        creme: '#faf7f2',   // Premium Creme
        accent: '#991b1b',  // Deep Red for hover/details
        dark: '#09090b',    // Carbon Zinc
        surface: '#ffffff',
      },
    },
  },
  plugins: [],
}