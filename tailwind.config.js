/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,svelte,js,ts}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#373D53",
          "primary-content" : "#F1F1F1",
          "secondary": "#6c7a89",
          "accent": "#fab700",
          "neutral": "#e6e6e6",
          "base-100": "#ffffff",
          "info": "#3a72ff",
          "success": "#31CF00",
          "warning": "#ffb74d",
          "error": "#ff5555",
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}

