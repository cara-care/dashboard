import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Paper, Theme, Typography, useTheme } from '@material-ui/core';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import {
  chatConversationsSelector,
  currentUserUsernameSelector,
} from '../../redux';

const useStyles = makeStyles({
  root: {
    padding: '16px 0 16px 16px',
    minWidth: 290,
  },
  container: {
    maxHeight: 350,
    overflowY: 'scroll',
  },
  header: {
    marginBottom: 12,
  },
  avatar: { marginRight: 8, width: 20, height: 20 },
});

interface AssigneeWrapperProps {
  theme: Theme;
  active: boolean;
}

const AssigneeWrapper = styled.div<AssigneeWrapperProps>`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
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

interface AssignTeammateProps {
  assignUserToNutri: (slug: string, room?: string) => void;
  handleCloseAssignPopup: () => void;
}

export default function AssignTeammate({
  assignUserToNutri,
  handleCloseAssignPopup,
}: AssignTeammateProps) {
  const classes = useStyles();
  const intl = useIntl();
  const theme = useTheme();
  const chatConversations = useSelector(chatConversationsSelector);
  const username = useSelector(currentUserUsernameSelector);
  const [activeElement, setActiveElement] = useState('unassigned');

  const handleClick = (slug: string) => {
    assignUserToNutri(slug, username);
    setActiveElement(slug);
    handleCloseAssignPopup();
  };

  const noneOption = {
    name: intl.formatMessage({
      id: 'common.none',
      defaultMessage: 'None',
    }),
    private: false,
    slug: 'unassigned',
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <Typography variant="h6" className={classes.header}>
        {intl.formatMessage({
          id: 'chat.assignToTeammate',
          defaultMessage: 'Assign to teammate',
        })}
      </Typography>
      <div className={classes.container}>
        {[noneOption, ...chatConversations]
          .filter((conversation) => conversation.name !== 'All')
          .map((conversation) => {
            return (
              <AssigneeWrapper
                key={conversation.slug}
                theme={theme}
                active={conversation.slug === activeElement}
                onClick={() => handleClick(conversation.slug)}
              >
                <Avatar className={classes.avatar} />
                <Typography variant="body2">{conversation.name}</Typography>
              </AssigneeWrapper>
            );
          })}
      </div>
    </Paper>
  );
}
