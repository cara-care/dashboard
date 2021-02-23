import React from 'react';
import Accordion from '@material-ui/core/ExpansionPanel';
import AccordionSummary from '@material-ui/core/ExpansionPanelSummary';
import AccordionDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Typography } from '@material-ui/core';
import ConverstaionsItem from './ConversationsItem';

interface SidebarProgramsProps {
  title: string;
}

export default function SidebarPrograms({ title }: SidebarProgramsProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  const handleListItemClick = (
    _: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  // TODO: refactor render items, fix styling
  return (
    <div>
      <Accordion
        style={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
          marginTop: 16,
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${title}-content`}
          id={`${title}-header`}
          style={{
            display: 'inline-flex',
            flexDirection: 'row-reverse',
            height: 30,
            minHeight: 30,
            marginLeft: -16,
          }}
        >
          <div style={{ marginLeft: 8 }}>
            <Typography variant="subtitle1">{title}</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails style={{ display: 'flex', flexDirection: 'column' }}>
          <ConverstaionsItem
            type="secondary"
            icon="🐻"
            text="Cara Care Premium"
            count={6}
            active={selectedIndex === 0}
            handleSelected={(
              e: React.MouseEvent<HTMLDivElement, MouseEvent>
            ) => {
              handleListItemClick(e, 0);
            }}
          />
          <ConverstaionsItem
            type="secondary"
            icon="🐙"
            text="Cara Care Free"
            count={6}
            active={selectedIndex === 1}
            handleSelected={(
              e: React.MouseEvent<HTMLDivElement, MouseEvent>
            ) => {
              handleListItemClick(e, 1);
            }}
          />
          <ConverstaionsItem
            type="secondary"
            icon="💩"
            text="Technical Support"
            count={999}
            active={selectedIndex === 2}
            handleSelected={(
              e: React.MouseEvent<HTMLDivElement, MouseEvent>
            ) => {
              handleListItemClick(e, 2);
            }}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
