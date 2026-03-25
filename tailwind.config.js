/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
        },
        screens: {
          sm: "600px",
          md: "700px",
          lg: "900px",
          xl: "1200px",
          "2xl": "1300px",
        },
      },
    },
  },
  plugins: [],
};
