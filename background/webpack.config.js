const path = require("path")

module.exports = {
  entry: path.resolve(__dirname, "src/background.js"),
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "background.js"
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  mode: "production",
}
