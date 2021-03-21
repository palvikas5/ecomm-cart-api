const cartCommonProperties = {
  _id: { type: 'string', minLength: 1 },
  cartLines: {
    type: 'array',
    minItems: 1,
    items: {
      type: 'object',
      additionalProperties: false,
      required: [
        '_id',
        'product',
        'quantity',
        'itemPrice',
        'itemDiscount',
        'itemTotal',
      ],
      properties: {
        _id: { type: 'string', minLength: 1 },
        product: {
          type: 'object',
          additionalProperties: false,
          required: ['_id', 'name', 'price'],
          properties: {
            _id: { type: 'string', minLength: 1 },
            name: { type: 'string', minLength: 1 },
            price: { type: 'number', minimum: 0 },
          },
        },
        quantity: { type: 'number', minimum: 1 },
        itemPrice: { type: 'number', minimum: 0 },
        itemDiscount: { type: 'number', minimum: 0 },
        itemTotal: { type: 'number', minimum: 0 },
      },
    },
  },
  summary: {
    type: 'object',
    additionalProperties: false,
    required: ['subTotal', 'totalDiscount', 'totalPrice'],
    properties: {
      subTotal: { type: 'number', minimum: 0 },
      totalDiscount: { type: 'number', minimum: 0 },
      totalPrice: { type: 'number', minimum: 0 },
    },
  },
};

module.exports = {
  cartCommonProperties,
};
