module.exports = function override(config, env) {
  config.target = 'electron-renderer'
  config.externals = {
    ...config.externals,   
    "nedb": 'commonjs nedb',   
  }
  return config;
};