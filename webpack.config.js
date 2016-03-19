var path = require('path')

var babelSettings = {
  presets: ['es2015']
}

module.exports = {
  entry: path.resolve(__dirname, 'client/javascript/main.js'),

  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: 'main.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel?' + JSON.stringify(babelSettings),
        exclude: /node_modules/
      },
      {
        test: /\.sass$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },

  sassLoader: {
    indentedSyntax: true
  }
}
