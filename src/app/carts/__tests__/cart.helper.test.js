const {
  DISCOUNT_TYPES,
  RULE_OPERATORS,
} = require('../../promotions/promotion.constants');
const {
  calculateCartDiscount,
  calculateItemDiscount,
  compileRuleOperators,
  compileDiscount,
  computeCart,
} = require('../cart.helper');
const {
  itemPromotion,
  cartFixedPromotion,
  cartPercentPromotion,
} = require('../__mocks/promotions');

const {
  findPromotionsByProductIds,
  findCartPromotions,
} = require('../../promotions/promotion.repository');
const { findProductsInIds } = require('../../products/product.repository');

jest.mock('../../promotions/promotion.repository');
jest.mock('../../promotions/promotion.repository');
jest.mock('../../products/product.repository');

describe('compile discount', () => {
  it('should return fixed discount', () => {
    expect.assertions(1);
    const discount = compileDiscount(DISCOUNT_TYPES.FIXED, 100)(1000);
    expect(discount).toBe(100);
  });

  it('should return percentage discount', () => {
    expect.assertions(1);
    const discount = compileDiscount(DISCOUNT_TYPES.PERCENT, 20)(1000);
    expect(discount).toBe(200);
  });
});

describe('compile rule operators', () => {
  it('should return true for expression 3 GREATER_THAN_EQUAL_TO 3', () => {
    expect.assertions(1);
    const isValid = compileRuleOperators(RULE_OPERATORS.GREATER_THAN_EQUAL_TO)(
      3,
      3,
    );
    expect(isValid).toBeTruthy();
  });

  it('should return true for expression 3 GREATER_THAN_EQUAL_TO 2', () => {
    expect.assertions(1);
    const isValid = compileRuleOperators(RULE_OPERATORS.GREATER_THAN_EQUAL_TO)(
      3,
      2,
    );
    expect(isValid).toBeTruthy();
  });

  it('should return false for expression 2 GREATER_THAN_EQUAL_TO 3', () => {
    expect.assertions(1);
    const isValid = compileRuleOperators(RULE_OPERATORS.GREATER_THAN_EQUAL_TO)(
      2,
      3,
    );
    expect(isValid).toBeFalsy();
  });
});

describe('calculate item discount', () => {
  it('calculate item discount with exact match quantity', () => {
    expect.assertions(1);
    const discount = calculateItemDiscount(
      [itemPromotion],
      { id: itemPromotion.productId, price: 30 },
      3,
    );
    expect(discount).toBe(15);
  });

  it('calculate item discount with partial matching quantity', () => {
    expect.assertions(1);
    const discount = calculateItemDiscount(
      [itemPromotion],
      { id: itemPromotion.productId, price: 30 },
      4,
    );
    expect(discount).toBe(15);
  });

  it('calculate item discount with double exact match quantity', () => {
    expect.assertions(1);
    const discount = calculateItemDiscount(
      [itemPromotion],
      { id: itemPromotion.productId, price: 30 },
      6,
    );
    expect(discount).toBe(30);
  });
});

describe('calculate cart discount', () => {
  describe('fixed discount', () => {
    it('calculate cart fixed discount with exact cart value', () => {
      expect.assertions(1);
      const discount = calculateCartDiscount([cartFixedPromotion], 150);
      expect(discount).toBe(20);
    });

    it('calculate cart fixed discount with less cart value', () => {
      expect.assertions(1);
      const discount = calculateCartDiscount([cartFixedPromotion], 100);
      expect(discount).toBe(0);
    });

    it('calculate cart fixed discount with more cart value', () => {
      expect.assertions(1);
      const discount = calculateCartDiscount([cartFixedPromotion], 250);
      expect(discount).toBe(20);
    });
  });

  describe('percent discount', () => {
    it('calculate cart percent discount with exact cart value', () => {
      expect.assertions(1);
      const discount = calculateCartDiscount([cartPercentPromotion], 300);
      expect(discount).toBe(60);
    });

    it('calculate cart percent discount with less cart value', () => {
      expect.assertions(1);
      const discount = calculateCartDiscount([cartPercentPromotion], 100);
      expect(discount).toBe(0);
    });

    it('calculate cart percent discount with more cart value', () => {
      expect.assertions(1);
      const discount = calculateCartDiscount([cartPercentPromotion], 500);
      expect(discount).toBe(100);
    });
  });
});

describe('compute cart', () => {
  it('should compute cart with item and cart discount', async () => {
    expect.assertions(1);

    findProductsInIds.mockResolvedValue([
      {
        id: '605b71c2b2b31383f7c4f813',
        price: 30,
      },
    ]);
    findPromotionsByProductIds.mockResolvedValue([itemPromotion]);
    findCartPromotions.mockResolvedValue([cartFixedPromotion]);

    const productsWithIdAndQuantity = [
      {
        id: '605b71c2b2b31383f7c4f813',
        quantity: 3,
      },
    ];
    const cart = await computeCart(productsWithIdAndQuantity);
    expect(cart).toStrictEqual({
      cartLines: [
        {
          itemDiscount: 15,
          itemPrice: 90,
          itemTotal: 75,
          product: {
            id: '605b71c2b2b31383f7c4f813',
            price: 30,
          },
          quantity: 3,
        },
      ],
      cartDiscount: 0,
      summary: {
        subTotal: 90,
        totalDiscount: 15,
        totalPrice: 75,
      },
    });
  });
});
