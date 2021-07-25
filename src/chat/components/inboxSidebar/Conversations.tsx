import React, { useCallback, useState } from 'react';
import clsx from 'classnames';
import Accordion from '@material-ui/core/ExpansionPanel';
import AccordionDetails from '@material-ui/core/ExpansionPanelDetails';
import { Avatar, makeStyles } from '@material-ui/core';
import ConverstaionsItem from './ConversationsItem';
import { useDispatch } from 'react-redux';
import { selectInbox } from '../../redux';
import { INBOXES } from '../../inboxes';


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
  const [selectedIndex, setSelectedIndex] = useState(0);

  const renderConversationItems = useCallback(() => {
    return INBOXES.map(
      (inbox, index) => {
        return (
          <ConverstaionsItem
            key={inbox.slug}
            icon={
              <Avatar className={clsx(classes.avatar, classes.avatarEmoji)}>
                {inbox.icon}
              </Avatar>
            }
            text={inbox.name}
            // count={?}
            active={selectedIndex === index}
            handleSelected={() => {
              setSelectedIndex(index);
              dispatch(selectInbox(inbox));
            }}
          />
        );
      }
    );
  }, [
    classes.avatar,
    classes.avatarEmoji,
    dispatch,
    selectedIndex,
  ]);

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
