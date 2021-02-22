import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import withProviders from '../../../components/withProviders';
import { renderWithRedux } from '../../../utils/test-utils';
import HealthCard from '../../components/cards/HealthCard';
import { currentUserMock } from '../../testHelpers';

describe('<HealthCard />', () => {
  const HealthCardWithUser = () => <HealthCard />;
  it('renders user data correctly', () => {
    const HealthCardWithProviders = withProviders(
      HealthCardWithUser,
      MemoryRouter
    );
    const { getByText } = renderWithRedux(<HealthCardWithProviders />, {
      preloadedState: {
        chat: {
          currentChatUser: currentUserMock,
        },
      },
    });
    expect(
      getByText(new RegExp(currentUserMock.diagnosis.slice(1), 'i'))
    ).toBeInTheDocument();
  });
});
