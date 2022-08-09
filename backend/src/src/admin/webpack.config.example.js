'use strict';

/* eslint-disable no-unused-vars */
module.exports = (config, webpack) => {
  // Note: we provide webpack above so you should not `require` it
  // Perform customizations to webpack config
  // Important: return the modified config
  config.plugins.push(new webpack.DefinePlugin({
    //All your custom ENVs that you want to use in frontend
    GOOGLE_API_KEY: {
      map_api: JSON.stringify(process.env.my_variable1),
      my_variable2: JSON.stringify(process.env.my_variable2),
    },
  }));
  console.log(process.env, config.plugins);
  return config;
};
