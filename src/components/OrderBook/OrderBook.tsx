import React, { useEffect } from 'react';
import useSubscribeToOrderBook from '../../api/useSubscribeToOrderBook';
import computeOrderBookTotal from '../../lib/computeOrderBookTotal';
import Container from './Container';
import BaseGrid from './Grid';
import Header from './Header';
import Row from './Row';
import Title from './Title';
import productIdToName from '../../lib/productIdToName';
import styled from '@emotion/styled';

interface Props {
  ordersCount?: number;
  productId: string;
}

const OrderBook = ({ ordersCount = 10, productId }: Props) => {
  const orderBook = useSubscribeToOrderBook(productId);
  const asks = orderBook.asks;
  const bids = orderBook.bids;
  const reversedAsks = [...asks].reverse();
  const asksTotal = computeOrderBookTotal(reversedAsks, asks[0]);
  const bidsTotal = computeOrderBookTotal(bids, bids[bids.length - 1]);

  useEffect(() => {
    if (orderBook.error) {
      console.error(orderBook.error);
    }
  }, [orderBook.error]);

  return (
    <Container>
      <Title>Orderbook ({productIdToName(productId)})</Title>
      {orderBook.isLoading && 'Loading...'}
      {!orderBook.isLoading && (
        <>
          <AsksGrid>
            <Header />
            {asks.slice(0, ordersCount).map(([price, size]) => (
              <Row
                key={price}
                price={price}
                size={size}
                total={computeOrderBookTotal(reversedAsks, [price, size])}
                totalSum={asksTotal}
              />
            ))}
          </AsksGrid>

          <BidsGrid>
            {bids.slice(-ordersCount).map(([price, size]) => (
              <Row
                key={price}
                price={price}
                size={size}
                total={computeOrderBookTotal(bids, [price, size])}
                totalSum={bidsTotal}
              />
            ))}
          </BidsGrid>
        </>
      )}
    </Container>
  );
};

const Grid = styled(BaseGrid)`
  --grid-column-gap: 8px;
`;

const AsksGrid = styled(Grid)`
  margin-bottom: 16px;
  --text-color: var(--asks-color);
  --row-background: var(--asks-bg);
`;

const BidsGrid = styled(Grid)`
  --text-color: var(--bids-color);
  --row-background: var(--bids-bg);
`;

export default OrderBook;
