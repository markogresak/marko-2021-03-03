type Price = number;
type Size = number;

export type Order = [Price, Size];

export interface OrderBookSubscribeEvent {
  event: 'subscribed';
  feed: string;
  product_ids: string[];
}

export interface OrderBookSnapshotEvent {
  asks: Order[];
  bids: Order[];
  /**
   * Like feed from SubscribeEvent, but ends with `_snapshot`.
   * For example:
   *  - SubscribeEvent: `{feed: "book_ui_1", ...}`
   *  - SnapshotEvent:  `{feed: "book_ui_1_snapshot", ...}`
   */
  feed: string;
  numLevels: number;
  product_id: string;
}

export interface OrderBookUpdateEvent {
  asks: Order[];
  bids: Order[];
  feed: string;
  product_id: string;
}
