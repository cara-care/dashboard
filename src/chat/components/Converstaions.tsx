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

function ConverstaionsItem({ image, text, count, selectedIndex }: any) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        color: selectedIndex ? 'green' : 'black',
      }}
    >
      <div style={{ marginTop: 5 }}>{image}</div>
      <p style={{ marginLeft: 12, marginRight: 'auto' }}>{text}</p>
      {count && <p>{count}</p>}
    </div>
  );
}

export default function Converstaions() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  console.log(setSelectedIndex);
  // const handleListItemClick = (
  //   event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  //   index: number
  // ) => {
  //   setSelectedIndex(index);
  // };

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
            image={<InboxIcon />}
            text="You"
            count={6}
            selectedIndex={selectedIndex === 0}
          />
          <ConverstaionsItem
            image={<AlternateEmailIcon />}
            text="Mentions"
            count={6}
            selectedIndex={selectedIndex === 1}
          />
          <ConverstaionsItem
            image={<PersonOutlineIcon />}
            text="Unassigned"
            count={999}
            selectedIndex={selectedIndex === 2}
          />
          <ConverstaionsItem
            image={<PeopleOutlineIcon />}
            text="All"
            count={1236}
            selectedIndex={selectedIndex === 3}
          />
          <ConverstaionsItem image={<AddIcon />} text="Create View" />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
