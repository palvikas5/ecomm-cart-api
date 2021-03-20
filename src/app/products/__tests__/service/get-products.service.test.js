const { getProductsMockResponse } = require('../../__mocks/get-products.mock');
const productService = require('../../products.service');
const { Product } = require('../../../models/product');

jest.mock('../../../models/product');

describe('get products service', () => {
  it('should return products response', async () => {
    expect.assertions(2);
    Product.find.mockResolvedValue(getProductsMockResponse.data);
    const productsResponse = await productService.getProducts();
    expect(Product.find).toHaveBeenCalledTimes(1);
    expect(productsResponse).toStrictEqual(getProductsMockResponse);
  });
});
