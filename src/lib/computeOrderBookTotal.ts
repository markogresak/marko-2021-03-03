import { Order } from '../types';

const computeOrderBookTotal = (orderBook: Order[], order?: Order): number => {
  if (!order) {
    return 0;
  }

  const [orderPrice] = order;
  const orderIndex = orderBook.findIndex((order) => order[0] === orderPrice);

  if (orderIndex === -1) {
    return 0;
  }

  return orderBook
    .slice(0, orderIndex + 1)
    .reduce((total, [, size]) => total + size, 0);
};

export default computeOrderBookTotal;
