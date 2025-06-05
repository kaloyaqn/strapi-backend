export default {
  async beforeUpdate(event) {
    const { where, data } = event.params;
    const id = where.id;

    // Get the current order with order items and products
    const currentOrder = await strapi.entityService.findOne('api::order.order', id, {
      populate: { order_item: { populate: { product: true } } }
    });

    console.log('Order status transition:', currentOrder.order_status, '->', data.order_status);

    // Decrement on completion
    if (data.order_status === 'completed' && currentOrder.order_status !== 'completed') {
      console.log('Decrementing product quantities for completed order');
      // @ts-ignore
      const orderItems = currentOrder.order_item || [];
      for (const item of orderItems) {
        if (item.product) {
          const product = await strapi.entityService.findOne('api::product.product', item.product.id);
          if (product) {
            console.log(`Product ${product.id} current quantity: ${product.quantity}, order item quantity: ${item.quantity}`);
            const newQuantity = Math.max(0, product.quantity - item.quantity);
            await strapi.entityService.update('api::product.product', product.id, {
              data: { quantity: newQuantity }
            });
            console.log(`Product ${product.id} decremented to ${newQuantity}`);
          }
        }
      }
    }

    // Increment on return
    if (
      data.order_status === 'returned' &&
      currentOrder.order_status === 'completed'
    ) {
      console.log('Incrementing product quantities for returned order');
      // @ts-ignore
      const orderItems = currentOrder.order_item || [];
      for (const item of orderItems) {
        if (item.product) {
          const product = await strapi.entityService.findOne('api::product.product', item.product.id);
          if (product) {
            const newQuantity = product.quantity + item.quantity;
            await strapi.entityService.update('api::product.product', product.id, {
              data: { quantity: newQuantity }
            });
            console.log(`Product ${product.id} incremented to ${newQuantity}`);
          }
        }
      }
    }
  }
}; 