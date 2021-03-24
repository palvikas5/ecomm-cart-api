const { PROMOTION_TYPES } = require('./promotion.constants');
const { Promotion } = require('../models/promotion');

const createPromotion = async promotionPayload => {
  const promotion = new Promotion(promotionPayload);
  return promotion.save();
};

const findPromotions = async () => {
  const promotions = await Promotion.find();
  return promotions;
};

const findPromotionsByProductIds = async productIds => {
  const promotions = await Promotion.find({
    type: PROMOTION_TYPES.ITEM_PROMOTION,
    productId: { $in: productIds },
  });
  return promotions;
};

const findCartPromotions = async () => {
  const promotions = await Promotion.find({
    type: PROMOTION_TYPES.CART_PROMOTION,
  });
  return promotions;
};

module.exports = {
  findPromotionsByProductIds,
  findCartPromotions,
  findPromotions,
  createPromotion,
};
