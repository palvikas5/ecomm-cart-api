const { PROMOTION_TYPES } = require('./promotion.constants');
const { Promotion } = require('../models/promotion');

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
};
