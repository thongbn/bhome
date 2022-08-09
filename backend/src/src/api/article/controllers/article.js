'use strict';

/**
 *  article controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

const moduleId = "api::article.article";

module.exports = createCoreController(moduleId, ({strapi}) => ({
  async findSlug(ctx) {
    const {slug} = ctx.params;
    const entity = await strapi.db.query(moduleId).findOne({
      where: {slug},
      populate: {
        seo: true,
        thumbnail: true,
        cover: true
      }
    });
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitizedEntity);
  }
}));
