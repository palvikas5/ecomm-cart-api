const itemPromotion = {
  _id: '605b7447ac7e9e84dc84170b',
  type: 'ITEM_PROMOTION',
  description: '',
  productId: '605b71c2b2b31383f7c4f813',
  rule: {
    name: 'product.quantity',
    operator: '>=',
    value: 3,
  },
  discount: {
    type: 'PERCENT',
    value: 16.67,
  },
};

const cartFixedPromotion = {
  _id: '605b7508ac7e9e84dc841738',
  type: 'CART_PROMOTION',
  description: '',
  rule: {
    name: 'cart.value',
    operator: '>=',
    value: 150,
  },
  discount: {
    type: 'FIXED',
    value: 20,
  },
};

const cartPercentPromotion = {
  _id: '605b74a1ac7e9e84dc84171c',
  type: 'CART_PROMOTION',
  description: '',
  rule: {
    name: 'cart.value',
    operator: '>=',
    value: 300,
  },
  discount: {
    type: 'PERCENT',
    value: 20,
  },
};

module.exports = {
  itemPromotion,
  cartFixedPromotion,
  cartPercentPromotion,
};
