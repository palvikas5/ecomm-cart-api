const { PROMOTION_TYPES } = require('./promotion.constants');
const { BaseError, NotFoundError } = require('../../errors');
const { findProductById } = require('../products/product.repository');
const { Promotion } = require('../models/promotion');

const getPromotions = async () => {
  const promotions = await Promotion.find();
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
  const promotion = new Promotion(promotionPayload);
  return promotion;
};

const createCartPromotion = async (fastify, request, promotionPayload) => {
  const promotion = new Promotion(promotionPayload);
  return promotion;
};

const createPromotionMapping = {
  [PROMOTION_TYPES.ITEM_PROMOTION]: createItemPromotion,
  [PROMOTION_TYPES.CART_PROMOTION]: createCartPromotion,
};

const createPromotion = async (fastify, request, promotionPayload) => {
  const createPromo = createPromotionMapping[promotionPayload.type];
  if (!createPromo) {
    throw BaseError.create(400, { message: 'Promotion type not supported' });
  }
  const promotion = await createPromo(fastify, request, promotionPayload);
  return promotion.save();
};

module.exports = {
  getPromotions,
  createPromotion,
};
