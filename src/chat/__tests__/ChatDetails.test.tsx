import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import withProviders from '../../components/withProviders';
import { renderWithRedux } from '../../utils/test-utils';
import ChatDetails from '../components/ChatDetails';

describe('<ChatDetails />', () => {
  it('does render correctly', () => {
    const ChatDetailsWithProviders = withProviders(ChatDetails, MemoryRouter);
    const { getByText } = renderWithRedux(<ChatDetailsWithProviders />);
    expect(getByText(/conversation details/i)).toBeInTheDocument();
  });
});
