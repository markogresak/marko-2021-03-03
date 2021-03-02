import styled from '@emotion/styled';

const Cell = styled.div`
  padding: 4px 8px;
  min-width: 90px;

  &:nth-child(3n + 1) {
    color: var(--fill-color);
  }
`;

export default Cell;
