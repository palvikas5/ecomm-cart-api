const { getProductsMockResponse } = require('../../__mocks/get-products.mock');
const { createServer } = require('../../../../lib/server');

const getProductsMock = jest
  .spyOn(require('../../products.service'), 'getProducts')
  .mockResolvedValue(getProductsMockResponse);

describe('get products handler', () => {
  let fastify;

  beforeAll(async () => {
    fastify = createServer();
    await fastify.ready();
  });

  afterAll(async () => {
    await fastify.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 with products response', async () => {
    expect.assertions(3);

    const response = await fastify.inject({
      method: 'GET',
      url: '/products',
      accept: 'application/json',
    });

    expect(getProductsMock).toHaveBeenCalledWith();
    expect(response.statusCode).toBe(200);
    expect(response.json()).toStrictEqual(getProductsMockResponse);
  });

  it('should return 400 if unwanted params is present', async () => {
    expect.assertions(2);

    const response = await fastify.inject({
      method: 'GET',
      url: '/products?q=1',
      accept: 'application/json',
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toStrictEqual([
      {
        code: 'VALIDATION_ERROR',
        message: 'querystring should NOT have additional properties',
        property: 'querystring',
      },
    ]);
  });

  it('should return 404 if url is incorrect', async () => {
    expect.assertions(2);

    const response = await fastify.inject({
      method: 'GET',
      url: '/some',
      accept: 'application/json',
    });

    expect(response.statusCode).toBe(404);
    expect(response.json()).toStrictEqual({
      error: 'Not Found',
      message: 'Route GET:/some not found',
      statusCode: 404,
    });
  });

  it('should return 500 when server error', async () => {
    expect.assertions(3);

    getProductsMock.mockRejectedValueOnce(undefined);

    const response = await fastify.inject({
      method: 'GET',
      url: '/products',
      accept: 'application/json',
    });
    expect(getProductsMock).toHaveBeenCalledWith();
    expect(response.statusCode).toBe(500);
    expect(response.json()).toStrictEqual([
      {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'undefined',
        property: '',
      },
    ]);
  });
});
