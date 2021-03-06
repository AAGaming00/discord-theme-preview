const path = require('path');
const webpack = require('webpack');




/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled TerserPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/terser-webpack-plugin
 *
 */

const TerserPlugin = require('terser-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const StringReplacePlugin = require('string-replace-webpack-plugin');


module.exports = {
  entry: {
    main: './src/index.js'
  },

  output: {
    path: path.resolve(__dirname, '..', 'web')
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'web')
  },

  plugins: [new webpack.ProgressPlugin(),
  new HtmlWebpackPlugin({
    title: 'Custom template',
    // Load a custom template (lodash by default)
    filename: 'index.html',
    template: path.join('src', 'index.html')
  }),
  new StringReplacePlugin()
  ],

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      include: [path.resolve(__dirname, 'src')],
      loader: 'babel-loader'
    },
    { 
      test: /sass\.dart\.js$/,
      use: StringReplacePlugin.replace({
          replacements: [
              {
                  pattern: /Object\.create\(dartNodePreambleSelf\)/ig,
                  replacement: () => 'dartNodePreambleSelf'
              }
          ]
        })
      }
    ]
  },

  optimization: {
    minimizer: [new TerserPlugin()],

    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: false,
    }
  },
  resolve: {
    fallback: {
      "fs": false,
      "buffer": require.resolve('buffer/'),
      "readline": false
    },
    alias: {
      "chokidar": false
    }
  }
}