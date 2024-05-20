/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{html,js}", // Adjust this according to your file structure
  ],
  theme: {
    extend: {
      backgroundImage: {
        'welcome-hero': "url('./public/welcomeHeroTest2.png')",
      },
    },
  },  plugins: [],
};
