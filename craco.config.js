/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const { CracoAliasPlugin } = require("react-app-alias");

module.exports = {
  eslint: {
    enable: false
  },
  plugins: [
    {
      plugin: CracoAliasPlugin,
      options: {
        source: "tsconfig",
        baseUrl: ".",
        tsConfigPath: "./tsconfig.json"
      }
    }
  ],
  module: {
    style: {
      modules: {
        localIdentName: "[name]__[local]__[hash:base64:5]"
      },
      css: {
        loaderOptions: {
          modules: {
            localIdentName: "[name]__[local]__[hash:base64:5]"
          }
        }
      }
    }
  },
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Find the file loader rule for SVG files
      const fileLoaderRule = webpackConfig.module.rules.find(
        (rule) => rule.test && rule.test.test && rule.test.test(".svg")
      );

      // Check if file loader rule for SVG files exists
      if (fileLoaderRule) {
        fileLoaderRule.exclude = /\.svg$/;

        webpackConfig.module.rules.push({
          test: /\.svg$/,
          use: [
            {
              loader: require.resolve("@svgr/webpack"),
              options: {
                // Adjust SVGR options if needed
              }
            }
          ]
        });
      } else {
        console.error("File loader rule for SVG files not found. SVGR configuration cannot be applied.");
      }

      // Add ignoreWarnings configuration
      webpackConfig.ignoreWarnings = [
        function ignoreSourcemapsloaderWarnings(warning) {
          return (
            warning.module &&
            warning.module.resource.includes("node_modules") &&
            warning.details &&
            warning.details.includes("source-map-loader")
          );
        }
      ];

      return webpackConfig;
    }
  }
};
