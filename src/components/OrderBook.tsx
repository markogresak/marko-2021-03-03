import { useEffect } from 'react';
import useSubscribeToOrderBook from '../api/useSubscribeToOrderBook';
import computeOrderBookTotal from '../lib/computeOrderBookTotal';

interface Props {
  productId: string;
}

const OrderBook = ({ productId }: Props) => {
  const orderBook = useSubscribeToOrderBook(productId);
  const asks = orderBook.asks.slice(0, 10);
  const reversedAsks = [...asks].reverse();
  const bids = orderBook.bids.reverse().slice(0, 10);

  useEffect(() => {
    if (orderBook.error) {
      console.error(orderBook.error);
    }
  }, [orderBook.error]);

  return (
    <div>
      {orderBook.isLoading && 'Loading...'}
      {!orderBook.isLoading && (
        <>
          <h2>Asks</h2>
          <table
            style={{
              fontFamily: 'monospace',
              fontSize: 15,
              textAlign: 'right',
            }}
          >
            <thead>
              <tr>
                <th style={{ padding: '0 20px' }}>Price</th>
                <th style={{ padding: '0 20px' }}>Size</th>
                <th style={{ padding: '0 20px' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {asks.map(([price, size]) => (
                <tr key={price}>
                  <td style={{ padding: 20 }}>{price}</td>
                  <td style={{ padding: 20 }}>{size}</td>
                  <td style={{ padding: 20 }}>
                    {computeOrderBookTotal(reversedAsks, [price, size])}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Bids</h2>
          <table
            style={{
              fontFamily: 'monospace',
              fontSize: 15,
              textAlign: 'right',
            }}
          >
            <thead>
              <tr>
                <th style={{ padding: '0 20px' }}>Price</th>
                <th style={{ padding: '0 20px' }}>Size</th>
                <th style={{ padding: '0 20px' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {bids.map(([price, size]) => (
                <tr key={price}>
                  <td style={{ padding: 20 }}>{price}</td>
                  <td style={{ padding: 20 }}>{size}</td>
                  <td style={{ padding: 20 }}>
                    {computeOrderBookTotal(bids, [price, size])}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default OrderBook;
