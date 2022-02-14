import { Paper, Theme, Typography, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import useKabelwerk from '../../hooks/useKabelwerk';
import useNotification from '../../hooks/useNotification';

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
  handleCloseAssignPopup: () => void;
}

export default function AssignTeammate({
  handleCloseAssignPopup,
}: AssignTeammateProps) {
  const classes = useStyles();
  const intl = useIntl();
  const theme = useTheme();
  const { hubUsers, currentRoom } = useKabelwerk();
  const { showSuccess, showError } = useNotification();
  const currentHubUser = currentRoom?.getHubUser()

  return (
    <Paper elevation={3} className={classes.root}>
      <Typography className={classes.header}>
        {intl.formatMessage({
          id: 'chat.assignToTeammate',
          defaultMessage: 'Assign to a teammate',
        })}
      </Typography>
      <div className={classes.container}>
        {hubUsers.map((user) => {
          return (
            <AssigneeWrapper
              key={user.key}
              theme={theme}
              active={user.name === '?'}
              onClick={() => {
                currentRoom
                  ?.updateHubUser(currentHubUser?.id === user.id ? null : user.id)
                  .then(() => {
                    showSuccess(`Room successfully assigned to ${user.name}`);
                  })
                  .catch((error: Error) => showError(error.message))
                  .finally(() => {
                    handleCloseAssignPopup();
                  });
              }}
            >
              {currentHubUser?.id === user.id ? <Typography color='primary'>{user.name}</Typography> : <Typography variant="body2">{user.name}</Typography>}
            </AssigneeWrapper>
          );
        })}
      </div>
    </Paper>
  );
}
