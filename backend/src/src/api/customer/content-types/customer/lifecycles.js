module.exports = {
  async afterCreate(event) {
    const {result, params} = event;
    console.log(`Customer afterCreate Trigger`, result, params);
  },

  async afterUpdate(event){
    const {result, params} = event;
    console.log(`Customer afterUpdate Trigger`, result, params);
  }
};
