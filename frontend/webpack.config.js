/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: './src/index.tsx',

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
  },

  watch: true,
  watchOptions: {
    aggregateTimeout: 50,
    poll: 50,
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.less'],
    plugins: [new TsconfigPathsPlugin()] 
  },

  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader", },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: true,
            }
          },
          { loader: "less-loader", },
        ],
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.tsx$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  }
};