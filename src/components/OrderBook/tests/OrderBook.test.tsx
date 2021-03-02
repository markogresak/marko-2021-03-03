import { render, act } from '@testing-library/react';
import WS from 'jest-websocket-mock';
import { Order } from '../../../types';
import { XBT_USD } from '../../../api';
import { FEED_NAME, WS_URL } from '../../../api/constants';
import computeOrderBookTotal from '../../../lib/computeOrderBookTotal';
import OrderBook from '../OrderBook';
import subscribedEvent from './ws-subscribed-event.json';
import snapshotEvent from './ws-snapshot-event.json';
import updateEvent from './ws-update-event.json';
import {
  snapshotAsks,
  snapshotBids,
  updatedAsks,
  updatedBids,
} from './mock-data';

type GridData = [number, number, number][];

const onError = jest.fn();

let ws: WS;
beforeEach(() => {
  ws = new WS(WS_URL);
  onError.mockClear();
});
afterEach(() => {
  WS.clean();
});

describe('OrderBook', () => {
  const productId = XBT_USD;
  const ordersCount = 10;

  const mountComponent = () =>
    render(
      <OrderBook
        onError={onError}
        ordersCount={ordersCount}
        productId={productId}
      />,
    );

  it('should show a loader on initial mount', () => {
    const { getByAltText } = mountComponent();
    expect(getByAltText('Loading...')).toBeInTheDocument();
  });

  it('should send a subscribe message via WebSocket', async () => {
    mountComponent();
    await ws.connected;
    await expect(ws).toReceiveMessage(
      JSON.stringify({
        event: 'subscribe',
        feed: FEED_NAME,
        product_ids: [productId],
      }),
    );
  });

  it('should show the data after receiving subscription confirmation and snapshot data', () => {
    const { getByTestId } = mountComponent();
    act(() => {
      ws.send(JSON.stringify(subscribedEvent));
      ws.send(JSON.stringify(snapshotEvent));
    });
    assertAsksGrid(getByTestId('asks-grid'), snapshotAsks);
    assertBidsGrid(getByTestId('bids-grid'), snapshotBids);
  });

  it('should update the grid after receiving an update event', async () => {
    const { getByTestId } = mountComponent();
    act(() => {
      ws.send(JSON.stringify(subscribedEvent));
      ws.send(JSON.stringify(snapshotEvent));
    });

    await act(async () => {
      ws.send(JSON.stringify(updateEvent));
      // Wait a bit to process the update, otherwise the assertions fail.
      await delay(10);
    });

    assertAsksGrid(getByTestId('asks-grid'), updatedAsks);
    assertBidsGrid(getByTestId('bids-grid'), updatedBids);
  });
});

const delay = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const parseGridValue = (value: string): number =>
  parseFloat(value.replace(/,/g, ''));

function getGridData(grid: HTMLElement): GridData {
  const gridData: GridData = [];

  for (let i = 0; i < grid.childNodes.length; i += 3) {
    const { textContent: price } = grid.childNodes[i];
    const { textContent: size } = grid.childNodes[i + 1];
    const { textContent: total } = grid.childNodes[i + 2];

    gridData.push([
      parseGridValue(price || '0'),
      parseGridValue(size || '0'),
      parseGridValue(total || '0'),
    ]);
  }

  return gridData;
}

function assertAsksGrid(grid: HTMLElement, asks: Order[]) {
  const reversedAsks = [...asks].reverse();

  const gridData = getGridData(grid).slice(1); // skip header
  const expectedData = asks.map((order) => [
    ...order,
    computeOrderBookTotal(reversedAsks, order),
  ]);

  expect(gridData).toEqual(expectedData);
}

function assertBidsGrid(grid: HTMLElement, bids: Order[]) {
  const gridData = getGridData(grid);
  const expectedData = bids.map((order) => [
    ...order,
    computeOrderBookTotal(bids, order),
  ]);

  expect(gridData).toEqual(expectedData);
}
