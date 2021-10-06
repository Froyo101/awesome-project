const environment = require('./environment');
const merge = require('webpack-merge');

// React Server Side Rendering webpacker config
// Builds a Node compatible file that React on Rails can load, never served to the client.

const serverConfig = merge(environment.toWebpackConfig(), {
  target: 'web',
  entry: './app/javascript/packs/server-bundle.js',
  output: {
    filename: 'server-bundle.js',

    // https://webpack.js.org/configuration/output/#outputglobalobject
    globalObject: 'this',
  },
  optimization: {
    minimize: false,
  },
});

// Don't hash the server bundle. No need.
serverConfig.plugins = serverConfig.plugins.filter(
  (plugin) => plugin.constructor.name !== 'WebpackAssetsManifest',
);

module.exports = serverConfig;
