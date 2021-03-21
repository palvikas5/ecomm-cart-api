const { Promotion } = require('../models/promotion');

const findPromotionsByProductIds = async productIds => {
  const promotions = await Promotion.find({
    productId: { $in: productIds },
  });
  return promotions;
};

module.exports = {
  findPromotionsByProductIds,
};
