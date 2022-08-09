'use strict';

/**
 * customer service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::customer.customer', ({strapi}) => ({

  async createByOrder(result){
    let customerId = null;
    console.log(result);
    let entry = await this.findDuplicate({
      mobile: result.phone,
      email: result.email
    });
    if(entry){
      customerId = entry.id;
    }else{
      entry = {};
    }
    const data = {
      data: {
        ...entry,
        fullname: result.name,
        mobile: result.phone,
        email: result.email,
        city: result.city,
        district: result.district,
        address: result.address
      }
    };
    return await this.upsert(customerId, data);
  },

  async createByContact(result){
    let customerId = null;
    let entry = await this.findDuplicate({
      mobile: result.mobile,
      email: result.email
    });
    if(entry){
      customerId = entry.id;
    }else{
      entry = {};
    }

    const data = {
      data: {
        ...entry,
        fullname: result.fullname,
        mobile: result.mobile,
        email: result.email,
      }
    };
    return await this.upsert(customerId, data);
  },

  async upsert(customerId, data){
    if(!customerId){
      return await  strapi.entityService.create(`api::customer.customer`, data);
    }else{
      return await strapi.entityService.update(`api::customer.customer`, customerId, data)
    }
  },

  async findDuplicate(params){
    let orCondition = [];
    const {mobile, email} = params;
    if(mobile && mobile !== ""){
      orCondition.push({
        mobile: mobile
      })
    }
    if(email && email !== ""){
      orCondition.push({
        email: email
      })
    }
    let entry = null;
    if(orCondition.length > 0){
      entry = await strapi.db.query('api::customer.customer').findOne({
        where: {
          $or: orCondition
        }
      });
    }
    return entry
  }
}));
