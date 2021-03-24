const {
  DISCOUNT_TYPES,
  RULE_OPERATORS,
  RULE_ATTRIBUTES,
} = require('../promotions/promotion.constants');

const {
  findPromotionsByProductIds,
  findCartPromotions,
} = require('../promotions/promotion.repository');
const { findProductsInIds } = require('../products/product.repository');

const compileRuleOperators = operator => {
  const mapping = {
    [RULE_OPERATORS.GREATER_THAN_EQUAL_TO]: '>=',
  };
  return (leftOperand, rightOperand) => {
    // eslint-disable-next-line no-eval
    return eval(`${leftOperand} ${mapping[operator]} ${rightOperand}`);
  };
};

const compileDiscount = (discountType, discountParameter) => {
  return value => {
    if (discountType === DISCOUNT_TYPES.FIXED) {
      return discountParameter;
    }
    return value * (discountParameter / 100);
  };
};

const calculateItemDiscount = (promotions, product, quantity) => {
  const [itemDiscount = 0] = promotions
    .filter(promo => promo.productId.toString() === product.id)
    .map(promotion => {
      const { rule, discount } = promotion;
      if (rule.name === RULE_ATTRIBUTES.PRODUCT_QUANTITY) {
        const isValidRule = compileRuleOperators(rule.operator)(
          quantity,
          rule.value,
        );
        if (isValidRule) {
          const promoQuantities = quantity - (quantity % rule.value);
          const discountAmount = compileDiscount(
            discount.type,
            discount.value,
          )(promoQuantities * product.price);
          return discountAmount;
        }
      }
      return 0;
    })
    .sort((d1, d2) => d2 - d1);

  return Number(itemDiscount.toFixed(0));
};

const calculateCartDiscount = (cartPromotions, cartValue) => {
  const [cartDiscount = 0] = cartPromotions
    .map(promotion => {
      const { rule, discount } = promotion;
      if (rule.name === RULE_ATTRIBUTES.CART_VALUE) {
        const isValidRule = compileRuleOperators(rule.operator)(
          cartValue,
          rule.value,
        );
        if (isValidRule) {
          const discountAmount = compileDiscount(
            discount.type,
            discount.value,
          )(cartValue);
          return discountAmount;
        }
      }
      return 0;
    })
    .sort((d1, d2) => d2 - d1);

  return Number(cartDiscount.toFixed(0));
};

const computeCart = async productsWithIdAndQuantity => {
  const productIds = productsWithIdAndQuantity.map(p => p.id);
  const [products, promotions, cartPromotions] = await Promise.all([
    findProductsInIds(productIds),
    findPromotionsByProductIds(productIds),
    findCartPromotions(),
  ]);

  const cartLines = products.map(product => {
    const { quantity } = productsWithIdAndQuantity.find(
      rp =>
        Buffer.from(rp.id).toString() === Buffer.from(product.id).toString(),
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

  const { subTotal, totalItemDiscount } = cartLines.reduce(
    (acc, cartLine) => {
      acc.subTotal += cartLine.itemPrice;
      acc.totalItemDiscount += cartLine.itemDiscount;
      return acc;
    },
    {
      subTotal: 0,
      totalItemDiscount: 0,
    },
  );

  const cartDiscount = calculateCartDiscount(
    cartPromotions,
    subTotal - totalItemDiscount,
  );
  const totalDiscount = totalItemDiscount + cartDiscount;

  return {
    cartLines,
    cartDiscount,
    summary: {
      subTotal,
      totalDiscount,
      totalPrice: subTotal - totalDiscount,
    },
  };
};

module.exports = {
  compileDiscount,
  compileRuleOperators,
  calculateItemDiscount,
  calculateCartDiscount,
  computeCart,
};
