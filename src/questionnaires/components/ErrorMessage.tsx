import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Warning } from '@material-ui/icons';

interface Props {
  message: string;
}

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    // 100vh - (header height + container padding + nuriNavigation Height)px
    height: `calc(100vh - ${theme.spacing(8) + theme.spacing(3) + 67}px)`,
  },
}));

const ErrorMessage: React.FC<Props> = ({ message }) => {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <Warning color="error" />
      <Typography variant="body2">
        <span>{message}</span>
      </Typography>
    </div>
  );
};

export default ErrorMessage;
