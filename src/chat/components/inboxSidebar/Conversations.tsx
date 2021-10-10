import { Avatar, makeStyles } from '@material-ui/core';
import Accordion from '@material-ui/core/ExpansionPanel';
import AccordionDetails from '@material-ui/core/ExpansionPanelDetails';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import ArrowRight from '@material-ui/icons/ArrowRight';
import clsx from 'classnames';
import React from 'react';
import useKabelwerk from '../../hooks/useKabelwerk';
import { INBOXES } from '../../inboxes';
import ConversationsItem from './ConversationsItem';
import { InboxType } from '../../pages/Inbox';

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 22,
    width: 26,
    padding: 5,
  },
  avatarEmoji: {
    backgroundColor: 'transparent',
    paddingLeft: 3,
  },
  collapsibleButtonWrapper: {
    display: 'flex',
    padding: 8,
    justifyContent: 'flex-start',
    alignItems: 'center',
    cursor: 'pointer',
    color: theme.palette.text.primary,
    opacity: 0.7,
    margin: '10px 0 4px 8px',
    '&:hover': {
      opacity: 1,
    },
  },
  collapseText: {
    color: theme.palette.text.primary,
    fontSize: 12,
    opacity: 0.7,
  },
}));

export default function Conversations() {
  const classes = useStyles();
  const { currentInboxType, selectInbox } = useKabelwerk();
  const [isInboxCollapsed, setIsInboxCollapsed] = React.useState(false);

  return (
    <div>
      <Accordion
        defaultExpanded
        style={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
        }}
      >
        <div
          onClick={() => setIsInboxCollapsed(!isInboxCollapsed)}
          className={classes.collapsibleButtonWrapper}
          title={isInboxCollapsed ? 'expand menu' : 'collapse menu'}
        >
          {isInboxCollapsed ? (
            <ArrowRight style={{ fontSize: 30 }} />
          ) : (
            <>
              <ArrowLeft style={{ fontSize: 30 }} />
              <span className={classes.collapseText}>collapse</span>
            </>
          )}
        </div>
        <AccordionDetails style={{ display: 'flex', flexDirection: 'column' }}>
          {Object.keys(INBOXES).map((inboxType: InboxType) => {
            return (
              <ConversationsItem
                key={inboxType}
                icon={
                  <Avatar className={clsx(classes.avatar, classes.avatarEmoji)}>
                    {INBOXES[inboxType].icon}
                  </Avatar>
                }
                text={INBOXES[inboxType].name}
                // count={1}
                active={currentInboxType === inboxType}
                handleSelected={() => {
                  selectInbox(inboxType);
                }}
                isInboxCollapsed={isInboxCollapsed}
              />
            );
          })}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
