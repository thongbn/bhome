'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('export-data')
      .service('myService')
      .getWelcomeMessage();
  },
};
