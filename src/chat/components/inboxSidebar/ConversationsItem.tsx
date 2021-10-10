import React from 'react';
import { Theme, useTheme } from '@material-ui/core';
import styled from 'styled-components';

interface ConversationItemWrapperProps {
  theme: Theme;
  active: boolean;
  primary: boolean;
}

const ConversationItemWrapper = styled.div<ConversationItemWrapperProps>`
  display: flex;
  align-items: center;
  color: ${({ active, theme }) =>
    active ? theme.palette.primary.main : theme.palette.text.primary};
  cursor: pointer;
  opacity: ${({ active }) => (active ? '1' : '0.8')};
  font-weight: ${({ active }) => (active ? '600' : '400')};
  transition: all 0.3 ease;
  margin-top: '100';

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
  isInboxCollapsed?: boolean;
}

function ConversationsItem({
  icon,
  text,
  count,
  active = false,
  handleSelected,
  type = 'primary',
  isInboxCollapsed = false,
}: ConversationsItemProps) {
  const theme = useTheme();
  return (
    <ConversationItemWrapper
      theme={theme}
      active={active}
      onClick={handleSelected}
      primary={type === 'primary'}
    >
      <div>{icon}</div>
      {!isInboxCollapsed && (
        <p
          style={{
            margin: 0,
          }}
        >
          {text}
        </p>
      )}
      {count && <p>{count}</p>}
    </ConversationItemWrapper>
  );
}
export default ConversationsItem;
