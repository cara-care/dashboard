import { Theme, useTheme } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

interface ConversationItemWrapperProps {
  theme: Theme;
  active: boolean;
  primary: boolean;
  isMenuCollapsed: boolean;
}

const ConversationItemWrapper = styled.div<ConversationItemWrapperProps>`
  display: flex;
  align-items: center;
  color: ${({ active, theme }) =>
    active ? theme.palette.primary.main : theme.palette.text.primary};
  cursor: pointer;
  opacity: ${({ active }) => (active ? '1' : '0.8')};
  font-weight: 400;
  margin: ${({ primary }) => (primary ? '18px 5px' : '18px 1px')};
  transition: all 0.3 ease;
  width: ${({ isMenuCollapsed }) =>
    isMenuCollapsed ? 'fit-content' : '160px'};

  &:hover {
    opacity: 1;
  }
`;

interface ConversationsItemProps {
  icon: JSX.Element | string;
  text: string | undefined;
  handleSelected: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  count?: number;
  active?: boolean;
  type?: string;
  isMenuCollapsed?: boolean;
}

function ConversationsItem({
  icon,
  text,
  count,
  active = false,
  handleSelected,
  type = 'primary',
  isMenuCollapsed = false,
}: ConversationsItemProps) {
  const theme = useTheme();

  return (
    <ConversationItemWrapper
      theme={theme}
      active={active}
      onClick={handleSelected}
      primary={type === 'primary'}
      isMenuCollapsed={isMenuCollapsed}
    >
      <div title={text}>{icon}</div>
      {!isMenuCollapsed && (
        <div
          style={{
            marginLeft: 8,
          }}
        >
          {text}
        </div>
      )}
      {count && <p>{count}</p>}
    </ConversationItemWrapper>
  );
}
export default ConversationsItem;
