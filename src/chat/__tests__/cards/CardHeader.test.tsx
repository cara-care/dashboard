import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import withProviders from '../../../components/withProviders';
import { renderWithRedux } from '../../../utils/test-utils';
import CardHeader from '../../components/cards/CardHeader';

const testTitle = 'Test Title';

describe.skip('<CardHeader />', () => {
  const CardHeaderWithUser = () => <CardHeader title={testTitle} />;
  it('renders title and settings icon correctly', () => {
    const CardHeaderWithProviders = withProviders(
      CardHeaderWithUser,
      MemoryRouter
    );
    const { getByText, getByLabelText } = renderWithRedux(
      <CardHeaderWithProviders />
    );
    expect(getByText(testTitle)).toBeInTheDocument();
    expect(getByLabelText(/settings/i)).toBeInTheDocument();
  });
});
