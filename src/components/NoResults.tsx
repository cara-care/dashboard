import React from 'react';
import { FormattedMessage } from 'react-intl';
import Typography from '@material-ui/core/Typography';
import {
  withStyles,
  WithStyles,
  Theme,
  StyleRules,
} from '@material-ui/core/styles';
import NotFoundIMG from '../assets/img/NotFound.png';
import NotDataIMG from '../assets/img/NoData.png';

const styles = (theme: Theme): StyleRules => ({
  root: {
    marginTop: theme.spacing(8),
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    margin: '0 auto',
    height: 'auto',
    maxWidth: 273,
  },
  heading: {
    marginBottom: theme.spacing(2),
  },
});

interface OwnProps {
  query?: string | null;
}

type Props = OwnProps & WithStyles<typeof styles>;

const NoResults: React.FC<Props> = ({ classes, query }) => {
  // No search results
  if (query) {
    return (
      <div className={classes.root}>
        <img
          src={NotFoundIMG}
          alt="No Results"
          className={classes.illustration}
        />
        <Typography variant="h5" className={classes.heading}>
          <FormattedMessage id="search.noResults" />
        </Typography>
        <Typography>
          <FormattedMessage
            id="search.sorryNoResultsFor"
            values={{ phrase: query }}
          />
        </Typography>
      </div>
    );
  }

  // No medical record provided
  return (
    <div className={classes.root}>
      <img src={NotDataIMG} alt="No Data" className={classes.illustration} />
      <Typography variant="h5" className={classes.heading}>
        <FormattedMessage id="nutriRecord.noResults.noData" />
      </Typography>
      <Typography>
        <FormattedMessage id="nutriRecord.noResults.patientDidntProvideMedicalHistory" />
      </Typography>
    </div>
  );
};

export default withStyles(styles)(NoResults);
