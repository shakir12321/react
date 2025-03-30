// webpack.config.cjs
const path = require('path');

module.exports = {
  extends: './webpack.config.base.cjs',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
};
