import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

interface OwnProps {
  chartTrackingType: string;
  label: string;
  active: boolean;
  onChange: (type: string) => void;
}

type Props = OwnProps;

class ChartCheckbox extends React.PureComponent<Props> {
  onChangeHandler = () => {
    const { chartTrackingType, onChange } = this.props;
    onChange(chartTrackingType);
  };

  render() {
    const { chartTrackingType, label, active } = this.props;

    return (
      <FormControlLabel
        key={chartTrackingType}
        label={label}
        onChange={this.onChangeHandler}
        style={{ width: '49%' }}
        control={
          <Checkbox color="primary" checked={active} style={{ padding: 10 }} />
        }
      />
    );
  }
}

export default ChartCheckbox;
