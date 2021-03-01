import { Order } from '../types';
import updateOrder from './updateOrder';

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

describe('lib/updateOrder', () => {
  it('should change the order data to the next size value', () => {
    const [orderPrice] = orderBook[3];
    const nextSize = 123;
    const nextOrder: Order = [orderPrice, nextSize];
    const expected = [...orderBook];
    expected[3] = nextOrder;

    expect(updateOrder(orderBook, nextOrder)).toEqual(expected);
  });

  it('should remove the order when the next size is 0', () => {
    const [orderPrice] = orderBook[3];
    const nextOrder: Order = [orderPrice, 0];
    const expected = [...orderBook];
    expected.splice(3, 1);

    expect(updateOrder(orderBook, nextOrder)).toEqual(expected);
  });

  it('should insert a new order, sorted by price', () => {
    const [firstOrder, secondOrder, ...rest] = orderBook;
    const newOrder: Order = [secondOrder[0] + 0.1, 2];
    const expected = [firstOrder, secondOrder, newOrder, ...rest];

    expect(updateOrder(orderBook, newOrder)).toEqual(expected);
  });

  it('should do nothing for a new order with a size 0', () => {
    const newOrder: Order = [1, 0];

    expect(updateOrder(orderBook, newOrder)).toEqual(orderBook);
  });
});
