import React, { useEffect } from 'react';
import useSubscribeToOrderBook from '../../api/useSubscribeToOrderBook';
import computeOrderBookTotal from '../../lib/computeOrderBookTotal';
import Container from './Container';
import Grid from './Grid';
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
  const asks = orderBook.asks.slice(0, ordersCount);
  const bids = orderBook.bids.reverse().slice(0, ordersCount);
  const reversedAsks = [...asks].reverse();

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
            {asks.map(([price, size]) => (
              <Row
                key={price}
                price={price}
                size={size}
                total={computeOrderBookTotal(reversedAsks, [price, size])}
              />
            ))}
          </AsksGrid>

          <BidsGrid>
            {bids.map(([price, size]) => (
              <Row
                key={price}
                price={price}
                size={size}
                total={computeOrderBookTotal(bids, [price, size])}
              />
            ))}
          </BidsGrid>
        </>
      )}
    </Container>
  );
};

const AsksGrid = styled(Grid)`
  margin-bottom: 16px;
  --fill-color: var(--asks-color);
`;

const BidsGrid = styled(Grid)`
  --fill-color: var(--bids-color);
`;

export default OrderBook;
