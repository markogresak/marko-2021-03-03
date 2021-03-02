import React, { useState } from 'react';
import RowCell from './RowCell';

interface Props {
  price: number;
  size: number;
  total: number;
  totalSum: number;
}

const Row = ({ price, size, total, totalSum }: Props) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <>
      <RowCell
        isHovered={isHovered}
        onMouseOut={handleMouseOut}
        onMouseOver={handleMouseOver}
        percentOfTotal={(total - size) / totalSum}
      >
        {price.toLocaleString()}
      </RowCell>
      <RowCell onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
        {size.toLocaleString()}
      </RowCell>
      <RowCell onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
        {total.toLocaleString()}
      </RowCell>
    </>
  );
};

export default Row;
