import React from 'react';
import { Theme, useTheme } from '@material-ui/core';
import styled from 'styled-components';

interface ConverstaionItemWrapperProps {
  theme: Theme;
  active: boolean;
}

const ConverstaionItemWrapper = styled.div<ConverstaionItemWrapperProps>`
  display: flex;
  align-items: center;
  width: 100%;
  color: ${({ active, theme }) =>
    active ? theme.palette.primary.main : theme.palette.text.primary};
  cursor: pointer;
  opacity: ${({ active }) => (active ? '1' : '0.8')};
  font-weight: ${({ active }) => (active ? '600' : '400')};
  transition: all 0.3 ease;

  &:hover {
    opacity: 1;
  }
`;

function ConverstaionsItem({
  type = 'primary',
  icon,
  text,
  count,
  selectedIndex,
  handleSelected,
}: any) {
  const theme = useTheme();

  return (
    <ConverstaionItemWrapper
      theme={theme}
      active={selectedIndex}
      onClick={handleSelected}
    >
      <div
        style={{
          fontSize: 16,
          marginTop: type === 'primary' ? 5 : 1,
          minWidth: type === 'primary' ? 30 : 18,
        }}
      >
        {icon}
      </div>
      <p style={{ marginLeft: 12, marginRight: 'auto' }}>{text}</p>
      {count && <p>{count}</p>}
    </ConverstaionItemWrapper>
  );
}
export default ConverstaionsItem;
