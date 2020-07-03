import React from 'react';
import { FormattedMessage } from 'react-intl';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import isMobileDevice from '../utils/IsMobileDevice';
import { NOT_FOUND_TEXT_ID } from '../utils/test-helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 20,
    paddingRight: 20,
    display: 'flex',
    width: '100%',
    height: `calc(100vh - ${theme.spacing(8)}px)`,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const NotFound: React.FC = () => {
  const classes = useStyles();
  const isMobile = isMobileDevice();
  return (
    <div className={classes.root}>
      <Typography data-testid={NOT_FOUND_TEXT_ID}>
        {isMobile ? (
          <FormattedMessage
            id="404.onlyAvailableOnComputer"
            defaultMessage="Sorry, Cara Web Dashboard is only available on your computer."
          />
        ) : (
          <FormattedMessage
            id="404.invalidUrlGoToCara"
            defaultMessage="Oops, it looks like this is not a valid link. To get a valid link, go to the Cara app and request sharing access via Cara's desktop web interface."
          />
        )}
      </Typography>
    </div>
  );
};

export default NotFound;
