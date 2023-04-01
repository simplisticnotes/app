/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],

  theme: {
    extend: {
      colors: {
        primary: "#49111C",
        secondary: "#F2F4F3"
      },
      screens: {
        xs: "475px"
      },
      container: {
        center: true
      }
    }
  },

  plugins: [require("daisyui"), require("@tailwindcss/typography")],

  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          primary: "#49111C",
          secondary: "#F2F4F3"
        }
      }
    ]
  }
}
