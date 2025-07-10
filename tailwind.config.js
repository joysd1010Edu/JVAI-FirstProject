/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        lemon: ['Lemon', 'cursive'],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false, // disable daisyUI themes to prevent font conflicts
    base: false, // disable daisyUI base styles
  },
};
