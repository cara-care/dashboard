import { Avatar, makeStyles } from '@material-ui/core';
import Accordion from '@material-ui/core/ExpansionPanel';
import AccordionDetails from '@material-ui/core/ExpansionPanelDetails';
import clsx from 'classnames';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { INBOXES } from '../../inboxes';
import { getInbox, Inbox as InboxType, selectInbox } from '../../redux';
import ConverstaionsItem from './ConversationsItem';

const useStyles = makeStyles(() => ({
  avatar: {
    height: 22,
    width: 22,
    marginTop: -4,
  },
  avatarEmoji: {
    backgroundColor: 'transparent',
    paddingLeft: 3,
  },
}));

export default function Conversations() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedInbox = useSelector(getInbox);

  const renderConversationItems = useCallback(() => {
    return Object.keys(INBOXES).map((inboxType: InboxType) => {
      return (
        <ConverstaionsItem
          key={inboxType}
          icon={
            <Avatar className={clsx(classes.avatar, classes.avatarEmoji)}>
              {INBOXES[inboxType].icon}
            </Avatar>
          }
          text={INBOXES[inboxType].name}
          // count={?}
          active={selectedInbox === inboxType}
          handleSelected={() => {
            dispatch(selectInbox(inboxType));
          }}
        />
      );
    });
  }, [classes.avatar, classes.avatarEmoji, dispatch, selectedInbox]);

  return (
    <div>
      <Accordion
        defaultExpanded
        style={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
        }}
      >
        <AccordionDetails style={{ display: 'flex', flexDirection: 'column' }}>
          {renderConversationItems()}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
