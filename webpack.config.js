const path = require('path');
const { EsbuildPlugin } = require('esbuild-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

/**
 * @returns {webpack.Configuration}
 */
module.exports = (_, { mode }) => {
  const isProduction = mode === 'production';
  const now = new Date();

  return {
    devServer: {
      static: path.resolve(__dirname, './dist'),
      port: now.getFullYear(),
    },
    entry: {
      index: path.resolve(__dirname, './src/index.ts'),
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'index.js',
    },
    optimization: {
      minimizer: [
        new EsbuildPlugin({
          target: 'es2015',
          css: true,
        }),
      ],
    },
    resolve: {
      alias: {
        react: isProduction ? 'preact/compat' : 'react',
        'react-dom': isProduction ? 'preact/compat' : 'react-dom',
      },
      extensions: ['.js', '.ts', '.tsx'],
    },
    stats: {
      modules: false,
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          loader: 'esbuild-loader',
          options: {
            minify: true,
            target: 'es2015',
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './src/index.html'),
        publicPath: '.',
      }),
    ],
  };
};
