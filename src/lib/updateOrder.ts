import sortedIndex from 'lodash.sortedindexby';

import { Order } from '../types';

const updateOrder = (orderBook: Order[], order: Order): Order[] => {
  const [orderPrice, orderSize] = order;
  const orderIndex = orderBook.findIndex(([price]) => price === orderPrice);
  const isNewOrder = orderIndex === -1;
  const shouldUpdateOrder = orderSize > 0;

  if (isNewOrder && !shouldUpdateOrder) {
    return orderBook;
  }

  const nextOrderBook = [...orderBook];
  if (isNewOrder) {
    return insertOrder(nextOrderBook, order);
  }

  if (!shouldUpdateOrder) {
    return removeOrder(nextOrderBook, orderIndex);
  }

  nextOrderBook[orderIndex] = order;

  return nextOrderBook;
};

const insertOrder = (orderBook: Order[], order: Order): Order[] => {
  const insertionIndex = sortedIndex(orderBook, order, ([price]) => price);
  orderBook.splice(insertionIndex, 0, order);
  return orderBook;
};

const removeOrder = (orderBook: Order[], index: number): Order[] => {
  orderBook.splice(index, 1);
  return orderBook;
};

export default updateOrder;
