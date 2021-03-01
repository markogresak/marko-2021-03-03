import React, { useState } from 'react';
import { XBT_USD } from './api';
import { OrderBook } from './components';

const App = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <button type="button" onClick={() => setIsOpen((v) => !v)}>
        {isOpen ? 'Close' : 'Open'}
      </button>

      {isOpen && <OrderBook productId={XBT_USD} />}
    </div>
  );
};

export default App;
