// load the default config generator.
import webpack from 'webpack';
import genDefaultConfig from '@storybook/react/dist/server/config/defaults/webpack.config.js';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env);

  const plugins = [
    // new ExtractTextPlugin('[name].bundle.css')
  ];

  config.plugins = config.plugins.concat(plugins);

  config.module.rules = config.module.rules.concat([
    {
      test: /\.css$/,
      // use: ExtractTextPlugin.extract({
        use: [
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: './postcss.config.js'
              }
            }
          }
        ]
      // })
    }
  ]);

  return config;
};
