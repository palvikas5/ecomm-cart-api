const { ValidationError } = require('../../errors');
const { NotFoundError } = require('../../errors');
const { findProductById } = require('../products/product.repository');
const { Promotion } = require('../models/promotion');
const { findPromotionsByProductIds } = require('./promotion.repository');

const getPromotions = async () => {
  const promotions = await Promotion.find();
  return {
    data: promotions,
  };
};

const createPromotion = async (
  fastify,
  request,
  { description, productId, minimumQuantity, discountPercentage },
) => {
  const product = await findProductById(productId);
  if (!product) {
    throw new NotFoundError(`Product with ID: ${productId} not found`);
  }
  const productPromotions = await findPromotionsByProductIds([productId]);
  const alreadyExists = productPromotions.some(
    promo => promo.minimumQuantity === minimumQuantity,
  );
  if (alreadyExists) {
    throw ValidationError.create({
      message:
        'Promotion already present with same minimum quantity and product',
    });
  }
  const promotion = new Promotion({
    description,
    productId,
    minimumQuantity,
    discountPercentage,
  });
  return promotion.save();
};

module.exports = {
  getPromotions,
  createPromotion,
};
