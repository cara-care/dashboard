import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardHeader, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      }
      title={title}
      titleTypographyProps={{ className: classes.title }}
    />
  );
}
