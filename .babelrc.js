module.exports = function() {
  const presets = [
    ["@babel/preset-env", { useBuiltIns: "entry", shippedProposals: true }]
  ];
  const plugins = [
    "@babel/plugin-syntax-dynamic-import",
    ["@babel/plugin-proposal-object-rest-spread", { useBuiltIns: true }]
  ];

  return {
    presets,
    plugins
  };
};
