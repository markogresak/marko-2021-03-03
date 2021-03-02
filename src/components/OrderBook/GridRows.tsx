import React, { useState } from 'react';
import computeOrderBookTotal from '../../lib/computeOrderBookTotal';
import { Order } from '../../types';
import Row from './Row';

interface Props {
  orders: Order[];
  reversedTotal?: boolean;
}

const GridRows = ({ orders, reversedTotal = false }: Props) => {
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const ordersForTotal = reversedTotal ? [...orders].reverse() : orders;
  const totalSum = computeOrderBookTotal(orders, orders[orders.length - 1]);

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
          total={computeOrderBookTotal(ordersForTotal, [price, size])}
          totalSum={totalSum}
        />
      ))}
    </>
  );
};

export default GridRows;
