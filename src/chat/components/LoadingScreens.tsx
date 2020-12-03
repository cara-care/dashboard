import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: 275,
      minHeight: 180,
      marginTop: 16,
      paddingHorizontal: theme.spacing(2),
      borderRadius: 12,
    },
  })
);

export function CardDetailSkeleton() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Skeleton animation="wave" width="100%" height={30} />
        <Skeleton animation="wave" width="100%" height={30} />
        <Skeleton animation="wave" width="100%" height={30} />
        <Skeleton animation="wave" width="100%" height={30} />
        <Skeleton animation="wave" width="100%" height={30} />
      </CardContent>
    </Card>
  );
}
