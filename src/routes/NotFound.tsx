import React from 'react';
import { FormattedMessage } from 'react-intl';
import Typography from '@material-ui/core/Typography';
import {
  StyleRules,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import isMobileDevice from '../utils/IsMobileDevice';

const styles = (theme: Theme): StyleRules => ({
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
});

type Props = WithStyles<typeof styles>;

class NotFound extends React.Component<Props> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography>
          {isMobileDevice() ? (
            <FormattedMessage id="404.onlyAvailableOnComputer" />
          ) : (
            <FormattedMessage id="404.invalidUrlGoToCara" />
          )}
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(NotFound);
