import React, { useCallback } from 'react';
import Accordion from '@material-ui/core/ExpansionPanel';
import AccordionSummary from '@material-ui/core/ExpansionPanelSummary';
import AccordionDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InboxIcon from '@material-ui/icons/Inbox';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import AddIcon from '@material-ui/icons/Add';
import { Typography } from '@material-ui/core';
import ConverstaionsItem from './ConversationsItem';
import { useDispatch, useSelector } from 'react-redux';
import { getNutriName } from '../../auth';
import { setChatRoomsSlug } from '../redux';
import { useIntl } from 'react-intl';

export default function Conversations() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const intl = useIntl();
  const dispatch = useDispatch();
  const nutriName = useSelector(getNutriName);

  const setChatSlug = useCallback(
    (slug: string) => {
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

  // TODO: refactor render items
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
            <Typography variant="subtitle1">CONVERSATIONS</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails style={{ display: 'flex', flexDirection: 'column' }}>
          <ConverstaionsItem
            icon={<InboxIcon fontSize="small" />}
            text={intl.formatMessage({
              id: 'common.you',
              defaultMessage: 'You',
            })}
            count={6}
            selectedIndex={selectedIndex === 0}
            handleSelected={(
              e: React.MouseEvent<HTMLDivElement, MouseEvent>
            ) => {
              handleListItemClick(e, 0);
              setChatSlug(nutriName);
            }}
          />
          <ConverstaionsItem
            icon={<PeopleOutlineIcon />}
            text="All"
            count={1236}
            selectedIndex={selectedIndex === 3}
            handleSelected={(
              e: React.MouseEvent<HTMLDivElement, MouseEvent>
            ) => {
              handleListItemClick(e, 3);
              setChatSlug('All');
            }}
          />
          <ConverstaionsItem icon={<AddIcon />} text="Create View" />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
