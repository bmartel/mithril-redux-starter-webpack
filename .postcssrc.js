module.exports = {
  plugins: [
    require("tailwindcss")("./tailwind.js"),
    require("postcss-functions"),
    require("autoprefixer")
  ]
};
