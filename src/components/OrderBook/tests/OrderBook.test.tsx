import { render, act } from '@testing-library/react';
import WS from 'jest-websocket-mock';
import { XBT_USD } from '../../../api';
import { FEED_NAME, WS_URL } from '../../../api/constants';
import OrderBook from '../OrderBook';
import subscribedEvent from './ws-subscribed-event.json';
import snapshotEvent from './ws-snapshot-event.json';
import updateEvent from './ws-update-event.json';
import { Order } from '../../../types';
import computeOrderBookTotal from '../../../lib/computeOrderBookTotal';
import {
  snapshotAsks,
  snapshotBids,
  updatedAsks,
  updatedBids,
} from './mock-data';

type GridData = [number, number, number][];

const onError = jest.fn();

test('OrderBook', async () => {
  const ws = new WS(WS_URL);

  const productId = XBT_USD;
  const ordersCount = 10;

  const { getByTestId, getByAltText } = render(
    <OrderBook
      onError={onError}
      ordersCount={ordersCount}
      productId={productId}
    />,
  );
  expect(getByAltText('Loading...')).toBeInTheDocument();

  await ws.connected;
  await expect(ws).toReceiveMessage(
    JSON.stringify({
      event: 'subscribe',
      feed: FEED_NAME,
      product_ids: [productId],
    }),
  );

  act(() => {
    ws.send(JSON.stringify(subscribedEvent));
  });

  // Should still show loading until receiving the data
  expect(getByAltText('Loading...')).toBeInTheDocument();

  act(() => {
    ws.send(JSON.stringify(snapshotEvent));
  });

  assertAsksGrid(getByTestId('asks-grid'), snapshotAsks);
  assertBidsGrid(getByTestId('bids-grid'), snapshotBids);

  await act(async () => {
    ws.send(JSON.stringify(updateEvent));
    // Wait a bit to process the update, otherwise the assertions fail.
    await delay(10);
  });

  assertAsksGrid(getByTestId('asks-grid'), updatedAsks);
  assertBidsGrid(getByTestId('bids-grid'), updatedBids);
});

const delay = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const parseGridValue = (value: string): number =>
  parseFloat(value.replaceAll(',', ''));

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
