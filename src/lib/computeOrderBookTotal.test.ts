import { Order } from '../types';
import computeOrderBookTotal from './computeOrderBookTotal';

const orderBook: Order[] = [
  [48166, 24975],
  [48183.5, 17743],
  [48184, 2300],
  [48184.5, 133675],
  [48186.5, 17624],
  [48189.5, 31901],
  [48190, 176138],
  [48192.5, 35423],
  [48196.5, 57000],
  [48197, 21162],
];

describe('lib/computeOrderBookTotal', () => {
  it('should return the size when computing total for the first order', () => {
    const [firstOrder] = orderBook;
    const expected = firstOrder[1];

    expect(computeOrderBookTotal(orderBook, firstOrder)).toBe(expected);
  });

  it('should return the sum of first two sizes for the second order', () => {
    const [firstOrder, secondOrder] = orderBook;
    const expected = firstOrder[1] + secondOrder[1];

    expect(computeOrderBookTotal(orderBook, secondOrder)).toBe(expected);
  });

  it('should return sum of the sizes of all but the last orders for the second to last order', () => {
    const lastOrder = orderBook[orderBook.length - 1];
    const secondToLastOrder = orderBook[orderBook.length - 2];
    const expected =
      orderBook.reduce((total, [, size]) => total + size, 0) - lastOrder[1];

    expect(computeOrderBookTotal(orderBook, secondToLastOrder)).toBe(expected);
  });

  it('should return the sum of all sizes for the last order', () => {
    const lastOrder = orderBook[orderBook.length - 1];
    const expected = orderBook.reduce((total, [, size]) => total + size, 0);

    expect(computeOrderBookTotal(orderBook, lastOrder)).toBe(expected);
  });

  it('should return 0 for an unknown order', () => {
    const unknownOrder: Order = [1, 2];
    const expected = 0;

    expect(computeOrderBookTotal(orderBook, unknownOrder)).toBe(expected);
  });
});

describe('lib/computeOrderBookTotal (reversed orderBook)', () => {
  const reversedOrderBook = [...orderBook].reverse();

  it('should return the size for the last order', () => {
    const lastOrder = orderBook[orderBook.length - 1];
    const expected = lastOrder[1];

    expect(computeOrderBookTotal(reversedOrderBook, lastOrder)).toBe(expected);
  });

  it('should return the sum of last two sizes for the second to last order', () => {
    const lastOrder = orderBook[orderBook.length - 1];
    const secondToLastOrder = orderBook[orderBook.length - 2];
    const expected = lastOrder[1] + secondToLastOrder[1];

    expect(computeOrderBookTotal(reversedOrderBook, secondToLastOrder)).toBe(
      expected,
    );
  });

  it('should return sum of the sizes all but the first orders for the second order', () => {
    const [firstOrder, secondOrder] = orderBook;
    const expected =
      orderBook.reduce((total, [, size]) => total + size, 0) - firstOrder[1];

    expect(computeOrderBookTotal(reversedOrderBook, secondOrder)).toBe(
      expected,
    );
  });

  it('should return the sum of all sizes for the first order', () => {
    const [firstOrder] = orderBook;
    const expected = orderBook.reduce((total, [, size]) => total + size, 0);

    expect(computeOrderBookTotal(reversedOrderBook, firstOrder)).toBe(expected);
  });
});
