import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardHeader } from '@material-ui/core';

const useStyles = makeStyles((_theme) => ({
  headerRoot: {
    alignItems: 'baseline',
    paddingBottom: 0,
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 14,
    marginTop: 6,
  },
}));

interface CardHeaderCompProps {
  title: string;
}

export default function CardHeaderComp({ title }: CardHeaderCompProps) {
  const classes = useStyles();

  return (
    <CardHeader
      className={classes.headerRoot}
      title={title}
      titleTypographyProps={{ className: classes.title }}
    />
  );
}
