import React from 'react';
import Accordion from '@material-ui/core/ExpansionPanel';
import AccordionSummary from '@material-ui/core/ExpansionPanelSummary';
import AccordionDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InboxIcon from '@material-ui/icons/Inbox';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import AddIcon from '@material-ui/icons/Add';
import { Typography } from '@material-ui/core';
import ConverstaionsItem from './ConversationsItem';

export default function Converstaions() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

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
            text="You"
            count={6}
            selectedIndex={selectedIndex === 0}
            handleSelected={(
              e: React.MouseEvent<HTMLDivElement, MouseEvent>
            ) => {
              handleListItemClick(e, 0);
            }}
          />
          <ConverstaionsItem
            icon={<AlternateEmailIcon fontSize="small" />}
            text="Mentions"
            count={6}
            selectedIndex={selectedIndex === 1}
            handleSelected={(
              e: React.MouseEvent<HTMLDivElement, MouseEvent>
            ) => {
              handleListItemClick(e, 1);
            }}
          />
          <ConverstaionsItem
            icon={<PersonOutlineIcon />}
            text="Unassigned"
            count={999}
            selectedIndex={selectedIndex === 2}
            handleSelected={(
              e: React.MouseEvent<HTMLDivElement, MouseEvent>
            ) => {
              handleListItemClick(e, 2);
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
            }}
          />
          <ConverstaionsItem icon={<AddIcon />} text="Create View" />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
