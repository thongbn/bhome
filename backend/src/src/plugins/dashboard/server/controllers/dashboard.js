'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('dashboard')
      .service('myService')
      .getWelcomeMessage();
  },

  // async orderChart(ctx){
  //   const {query} = ctx;
  //   const entries = await strapi.db.query('api::order.order')
  //     .findMany({
  //       select: ['id', 'total', 'createdAt'],
  //       where: {
  //         $and: [
  //           {
  //             createdAt: {$gte: `${query.from}`}
  //           },
  //           {
  //             createdAt: {$lte: `${query.to}`}
  //           }
  //         ]
  //       }
  //     });
  //   ctx.body = {
  //     entries
  //   }
  // },

  async orderSummary(ctx) {
    const {query} = ctx;
    const [entries, count] = await strapi.db.query('api::order.order')
      .findWithCount({
        select: ['id', 'total', 'createdAt'],
        where: {
          $and: [
            {
              createdAt: {$gte: `${query.from}`}
            },
            {
              createdAt: {$lte: `${query.to}`}
            }
          ]
        },
        populate: {
          items: {
            populate: {
              product: {
                fields: ['name', 'id']
              }
            }
          }
        }
      });
    let totalRevenue = 0;
    entries.map(entry => {
      if (entry.total) {
        totalRevenue += parseInt(entry.total);
      }
    });
    ctx.body = {
      count,
      totalRevenue,
      entries
    }
  },

  async articleSummary(ctx) {
    const {query} = ctx;
    const [entries, count] = await strapi.db.query('api::article.article')
      .findWithCount({
        select: ['id', 'createdAt'],
        where: {
          $and: [
            {
              createdAt: {$gte: `${query.from}`}
            },
            {
              createdAt: {$lte: `${query.to}`}
            }
          ]
        }
      });

    ctx.body = {
      count,
      entries
    }
  },

  async customerSummary(ctx) {
    const {query} = ctx;
    const [entries, count] = await strapi.db.query('api::customer.customer')
      .findWithCount({
        select: ['id', 'createdAt'],
        where: {
          $and: [
            {
              createdAt: {$gte: `${query.from}`}
            },
            {
              createdAt: {$lte: `${query.to}`}
            }
          ]
        }
      });

    ctx.body = {
      count,
      entries
    }
  },

  async contactSummary(ctx) {
    const {query} = ctx;
    const [entries, count] = await strapi.db.query('api::contact.contact')
      .findWithCount({
        select: ['id', 'createdAt'],
        where: {
          $and: [
            {
              createdAt: {$gte: `${query.from}`}
            },
            {
              createdAt: {$lte: `${query.to}`}
            }
          ]
        }
      });

    ctx.body = {
      count,
      entries
    }
  }
};
