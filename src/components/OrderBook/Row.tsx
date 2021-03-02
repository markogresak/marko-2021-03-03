import React, { CSSProperties, MouseEventHandler } from 'react';
import formatNumber from '../../lib/formatNumber';
import RowCell from './RowCell';

interface Props {
  index: number;
  isHovered: boolean;
  onMouseOut: MouseEventHandler;
  onMouseOver: MouseEventHandler;
  price: number;
  size: number;
  total: number;
  totalSum: number;
}

const Row = ({
  index,
  isHovered,
  onMouseOut,
  onMouseOver,
  price,
  size,
  total,
  totalSum,
}: Props) => {
  const percent = index === 0 ? total / totalSum : (total - size) / totalSum;

  return (
    <>
      <RowCell
        isHovered={isHovered}
        onMouseOut={onMouseOut}
        onMouseOver={onMouseOver}
        // TODO: figure out how to compute the correct percent value
        style={{ '--percent': percent } as CSSProperties}
      >
        {formatNumber(price, { digits: 2 })}
      </RowCell>
      <RowCell onMouseOut={onMouseOut} onMouseOver={onMouseOver}>
        {formatNumber(size, { digits: 0 })}
      </RowCell>
      <RowCell onMouseOut={onMouseOut} onMouseOver={onMouseOver}>
        {formatNumber(total, { digits: 0 })}
      </RowCell>
    </>
  );
};

export default Row;
