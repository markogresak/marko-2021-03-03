import React from 'react';
import styled from '@emotion/styled';
import Cell from './Cell';

const Header = () => (
  <>
    <Cell>
      <Text>Price</Text>
    </Cell>
    <Cell>
      <Text>Size</Text>
    </Cell>
    <Cell>
      <Text>Total</Text>
    </Cell>
  </>
);

const Text = styled.span`
  color: var(--card-title-color);
  text-transform: uppercase;
  border-bottom: 1px dotted;
`;

export default Header;
