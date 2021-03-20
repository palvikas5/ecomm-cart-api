jest.mock('mongoose', () => ({
  Schema: class Schema {},
  model: () => ({
    find: () => {},
    save: () => {},
  }),
  connect: () => Promise.resolve(undefined),
}));
