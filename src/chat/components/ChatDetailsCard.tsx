import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
  SvgIcon,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ReactComponent as CardDetailsIcon } from '../../assets/images/iconChatDetailsCard.svg';
import { CardDetailSkeleton } from './LoadingScreens';

const useStyles = makeStyles((_theme) => ({
  root: {
    marginTop: 16,
    minWidth: 275,
    borderRadius: 12,
  },
  headerRoot: {
    alignItems: 'baseline',
    paddingBottom: 0,
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 14,
    marginTop: 6,
  },
  cardItem: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  cardItemText: {
    fontSize: 13,
  },
}));

export interface CardDetailsValues {
  key: string;
  value: string | number;
}

interface ChatDetailsCardProps {
  loading: boolean;
  title: string;
  cardDetailsValues: CardDetailsValues[];
}

export default function ChatDetailsCard({
  loading,
  title,
  cardDetailsValues,
}: ChatDetailsCardProps) {
  const classes = useStyles();

  if (loading) {
    return <CardDetailSkeleton />;
  }

  return (
    <Card className={classes.root}>
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
      <CardContent>
        {cardDetailsValues.map((item) => (
          <div key={item.key} className={classes.cardItem}>
            <SvgIcon className={classes.icon}>
              <CardDetailsIcon />
            </SvgIcon>
            <Typography className={classes.cardItemText}>
              {item.key}: {item.value}
            </Typography>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
