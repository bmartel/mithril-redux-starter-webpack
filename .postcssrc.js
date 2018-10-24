module.exports = {
  plugins: [
    require("tailwindcss")("./config/tailwind.js"),
    require("postcss-functions"),
    require("autoprefixer")
  ]
};
