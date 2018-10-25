module.exports = function(api) {
  api.cache.using(() => process.env.NODE_ENV === "production");

  const presets = [["@babel/preset-env", { useBuiltIns: "entry" }]];
  const plugins = ["@babel/plugin-syntax-dynamic-import", "@babel/plugin-proposal-object-rest-spread"];

  return {
    presets,
    plugins,
  };
};
