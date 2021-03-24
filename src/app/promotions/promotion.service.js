const { PROMOTION_TYPES } = require('./promotion.constants');
const { BaseError, NotFoundError } = require('../../errors');
const { findProductById } = require('../products/product.repository');
const { createPromotion, findPromotions } = require('./promotion.repository');

const getPromotions = async () => {
  const promotions = await findPromotions();
  return {
    data: promotions,
  };
};

const createItemPromotion = async (fastify, request, promotionPayload) => {
  const { productId } = promotionPayload;
  const product = await findProductById(productId);
  if (!product) {
    throw new NotFoundError(`Product with ID: ${productId} not found`);
  }
  return createPromotion(promotionPayload);
};

const createCartPromotion = async (fastify, request, promotionPayload) => {
  return createPromotion(promotionPayload);
};

const createPromotionMapping = {
  [PROMOTION_TYPES.ITEM_PROMOTION]: createItemPromotion,
  [PROMOTION_TYPES.CART_PROMOTION]: createCartPromotion,
};

module.exports = {
  getPromotions,
  createPromotion: async (fastify, request, promotionPayload) => {
    const createPromo = createPromotionMapping[promotionPayload.type];
    if (!createPromo) {
      throw BaseError.create(400, { message: 'Promotion type not supported' });
    }
    const promotion = await createPromo(fastify, request, promotionPayload);
    return promotion;
  },
};
