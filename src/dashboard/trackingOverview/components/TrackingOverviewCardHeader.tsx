import React from 'react';
import AccessTime from '@material-ui/icons/AccessTime';
import Typography from '@material-ui/core/Typography';
import {
  withStyles,
  Theme,
  StyleRules,
  WithStyles,
} from '@material-ui/core/styles';

const styles = (theme: Theme): StyleRules => ({
  header: {
    margin: `0 auto ${theme.spacing(0.5)}px auto`,
    display: 'flex',
    alignItems: 'center',
    width: '80%',
  },
  inner: {
    paddingLeft: '12px',
    paddingRight: theme.spacing(),
    display: 'inline-flex',
    alignItems: 'center',
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  icon: {
    marginRight: theme.spacing(),
  },
  cardTitle: {
    paddingLeft: theme.spacing(),
    display: 'inline-block',
  },
});

interface OwnProps {
  time: string;
  type: React.ReactNode;
}

type Props = OwnProps & WithStyles<typeof styles>;

const TrackingOverviewCardHeader: React.FC<Props> = ({
  classes,
  time,
  type,
}) => (
  <div className={classes.header}>
    <div className={classes.inner}>
      <AccessTime className={classes.icon} />
      <Typography>{time}</Typography>
    </div>
    <div className={classes.cardTitle}>
      <Typography>{type}</Typography>
    </div>
  </div>
);

export default withStyles(styles)(TrackingOverviewCardHeader);
