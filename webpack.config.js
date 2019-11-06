/* *
 * Created by render on 2019/10/31
 * */
const path = require('path');

module.exports = [
  {
    mode: 'development',
    entry: './src/index.ts',
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: 'storage.js',
      libraryTarget: "umd",
      path: path.resolve(__dirname, 'dist'),
    },
  },
  {
    mode: 'production',
    entry: './src/index.ts',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: 'storage.min.js',
      libraryTarget: "umd",
      path: path.resolve(__dirname, 'dist'),
    },
  }
];
