import React, { CSSProperties, MouseEventHandler } from 'react';
import RowCell from './RowCell';

interface Props {
  isHovered: boolean;
  onMouseOut: MouseEventHandler;
  onMouseOver: MouseEventHandler;
  price: number;
  size: number;
  total: number;
  totalSum: number;
}

const Row = ({
  isHovered,
  onMouseOut,
  onMouseOver,
  price,
  size,
  total,
  totalSum,
}: Props) => (
  <>
    <RowCell
      isHovered={isHovered}
      onMouseOut={onMouseOut}
      onMouseOver={onMouseOver}
      // TODO: figure out how to compute the correct percent value
      style={{ '--percent': (total - size) / totalSum } as CSSProperties}
    >
      {price.toLocaleString()}
    </RowCell>
    <RowCell onMouseOut={onMouseOut} onMouseOver={onMouseOver}>
      {size.toLocaleString()}
    </RowCell>
    <RowCell onMouseOut={onMouseOut} onMouseOver={onMouseOver}>
      {total.toLocaleString()}
    </RowCell>
  </>
);

export default Row;
