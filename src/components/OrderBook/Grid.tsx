import styled from '@emotion/styled';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 20px;
  column-gap: var(--grid-column-gap);
  row-gap: 4px;
  text-align: right;
`;

export default Grid;
