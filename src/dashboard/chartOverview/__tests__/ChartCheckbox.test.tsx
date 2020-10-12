import React from 'react';
import { render } from '@testing-library/react';
import user from '@testing-library/user-event';
import ChartCheckbox from '../ChartCheckbox';
import { ChartTrackingTypes } from '../chartOverviewUtils';

describe('<ChartCheckbox />', () => {
  it('triggers onChange handler when clicked', () => {
    const mockCallback = jest.fn();
    const label = 'test';

    const CheckBox = () => (
      <ChartCheckbox
        chartTrackingType={ChartTrackingTypes.water}
        label={label}
        active
        onChange={mockCallback}
      />
    );

    const screen = render(<CheckBox />);
    const input = screen.getByLabelText(label);

    user.click(input);

    expect(mockCallback).toBeCalledWith(ChartTrackingTypes.water);
    expect(mockCallback).toBeCalledTimes(1);
  });
});
