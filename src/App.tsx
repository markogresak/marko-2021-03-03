import React from 'react';
import { XBT_USD } from './api';
import { OrderBook } from './components';

const App = () => {
  return <OrderBook productId={XBT_USD} />;
};

export default App;
