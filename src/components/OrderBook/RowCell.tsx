import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Cell from './Cell';

interface Props {
  isHovered?: boolean;
  percentOfTotal?: number;
}

const RowCell = styled(Cell)<Props>`
  position: relative;

  &:hover {
    font-weight: bold;
  }

  &:nth-of-type(3n + 1) {
    --row-full-width: calc(300% + var(--grid-column-gap) * 2);

    color: var(--text-color);

    ${({ isHovered }) => {
      if (isHovered) {
        return css`
          &:after {
            content: ' ';
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: var(--row-full-width);
            background: rgba(255, 255, 255, 0.1);
          }
        `;
      }
    }}

    ${({ percentOfTotal }) => {
      if (typeof percentOfTotal === 'number') {
        return css`
          &:before {
            content: ' ';
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: calc(var(--row-full-width) * ${percentOfTotal});
            background: var(--row-background);
          }
        `;
      }
    }}
  }
`;

export default RowCell;
