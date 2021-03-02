import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Cell from './Cell';

interface Props {
  isHovered?: boolean;
}

const RowCell = styled(Cell)<Props>`
  position: relative;

  &:hover {
    font-weight: bold;
  }

  &:nth-of-type(3n + 1) {
    --row-full-width: calc(300% + var(--grid-column-gap) * 2);
    color: var(--text-color);

    ${({ isHovered }) => isHovered && hoverStyle}

    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: var(--row-full-width);
      background: var(--row-background);
      transform-origin: 0;
      transform: scaleX(var(--percent));
    }
  }
`;

const hoverStyle = css`
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: var(--row-full-width);
    background: rgba(255, 255, 255, 0.1);
  }
`;

export default RowCell;
