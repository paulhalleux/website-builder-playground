const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.ts",
  target: "node",
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true })],
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
};
