/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{html,js}", "./netflixReplica/index.html"],
  theme: {
    extend: {
      backgroundImage: {
        'backgroundImageNetflix': "url('./netflixReplica/images/background.png')",
      },
    },
  },
  plugins: [],
};
