import {
  OrderBookUpdateEvent,
  OrderBookSnapshotEvent,
  OrderBookSubscribeEvent,
} from '../types';
import {
  isOrderBookUpdateEvent,
  isSnapshotEvent,
  isSubscribeEvent,
} from '../types/lib';
import { FEED_NAME, WS_URL } from './constants';

type EventData =
  | OrderBookSubscribeEvent
  | OrderBookSnapshotEvent
  | OrderBookUpdateEvent;

type Unsubscribe = () => void;

interface Parameters {
  onData: (data: OrderBookSnapshotEvent | OrderBookUpdateEvent) => void;
  onError: (event: Event) => void;
  productIds: string[];
}

export function subscribeToOrderBook({
  onData,
  onError,
  productIds,
}: Parameters): Unsubscribe {
  const ws = new WebSocket(WS_URL);
  let isHandshakeDone: boolean;

  const getEventData = (event: MessageEvent<string>): EventData | undefined => {
    try {
      return JSON.parse(event.data);
    } catch (error) {
      dispatchError(ws, error);
    }
  };

  ws.addEventListener('open', () => {
    isHandshakeDone = false;
    const handshakeMessage = JSON.stringify(getHandshakeData(productIds));
    ws.send(handshakeMessage);
  });

  ws.addEventListener('error', (event) => {
    onError(event);
    ws.close();
  });

  ws.addEventListener('message', (event: MessageEvent<string>) => {
    const eventData = getEventData(event);

    if (!eventData) {
      return;
    }

    if (isSubscribeEvent(eventData)) {
      isHandshakeDone = isValidSubscribeEvent(eventData, productIds);
      if (!isHandshakeDone) {
        dispatchError(ws, new Error('OrderBook handshake failed'));
      }
    }

    if (
      isHandshakeDone &&
      (isSnapshotEvent(eventData) || isOrderBookUpdateEvent(eventData))
    ) {
      onData(eventData);
    }
  });

  return () => {
    ws.close();
  };
}

const getHandshakeData = (productIds: string[]) => ({
  event: 'subscribe',
  feed: FEED_NAME,
  product_ids: productIds,
});

const dispatchError = (ws: WebSocket, error: Error): void => {
  const event = document.createEvent('CustomEvent');
  event.initCustomEvent('error', false, false, error);
  ws.dispatchEvent(event);
};

const isValidSubscribeEvent = (
  eventData: OrderBookSubscribeEvent,
  productIds: string[],
): boolean => {
  const isCorrectFeed = eventData.feed === FEED_NAME;
  const isMatchingProductIds = eventData.product_ids.every((pid) =>
    productIds.includes(pid),
  );

  return isCorrectFeed && isMatchingProductIds;
};
