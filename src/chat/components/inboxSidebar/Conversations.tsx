import { Avatar, makeStyles } from '@material-ui/core';
import Accordion from '@material-ui/core/ExpansionPanel';
import AccordionDetails from '@material-ui/core/ExpansionPanelDetails';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import ArrowRight from '@material-ui/icons/ArrowRight';
import clsx from 'classnames';
import React from 'react';
import useKabelwerk from '../../hooks/useKabelwerk';
import { INBOXES, InboxType } from '../../inboxes';
import ConversationsItem from './ConversationsItem';

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
  const { openInbox } = useKabelwerk();
  const [isMenuCollapsed, setIsMenuCollapsed] = React.useState(false);
  const [currentInbox, setCurrentInbox] = React.useState(InboxType.ALL)

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
          onClick={() => setIsMenuCollapsed(!isMenuCollapsed)}
          className={classes.collapsibleButtonWrapper}
          title={isMenuCollapsed ? 'expand menu' : 'collapse menu'}
        >
          {isMenuCollapsed ? (
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
                active={currentInbox === inboxType}
                handleSelected={() => {
                  setCurrentInbox(inboxType)
                  openInbox(inboxType);
                }}
                isMenuCollapsed={isMenuCollapsed}
              />
            );
          })}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
