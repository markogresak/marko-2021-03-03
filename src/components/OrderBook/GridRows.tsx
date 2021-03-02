import React, { useState } from 'react';
import computeOrderBookTotal from '../../lib/computeOrderBookTotal';
import { Order } from '../../types';
import Row from './Row';

interface Props {
  orders: Order[];
}

const GridRows = ({ orders }: Props) => {
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);

  return (
    <>
      {orders.map(([price, size], index) => (
        <Row
          isHovered={hoveredIndex === index}
          key={price}
          onMouseOut={() => setHoveredIndex(-1)}
          onMouseOver={() => setHoveredIndex(index)}
          price={price}
          size={size}
          total={computeOrderBookTotal(orders, [price, size])}
          totalSum={computeOrderBookTotal(orders, orders[orders.length - 1])}
        />
      ))}
    </>
  );
};

export default GridRows;
