'use strict';

/**
 * product controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const moduleId = "api::product.product";

module.exports = createCoreController(moduleId, ({strapi}) => ({
  async findSlug(ctx) {
    const {slug} = ctx.params;
    const entity = await strapi.db.query(moduleId).findOne({
      where: {slug},
      populate: {
        seo: true,
        images: {
          select: ['name', 'url', 'width', 'height']
        },
        thumb: {
          select: ['name', 'url', 'width', 'height']
        }
      }
    });
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitizedEntity);
  }
}));
