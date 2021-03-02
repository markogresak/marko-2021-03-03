const IS_TEST_ENV = process.env.NODE_ENV === 'test';

const noop = () => {};

const getTestProps = (testId: string): object => ({
  'data-testid': testId,
});

export default IS_TEST_ENV ? getTestProps : noop;
