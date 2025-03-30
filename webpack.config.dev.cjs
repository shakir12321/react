// webpack.config.dev.cjs
const path = require('path');

module.exports = {
  extends: './webpack.config.base.cjs',
  devServer: {
    port: 8080,
    open: true,
    hot: true,
    static: {
      directory: path.join(__dirname, 'dist')
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
};
