import { Order } from '../types';

const sortByPrice = (orders: Order[]): Order[] =>
  orders.sort(([aPrice], [bPrice]) => aPrice - bPrice);

export default sortByPrice;
