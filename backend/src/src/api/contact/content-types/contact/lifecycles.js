module.exports = {
  async afterCreate(event) {
    const {result, params} = event;
    console.log("Contact afterCreate", result, params);
    strapi.service('api::customer.customer').createByContact(result);
  },

  async afterUpdate(event){
    const {result, params} = event;
    console.log("Contact afterUpdate", result, params);
    strapi.service('api::customer.customer').createByContact(result);
  },
};
