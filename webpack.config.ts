const path = require("path");
const webpackDev = require("webpack");

module.exports = {
  entry: "./app.tsx",
  devtool: "source-map",
  output: {
    path: path.resolve("./dist"),
    filename: "app.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx", ".scss", ".css", ".json", ".ts", ".tsx"],
    alias: {
      jquery: path.join(__dirname, "./jquery-stub.ts"),
    },
  },
  plugins: [
    new webpackDev.ProvidePlugin({
      $: "assets/node_modules/jquery",
      jQuery: "assets/node_modules/jquery",
    }),
  ],

  ignoreWarnings: [
    {
      module: /node_modules/,
    },
  ],
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts$|.tsx?$/,
        use: [{ loader: "babel-loader" }],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                includePaths: ["./node_modules"],
                quietDeps: true,
              },
            },
          },
        ],
      },
    ],
  },
  devServer: {
    port: 8080,
    host: "localhost",
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
    // watchOptions: { aggregateTimeout: 300, poll: 1000 },
    // contentBase: "./public",
    static: {
      directory: "./public",
    },
    open: true,
    proxy: {
      "/api/*": "http://127.0.0.1:5005",
    },
  },
};