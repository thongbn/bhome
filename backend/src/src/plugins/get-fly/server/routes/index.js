module.exports = [
  {
    method: 'GET',
    path: '/findCustomer',
    handler: 'getFly.findGetFlyCustomer',
    config: {
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/syncCustomer',
    handler: 'getFly.syncCustomer',
    config: {
      policies: [],
    },
  },
  {
    method: 'PUT',
    path: '/saveGetFlyData',
    handler: 'getFly.saveGetFlyData',
    config: {
      policies: [],
    },
  }
];
