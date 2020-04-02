import React, { useCallback } from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { DatePicker } from '@material-ui/pickers';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import grey from '@material-ui/core/colors/grey';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((_) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderBottom: 'solid #E0E0E0 1px',
    height: '56px',
  },
}));

interface OwnProps {
  currentDate?: any;
  updateDate: (date: Date) => void;
  handleLeftArrowClick: () => void;
  handleRightArrowClick: () => void;
  disabled: boolean;
}

type Props = OwnProps & InjectedIntlProps;

const TrackingOverviewHeader: React.FC<Props> = ({
  currentDate,
  updateDate,
  handleLeftArrowClick,
  handleRightArrowClick,
  disabled,
  intl,
}) => {
  const classes = useStyles();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const shouldDisableNextArrow = today <= currentDate;
  const onChangeDate = useCallback(
    (date: MaterialUiPickersDate) => {
      if (date) {
        updateDate(date.toDate());
      }
    },
    [updateDate]
  );

  return (
    <div className={classes.wrapper}>
      <IconButton
        disabled={disabled}
        children={<ChevronLeft fill={grey[500]} />}
        onClick={handleLeftArrowClick}
      />
      <DatePicker
        style={{ width: '85px' }}
        onChange={onChangeDate}
        format="L"
        autoOk={true}
        value={currentDate}
        cancelLabel={intl.formatMessage({ id: 'timePicker.CANCEL' })}
        disableFuture
        disabled={disabled}
      />
      <IconButton
        disabled={disabled || shouldDisableNextArrow}
        children={<ChevronRight fill={grey[500]} />}
        onClick={handleRightArrowClick}
      />
    </div>
  );
};

export default injectIntl(TrackingOverviewHeader);
