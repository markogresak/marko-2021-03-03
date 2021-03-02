import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import useSubscribeToOrderBook from '../../api/useSubscribeToOrderBook';
import productIdToName from '../../lib/productIdToName';
import Container from './Container';
import BaseGrid from './Grid';
import GridRows from './GridRows';
import Header from './Header';
import Title from './Title';

interface Props {
  ordersCount?: number;
  productId: string;
}

const OrderBook = ({ ordersCount = 10, productId }: Props) => {
  const { asks, bids, error, isLoading } = useSubscribeToOrderBook(productId);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return (
    <Container>
      <Title>Orderbook ({productIdToName(productId)})</Title>
      {isLoading && 'Loading...'}
      {!isLoading && (
        <>
          <AsksGrid>
            <Header />
            <GridRows orders={asks.slice(0, ordersCount)} />
          </AsksGrid>

          <BidsGrid>
            <GridRows orders={bids.slice(-ordersCount)} />
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
