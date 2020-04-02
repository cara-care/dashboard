import React from 'react';
import { DatePicker } from '@material-ui/pickers';
import {
  withStyles,
  Theme,
  StyleRules,
  WithStyles,
} from '@material-ui/core/styles';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

const styles = (theme: Theme): StyleRules => ({
  row: {
    marginTop: theme.spacing(),
    marginBottom: theme.spacing(),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

interface OwnProps {
  startDate: Date;
  endDate: Date;
  updateStartDate: (date: Date) => void;
  updateEndDate: (date: Date) => void;
  disablePickers: boolean;
}

type Props = OwnProps & InjectedIntlProps & WithStyles<typeof styles>;

class DoubleDatePicker extends React.PureComponent<Props> {
  handleChangeStartDate = (date: MaterialUiPickersDate) => {
    if (date) {
      this.props.updateStartDate(date.toDate());
    }
  };

  handleChangeEndDate = (date: MaterialUiPickersDate) => {
    if (date) {
      this.props.updateEndDate(date.toDate());
    }
  };

  render() {
    const { intl, classes, disablePickers } = this.props;
    const cancelLabel = intl.formatMessage({ id: 'timePicker.CANCEL' });

    return (
      <div className={classes.row}>
        <DatePicker
          disabled={disablePickers}
          onChange={this.handleChangeStartDate}
          style={{ width: '95px' }}
          autoOk={true}
          format="L"
          maxDate={this.props.endDate}
          label={intl.formatMessage({
            id: 'overview.timePicker.startDate',
          })}
          value={this.props.startDate}
          cancelLabel={cancelLabel}
        />
        <DatePicker
          disabled={disablePickers}
          disableFuture
          onChange={this.handleChangeEndDate}
          style={{ width: '95px' }}
          autoOk={true}
          format="L"
          label={intl.formatMessage({
            id: 'overview.timePicker.endDate',
          })}
          value={this.props.endDate}
          cancelLabel={cancelLabel}
        />
      </div>
    );
  }
}

export default injectIntl(withStyles(styles)(DoubleDatePicker));
