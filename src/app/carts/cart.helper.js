const {
  findPromotionsByProductIds,
} = require('../promotions/promotion.repository');
const { findProductsInIds } = require('../products/product.repository');

const calculateItemDiscount = (promotions, product, quantity) => {
  const [itemDiscount = 0] = promotions
    .filter(promo => promo.productId.equals(product.id))
    .map(promotion => {
      const { minimumQuantity, discountPercentage } = promotion;

      const promoQuantities = quantity - (quantity % minimumQuantity);
      return (promoQuantities * product.price * discountPercentage) / 100;
    })
    .sort((d1, d2) => d2 - d1);

  return Number(itemDiscount.toFixed(0));
};

const computeCart = async productsWithIdAndQuantity => {
  const productIds = productsWithIdAndQuantity.map(p => p.id);
  const [products, promotions] = await Promise.all([
    findProductsInIds(productIds),
    findPromotionsByProductIds(productIds),
  ]);

  const cartLines = products.map(product => {
    const { quantity } = productsWithIdAndQuantity.find(
      rp => rp.id === product.id,
    );
    const itemPrice = product.price * quantity;
    const itemDiscount = calculateItemDiscount(promotions, product, quantity);
    return {
      product,
      quantity,
      itemPrice,
      itemDiscount,
      itemTotal: itemPrice - itemDiscount,
    };
  });

  const { subTotal, totalDiscount } = cartLines.reduce(
    (acc, cartLine) => {
      acc.subTotal += cartLine.itemPrice;
      acc.totalDiscount += cartLine.itemDiscount;
      return acc;
    },
    {
      subTotal: 0,
      totalDiscount: 0,
    },
  );

  return {
    cartLines,
    summary: {
      subTotal,
      totalDiscount,
      totalPrice: subTotal - totalDiscount,
    },
  };
};

module.exports = {
  computeCart,
};
