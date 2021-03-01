import {
  OrderBookUpdateEvent,
  OrderBookSnapshotEvent,
  OrderBookSubscribeEvent,
} from './OrderBookData';

export const isSubscribeEvent = (
  event: any,
): event is OrderBookSubscribeEvent =>
  typeof event === 'object' && event.event === 'subscribed';

export const isSnapshotEvent = (event: any): event is OrderBookSnapshotEvent =>
  typeof event === 'object' &&
  typeof event.numLevels === 'number' &&
  typeof event.feed === 'string' &&
  event.feed.endsWith('_snapshot') &&
  typeof event.product_id === 'string' &&
  Array.isArray(event.asks) &&
  Array.isArray(event.bids);

export const isOrderBookUpdateEvent = (
  event: any,
): event is OrderBookUpdateEvent =>
  typeof event === 'object' &&
  typeof event.product_id === 'string' &&
  Array.isArray(event.asks) &&
  Array.isArray(event.bids);
