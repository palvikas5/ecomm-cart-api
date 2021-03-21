const promotionHandler = require('./promotion.handler');
const { createPromotionSchema } = require('./schema/create-promotion.schema');
const { getPromotionsSchema } = require('./schema/get-promotions.schema');

module.exports = async fastify => {
  fastify.route({
    url: '/',
    method: 'GET',
    schema: getPromotionsSchema,
    handler: promotionHandler.getPromotions.bind(this, fastify),
  });

  fastify.route({
    url: '/',
    method: 'POST',
    schema: createPromotionSchema,
    handler: promotionHandler.createPromotion.bind(this, fastify),
  });
};
