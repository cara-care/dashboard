import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardContent, SvgIcon } from '@material-ui/core';
import { ReactComponent as CardDetailsIcon } from '../../../assets/images/iconChatDetailsCard.svg';

const useStyles = makeStyles((_theme) => ({
  cardItem: {
    display: 'flex',
    marginBottom: 4,
  },
  icon: {
    marginRight: 8,
  },
  cardItemText: {
    fontSize: 13,
    display: 'flex',
  },
}));

export interface CardDetailsValues {
  key: string;
  value: any;
  component?: JSX.Element;
}

interface CardBasicListProps {
  cardDetailsValues: CardDetailsValues[];
}

export default function CardBasicList({
  cardDetailsValues,
}: CardBasicListProps) {
  const classes = useStyles();

  return (
    <CardContent>
      {cardDetailsValues.map((item) => (
        <div key={item.key} className={classes.cardItem}>
          <SvgIcon className={classes.icon}>
            <CardDetailsIcon />
          </SvgIcon>
          <div className={classes.cardItemText}>
            {item.key}: {item.component ?? null} {item.value}
          </div>
        </div>
      ))}
    </CardContent>
  );
}
