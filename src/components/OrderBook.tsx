import { useEffect, useState } from 'react';
import { subscribeToOrderBook } from '../api';
import { OrderBookUpdateEvent } from '../types';

interface Props {
  productId: string;
}

let dataCount = 0;

const OrderBook = ({ productId }: Props) => {
  const [data, setData] = useState<OrderBookUpdateEvent[]>([]);

  useEffect(() => {
    // TODO: implement order data store
    const close = subscribeToOrderBook({
      onData: (data) => {
        setData((d) => [...d, data]);
        dataCount++;
        if (dataCount >= 3) {
          close();
        }
      },
      onError: (event) => console.error(event),
      productIds: [productId],
    });
  }, [productId]);

  return (
    <div>
      <pre style={{ padding: 40 }}>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default OrderBook;
