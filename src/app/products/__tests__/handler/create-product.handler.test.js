const {
  createProductMockResponse,
  createProductMockRequestPayload,
} = require('../../__mocks/create-product.mock');
const { createServer } = require('../../../../lib/server');

jest.spyOn(require('mongoose'), 'connect').mockImplementation(jest.fn());

const createProductMock = jest
  .spyOn(require('../../products.service'), 'createProduct')
  .mockResolvedValue(createProductMockResponse);

describe('create products handler', () => {
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

  it('should return 200 with product response', async () => {
    expect.assertions(3);

    const response = await fastify.inject({
      method: 'POST',
      url: '/products',
      payload: createProductMockRequestPayload,
      accept: 'application/json',
    });

    expect(createProductMock).toHaveBeenCalledWith(
      expect.any(Object),
      expect.any(Object),
      createProductMockRequestPayload,
    );
    expect(response.statusCode).toBe(200);
    expect(response.json()).toStrictEqual(createProductMockResponse);
  });

  it('should return 400 if payload is not present', async () => {
    expect.assertions(2);

    const response = await fastify.inject({
      method: 'POST',
      url: '/products',
      accept: 'application/json',
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toStrictEqual([
      {
        code: 'VALIDATION_ERROR',
        message: 'body should be object',
        property: 'body',
      },
    ]);
  });

  it('should return 404 if url is incorrect', async () => {
    expect.assertions(2);

    const response = await fastify.inject({
      method: 'POST',
      url: '/some',
      accept: 'application/json',
    });

    expect(response.statusCode).toBe(404);
    expect(response.json()).toStrictEqual({
      error: 'Not Found',
      message: 'Route POST:/some not found',
      statusCode: 404,
    });
  });

  it('should return 500 when server error', async () => {
    expect.assertions(3);

    createProductMock.mockRejectedValueOnce(undefined);

    const response = await fastify.inject({
      method: 'POST',
      url: '/products',
      payload: createProductMockRequestPayload,
      accept: 'application/json',
    });
    expect(createProductMock).toHaveBeenCalledTimes(1);
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
