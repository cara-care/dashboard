import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardContent } from '@material-ui/core';

const useStyles = makeStyles((_theme) => ({
  cardItemText: {
    fontSize: 13,
    marginBottom: 4,
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
        <div key={item.key} className={classes.cardItemText}>
          {item.key}: <strong>{item.value}</strong>
        </div>
      ))}
    </CardContent>
  );
}
