const htmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')

const getStyleLoader = mode => {
  return mode === 'production' ? miniCssExtractPlugin.loader : 'style-loader'
}

const getPlugins = mode => {
  const plugins = [
    new htmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
  if (mode === 'production') {
    plugins.push(new miniCssExtractPlugin({
      filename: '[name]-[hash:7].css'
    }))
  }

  return plugins
}

module.exports = (env = {}) => {
  const isProd = env.mode === 'production'
  const mode = isProd ? 'production' : 'development'

  return {
		mode,
		output: {
			publicPath: '/'
		},
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.(png|jpg|jpeg|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'img',
                name: '[name]-[sha1:hash:7].[ext]'
              }
            }
          ]
        },
        {
          test: /\.ico$/,
          use: 'file-loader'
        },
        {
          test: /\.(ttf|otf|eot|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'fonts',
              }
            }
          ]
        },
        {
          test: /\.s[ac]ss$/,
          use: [getStyleLoader(mode), 'css-loader', 'sass-loader']
        }
      ]
    },
    plugins: getPlugins(mode),
    devServer: {
			open: true
		}
  }
}
