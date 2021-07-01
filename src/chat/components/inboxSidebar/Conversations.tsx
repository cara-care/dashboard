import React, { useCallback, useState } from 'react';
import clsx from 'classnames';
import Accordion from '@material-ui/core/ExpansionPanel';
import AccordionDetails from '@material-ui/core/ExpansionPanelDetails';
import { Avatar, makeStyles } from '@material-ui/core';
import ConverstaionsItem from './ConversationsItem';
import { useDispatch } from 'react-redux';
import {
  setChatRoomsSlug,
} from '../../redux';
import { useIntl } from 'react-intl';

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

export const INBOXES = [
  {slug: 'personal', name: 'Assigned to me', icon: '💚'},
  {slug: 'DE:free', name: 'Germany (free)', icon: '🐙'},
  {slug: 'DE:premium', name: 'Germany (premium)', icon: '🐻'},
  {slug: 'UK:free', name: 'UK (free)', icon: '🐙'},
  {slug: 'UK:premium', name: 'UK (premium)', icon: '🐻'},
  {slug: 'pilot_study', name: 'Anwendertest', icon: '🧪'},
  {slug: '_', name: 'Unknown', icon: '❓'},
  {slug: 'all', name: 'All', icon: '🌍'},
];

export default function Conversations() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const setChatSlug = useCallback(
    (slug: string = 'undefined') => {
      dispatch(setChatRoomsSlug(slug));
    },
    [dispatch]
  );

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
              setChatSlug(inbox.name);
            }}
          />
        );
      }
    );
  }, [
    intl,
    selectedIndex,
    setChatSlug,
    classes.avatar,
    classes.avatarEmoji,
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
