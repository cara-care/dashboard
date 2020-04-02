import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import Typography from '@material-ui/core/Typography';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { getIntlContentForChartTrackingType } from './chartOverviewUtils';
import ChartCheckbox from './ChartCheckbox';

interface OwnProps {
  title: string;
  checkboxes:
    | {
        active: boolean;
        chartTrackingType: string;
      }[]
    | null;
  handleClick: (chartTrackingType: string) => void;
  row?: boolean;
}

type Props = OwnProps & InjectedIntlProps;

const ChartCheckboxes: React.FC<Props> = ({
  intl,
  title,
  checkboxes,
  handleClick,
  row,
}) => (
  <>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <FormGroup row={row}>
      {checkboxes &&
        checkboxes.map(({ active, chartTrackingType }) => (
          <ChartCheckbox
            key={chartTrackingType}
            active={active}
            label={intl.formatMessage(
              getIntlContentForChartTrackingType(chartTrackingType)
            )}
            chartTrackingType={chartTrackingType}
            onChange={handleClick}
          />
        ))}
    </FormGroup>
  </>
);

export default injectIntl(ChartCheckboxes);
