import HomePage from "./src/pages/HomePage"

const plugin = {
  id: 'orders',
  initializer: () => null,
  isReady: false,
  name: 'Orders',
  pluginLogo: null,
  routes: [
    {
      method: 'GET',
      path: '/orders',
      component: HomePage,
      exact: true,
    },
  ],
  menu: {
    items: [
      {
        title: 'Orders',
        to: '/orders',
        icon: 'shopping-cart', // Use any icon from Strapi's icon library
        permissions: [], // Add permissions if needed
      },
    ],
  },
};

export default plugin;
