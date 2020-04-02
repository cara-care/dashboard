import React from 'react';
import { FormattedMessage } from 'react-intl';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

interface Props {
  size?: number | string;
  noText?: boolean;
}

const Spinner: React.FC<Props> = ({ size, noText }) => (
  <>
    <CircularProgress size={size} style={{ marginBottom: 12 }} />
    {!noText && (
      <Typography>
        <FormattedMessage id="common.loadingData" />
      </Typography>
    )}
  </>
);

export default Spinner;
