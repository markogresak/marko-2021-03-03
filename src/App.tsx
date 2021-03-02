import styled from '@emotion/styled';
import React, { useCallback, useState } from 'react';
import { XBT_USD } from './api';
import { OrderBook } from './components';

const App = () => {
  const [isError, setIsError] = useState<boolean>(false);

  const handleError = useCallback((event: Event) => {
    console.error(event);
    setIsError(true);
  }, []);

  return (
    <Container>
      {!isError && <OrderBook onError={handleError} productId={XBT_USD} />}
      {isError && (
        <ErrorContainer>
          <p>An error occurred</p>
          <div>
            <RetryButton onClick={() => setIsError(false)} type="button">
              Retry
            </RetryButton>
          </div>
        </ErrorContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px 0;
`;

const ErrorContainer = styled.div`
  text-align: center;
`;

const RetryButton = styled.button`
  cursor: pointer;
`;

export default App;
