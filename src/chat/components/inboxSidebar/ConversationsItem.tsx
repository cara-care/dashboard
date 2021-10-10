import { Theme, useTheme } from '@material-ui/core';
import React from 'react';
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
  font-weight: 400;
  margin: ${({ primary }) => (primary ? '18px 5px' : '18px 1px')};
  transition: all 0.3 ease;
  width: fit-content;

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
      <div title={text}>{icon}</div>
      {!isInboxCollapsed && (
        <p
          style={{
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 8,
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
