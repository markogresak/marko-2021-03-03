import { useEffect, useRef, useState } from 'react';
import { useRafLoop, useUpdate } from 'react-use';
import updateOrder from '../lib/updateOrder';
import { Order } from '../types';
import { isOrderBookUpdateEvent, isSnapshotEvent } from '../types/lib';
import { subscribeToOrderBook } from './subscribeToOrderBook';

interface Parameters {
  onError: (event: Event) => void;
  productId: string;
}

interface State {
  asks: Order[];
  bids: Order[];
  isLoading: boolean;
}

const useSubscribeToOrderBook = ({ onError, productId }: Parameters): State => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const asks = useRef<Order[]>([]);
  const bids = useRef<Order[]>([]);
  // PERF: using refs and requestAnimationFrame loop to optimize UI updates.
  // Before, the UI updates would get slower the longer the app is running.
  const update = useUpdate();
  useRafLoop(update);

  useEffect(() => {
    return subscribeToOrderBook({
      onData: (data) => {
        if (isSnapshotEvent(data)) {
          setIsLoading(false);
          asks.current = data.asks;
          bids.current = data.bids;
        }
        if (isOrderBookUpdateEvent(data)) {
          asks.current = data.asks.reduce(
            (nextAsks, ask) => updateOrder(nextAsks, ask),
            asks.current,
          );
          bids.current = data.bids.reduce(
            (nextBids, bid) => updateOrder(nextBids, bid),
            bids.current,
          );
        }
      },
      onError,
      productIds: [productId],
    });
  }, [onError, productId]);

  return {
    asks: asks.current,
    bids: [...bids.current].reverse(),
    isLoading,
  };
};

export default useSubscribeToOrderBook;
