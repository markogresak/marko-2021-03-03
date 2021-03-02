import React from 'react';
import styled from '@emotion/styled';
import useSubscribeToOrderBook from '../../api/useSubscribeToOrderBook';
import productIdToName from '../../lib/productIdToName';
import getTestProps from '../../lib/getTestProps';
import BaseLoader from '../Loader';
import Container from './Container';
import BaseGrid from './Grid';
import GridRows from './GridRows';
import Header from './Header';
import Title from './Title';

interface Props {
  onError: (event: Event) => void;
  ordersCount?: number;
  productId: string;
}

const OrderBook = ({ onError, ordersCount = 10, productId }: Props) => {
  const { asks, bids, isLoading } = useSubscribeToOrderBook({
    onError,
    productId,
  });

  return (
    <Container>
      <Title>Orderbook ({productIdToName(productId)})</Title>
      {isLoading && (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      )}
      {!isLoading && (
        <>
          <AsksGrid {...getTestProps('asks-grid')}>
            <Header />
            <GridRows orders={asks.slice(0, ordersCount)} reversedTotal />
          </AsksGrid>

          <BidsGrid {...getTestProps('bids-grid')}>
            <GridRows orders={bids.slice(0, ordersCount)} />
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

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loader = styled(BaseLoader)`
  width: 50px;
  height: 50px;
`;

export default OrderBook;
