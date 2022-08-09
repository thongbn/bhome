'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('location-selector')
      .service('myService')
      .getWelcomeMessage();
  },
};
