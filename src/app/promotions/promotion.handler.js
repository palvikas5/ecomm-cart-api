const promotionService = require('./promotion.service');

const getPromotions = async () => {
  const promotions = await promotionService.getPromotions();
  return promotions;
};

const createPromotion = async (fastify, request) => {
  const promotion = await promotionService.createPromotion(
    fastify,
    request,
    request.body,
  );
  return promotion;
};

module.exports = {
  getPromotions,
  createPromotion,
};
