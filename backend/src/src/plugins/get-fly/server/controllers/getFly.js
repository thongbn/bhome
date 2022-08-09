'use strict';

module.exports = ({strapi}) => ({
  async findGetFlyCustomer(ctx) {
    const {query} = ctx;
    console.log(query);

    const {mobile, email} = query;

    if (!mobile && !email) {
      return ctx.badRequest('Email hoặc mobile không được trống');
    }

    const {data, error} = ctx.body = await strapi
      .plugin('get-fly')
      .service('getFlyService')
      .searchCustomer(mobile);

    console.log("getFlyController:findGetFlyCustomer:", data, error);

    if (error) {
      return ctx.badRequest(error);
    }

    if (!data || !data.records || data.records.length === 0) {
      return ctx.badRequest("Không tìm thấy dữ liệu hoặc dữ liệu có chứa số điện thoại này đã bị xóa");
    }

    let getFlyData = data.records[0];

    ctx.body = {
      getFlyData
    }
  },

  async saveGetFlyData(ctx) {
    const {request} = ctx;
    const {body} = request;
    const {customerId, getFlyData} = body;
    console.log("saveGetFlyData", customerId, getFlyData);
    if (!customerId || customerId === "" || !getFlyData) {
      return ctx.badRequest('Thiếu dữ liệu');
    }

    const customer = await strapi.entityService.findOne("api::customer.customer", customerId, {});
    if (!customer) {
      return ctx.badRequest('Không tìm thấy bản ghi');
    }
    customer.getFlyData = strapi
      .plugin('get-fly')
      .service('getFlyService')
      .toGetflyData(getFlyData);
    console.log(customer);
    try {
      await strapi.entityService.update("api::customer.customer", customer.id, {
        data: customer
      });
      ctx.body = {
        ...customer
      }
    } catch (e) {
      return ctx.badRequest(e.message)
    }
  },

  async syncCustomer(ctx) {
    const {query} = ctx;
    const {customerId, isTransferToGetFly} = query;
    console.log("SyncCustomer", customerId, isTransferToGetFly);

    if (!customerId || customerId === "") {
      return ctx.badRequest('Thiếu dữ liệu');
    }

    const customer = await strapi.entityService.findOne("api::customer.customer", customerId, {});
    if (!customer) {
      return ctx.badRequest('Không tìm thấy bản ghi');
    }

    const {data, error} = await strapi
      .plugin('get-fly')
      .service('getFlyService')
      .asyncCustomer(customer, isTransferToGetFly ? isTransferToGetFly : false);
    console.log("Async return", data, error);
    if (error) {
      return ctx.badRequest(error);
    }

    ctx.body = {
      ...data
    };
  },

});
