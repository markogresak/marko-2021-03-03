import styled from '@emotion/styled';
import React from 'react';
import { XBT_USD } from './api';
import { OrderBook } from './components';

const App = () => {
  return (
    <Container>
      <OrderBook productId={XBT_USD} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px 0;
`;

export default App;
