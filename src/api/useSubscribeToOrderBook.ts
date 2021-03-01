import { useEffect, useState } from 'react';
import updateOrder from '../lib/updateOrder';
import { Order } from '../types';
import { isOrderBookUpdateEvent, isSnapshotEvent } from '../types/lib';
import { subscribeToOrderBook } from './subscribeToOrderBook';

interface State {
  asks: Order[];
  bids: Order[];
  error: Event | undefined;
  isLoading: boolean;
}

const useSubscribeToOrderBook = (productId: string): State => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [asks, setAsks] = useState<Order[]>([]);
  const [bids, setBids] = useState<Order[]>([]);
  const [error, setError] = useState<Event>();

  useEffect(() => {
    return subscribeToOrderBook({
      onData: (data) => {
        if (isSnapshotEvent(data)) {
          setIsLoading(false);
          setAsks(data.asks);
          setBids(data.bids);
        }
        if (isOrderBookUpdateEvent(data)) {
          setAsks((currentAsks) =>
            data.asks.reduce(
              (nextAsks, ask) => updateOrder(nextAsks, ask),
              currentAsks,
            ),
          );
          setBids((currentBids) =>
            data.bids.reduce(
              (nextBids, bid) => updateOrder(nextBids, bid),
              currentBids,
            ),
          );
        }
      },
      onError: setError,
      productIds: [productId],
    });
  }, [productId]);

  return {
    asks,
    bids,
    error,
    isLoading,
  };
};

export default useSubscribeToOrderBook;
