// webpack.config.base.cjs
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/, // For JS, JSX, TS, TSX
        loader: 'babel-loader'
      },
      {
        test: /\.(css|scss)$/,
        use: ['css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'] // plus .ts/.tsx if you use TS
  },
  plugins: [
    new HtmlBundlerPlugin({
      entry: 'src',
      entryFilter: /\.(html)$/,
      filename: '[name][ext]',
      js: { inline: true },
      css: { inline: true }
    })
  ]
};
