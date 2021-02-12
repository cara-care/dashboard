import React, { useCallback, useMemo, useState } from 'react';
import Accordion from '@material-ui/core/ExpansionPanel';
import AccordionSummary from '@material-ui/core/ExpansionPanelSummary';
import AccordionDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import AddIcon from '@material-ui/icons/Add';
import { Avatar, makeStyles, Typography } from '@material-ui/core';
import ConverstaionsItem from './ConversationsItem';
import { useDispatch, useSelector } from 'react-redux';
import {
  chatPublicConversationsSelector,
  chatOwnConversationsSelector,
  setChatRoomsSlug,
} from '../../redux';
import { useIntl } from 'react-intl';

const useStyles = makeStyles((theme) => ({
  uppercase: {
    textTransform: 'uppercase',
  },
  avatar: {
    height: 22,
    width: 22,
  },
}));

export default function Conversations() {
  const [selectedIndex, setSelectedIndex] = useState(2);
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const ownConversation = useSelector(chatOwnConversationsSelector);
  const publicConversations = useSelector(chatPublicConversationsSelector);

  const icons = useMemo(
    () => [
      <Avatar className={classes.avatar} />,
      <PermIdentityIcon />,
      <PeopleOutlineIcon />,
    ],
    [classes]
  );

  const setChatSlug = useCallback(
    (slug: string = 'undefined') => {
      dispatch(setChatRoomsSlug(slug));
    },
    [dispatch]
  );

  const handleListItemClick = (
    _: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  const renderConversationItems = useCallback(() => {
    return [ownConversation, ...publicConversations].map(
      (conversation, index) => {
        const isFirst = index === 0;
        return (
          <ConverstaionsItem
            key={`${conversation?.slug}-${index}`}
            icon={icons[index]}
            text={
              isFirst
                ? intl.formatMessage({
                    id: 'common.you',
                    defaultMessage: 'You',
                  })
                : conversation?.name
            }
            count={conversation?.rooms}
            selectedIndex={selectedIndex === index}
            handleSelected={(
              e: React.MouseEvent<HTMLDivElement, MouseEvent>
            ) => {
              handleListItemClick(e, index);
              setChatSlug(conversation?.name);
            }}
          />
        );
      }
    );
  }, [
    ownConversation,
    publicConversations,
    icons,
    intl,
    selectedIndex,
    setChatSlug,
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
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
          style={{ display: 'inline-flex', height: 30, minHeight: 30 }}
        >
          <div>
            <Typography variant="subtitle1" className={classes.uppercase}>
              {intl.formatMessage({
                id: 'chat.conversations',
                defaultMessage: 'Conversations',
              })}
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails style={{ display: 'flex', flexDirection: 'column' }}>
          {renderConversationItems()}
          <ConverstaionsItem icon={<AddIcon />} text="Create View" />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
