import { Avatar, makeStyles } from '@material-ui/core';
import Accordion from '@material-ui/core/ExpansionPanel';
import AccordionDetails from '@material-ui/core/ExpansionPanelDetails';
import clsx from 'classnames';
import React from 'react';
import useKabelwerk from '../../hooks/useKabelwerk';
import { INBOXES } from '../../inboxes';
import ConverstaionsItem from './ConversationsItem';
import { InboxType } from '../../pages/Inbox';

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
  const { currentInboxType, selectInbox } = useKabelwerk();

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
          {Object.keys(INBOXES).map((inboxType: InboxType) => {
            return (
              <ConverstaionsItem
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
              />
            );
          })}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
