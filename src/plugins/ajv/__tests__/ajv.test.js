const { createServer } = require('../../../lib/server');

describe('ajv plugin', () => {
  let fastifyContext;

  beforeAll(async () => {
    fastifyContext = createServer();
    await fastifyContext.ready();
  });

  afterAll(async () => {
    await fastifyContext.close();
  });

  it('should not throw error if data matches schema', async () => {
    expect.assertions(1);

    const schema = {
      type: 'object',
      properties: {
        sampleKey: {
          type: 'string',
        },
      },
    };

    expect(() =>
      fastifyContext.validateSchema(schema, {
        sampleKey: '323232',
      }),
    ).not.toThrow();
  });

  it('should throw error if data matches schema', async () => {
    expect.assertions(1);

    const schema = {
      type: 'object',
      properties: {
        sampleKey: {
          type: 'string',
        },
      },
    };
    expect(() =>
      fastifyContext.validateSchema(schema, {
        sampleKey: {},
      }),
    ).toThrow('');
  });
});
