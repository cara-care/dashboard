import React, { useCallback } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, withStyles, lighten } from '@material-ui/core/styles';

// Like https://github.com/brunobertolini/styled-by
const styledBy = (property: string, mapping: object) => (props: object) =>
  mapping[props[property]];

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    height: '100%',
    boxShadow: '0 2px 13px 0 rgba(0,0,0,0.10)',
  },
  mb2: {
    marginBottom: theme.spacing(2),
  },
  mb: {
    marginBottom: theme.spacing(1),
  },
}));

interface Props {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  score: number;
  total: number;
}

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    backgroundColor: styledBy('color', {
      default: lighten('#01B3A8', 0.4),
      warning: lighten('#FF9900', 0.4),
      error: lighten('#FF0000', 0.4),
    }),
  },
  bar: {
    backgroundColor: styledBy('color', {
      default: '#01B3A8',
      warning: '#FF9900',
      error: '#FF0000',
    }),
  },
})(LinearProgress);

const Score: React.FC<Props> = ({ title, subtitle, score, total }) => {
  const classes = useStyles();
  const percentage = (score / total) * 100;
  const getColor = useCallback(() => {
    if (percentage < 34) {
      return 'error';
    } else if (percentage < 67) {
      return 'warning';
    } else {
      return 'default';
    }
  }, [percentage]);

  return (
    <Paper elevation={0} className={classes.card}>
      <div className={classes.mb2}>
        <Typography variant="h6">{title}</Typography>
        {subtitle && <Typography variant="caption">{subtitle}</Typography>}
      </div>
      <BorderLinearProgress
        className={classes.mb}
        variant="determinate"
        // @ts-ignore
        color={getColor()}
        value={percentage}
      />
      <Typography variant="h6">
        {score}{' '}
        <Typography variant="caption" component="span">
          / {total}
        </Typography>
      </Typography>
    </Paper>
  );
};

export default Score;
