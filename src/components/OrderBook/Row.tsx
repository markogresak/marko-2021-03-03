import React from 'react';
import Cell from './Cell';

interface Props {
  price: number;
  size: number;
  total: number;
}

const Row = ({ price, size, total }: Props) => (
  <>
    <Cell>{price.toLocaleString()}</Cell>
    <Cell>{size.toLocaleString()}</Cell>
    <Cell>{total.toLocaleString()}</Cell>
  </>
);

export default Row;
