const pathProd = require("path");
const webpackProd = require("webpack");

module.exports = {
  entry: "./src/index.tsx",
  devtool: "source-map",
  output: {
    path: pathProd.resolve("./dist"),
    filename: "index.js",
    library: "ReactFormBuilder",
    libraryTarget: "umd",
    umdNamedDefine: true,
  },
  externals: {
    //don't bundle the 'react' npm package with our bundle.js
    //but get it from a global 'React' variable
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
      root: "React",
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "react-dom",
      root: "ReactDOM",
    },
    // 'react-datepicker': 'react-datepicker',
    // 'classnames': 'classnames',
    // 'jquery': 'jquery',
    bootstrap: "bootstrap",
  },
  resolve: {
    extensions: [".js", ".jsx", ".scss", ".css", ".json", ".ts", ".tsx"],
    alias: {
      jquery: pathProd.join(__dirname, "./jquery-stub.ts"),
    },
  },
  plugins: [
    new webpackProd.ProvidePlugin({
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
  performance: {
    hints: false,
  },
};
