module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'dashboard.index',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/order-summary',
    handler: 'dashboard.orderSummary',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/article-summary',
    handler: 'dashboard.articleSummary',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/customer-summary',
    handler: 'dashboard.customerSummary',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/contact-summary',
    handler: 'dashboard.contactSummary',
    config: {
      policies: [],
    },
  }
];
