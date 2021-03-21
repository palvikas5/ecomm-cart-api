const { findProductsInIds } = require('../products/product.repository');

const computeCart = async productsWithIdAndQuantity => {
  const products = await findProductsInIds(
    productsWithIdAndQuantity.map(p => p.id),
  );

  const cartLines = products.map(product => {
    const { quantity } = productsWithIdAndQuantity.find(
      rp => rp.id === product.id,
    );
    const itemPrice = product.price * quantity;
    const itemDiscount = 0;
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
