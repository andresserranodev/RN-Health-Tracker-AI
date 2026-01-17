module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@domain": "./src/domain",
            "@infrastructure": "./src/infrastructure",
            "@presentation": "./src/presentation",
            "@shared": "./src/shared",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
