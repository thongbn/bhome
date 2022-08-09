'use strict';

/**
 * site-name service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::site-name.site-name');
