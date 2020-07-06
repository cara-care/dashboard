import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import user from '@testing-library/user-event';
import withProviders from '../../../components/withProviders';
import { renderWithRedux } from '../../../utils/test-utils';
import TrackingOverviewHeader from '../components/TrackingOverviewHeader';

describe('<TrackingOverviewHeader/>', () => {
  it("doesn't go to previous or next day if disabled", () => {
    const TrackingOverviewHeaderWithProviders = withProviders(
      TrackingOverviewHeader,
      MemoryRouter
    );
    const props = {
      currentDate: new Date(),
      updateDate: jest.fn(),
      handleLeftArrowClick: jest.fn(),
      handleRightArrowClick: jest.fn(),
      disabled: true,
    };
    const { getAllByRole } = renderWithRedux(
      <TrackingOverviewHeaderWithProviders {...props} />
    );
    const buttons = getAllByRole('button');
    buttons.forEach((button) => {
      user.click(button);
    });
    expect(props.handleLeftArrowClick).not.toBeCalled();
    expect(props.handleRightArrowClick).not.toBeCalled();
  });
});
