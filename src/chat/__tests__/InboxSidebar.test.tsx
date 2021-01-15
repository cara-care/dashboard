import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import withProviders from '../../components/withProviders';
import { renderWithRedux } from '../../utils/test-utils';
import InboxSidebar from '../components/InboxSidebar';

describe('<InboxSidebar />', () => {
  it('does render correctly', () => {
    const InboxSidebarWithProviders = withProviders(InboxSidebar, MemoryRouter);
    const { getByText } = renderWithRedux(<InboxSidebarWithProviders />);
    expect(getByText(/inbox/i)).toBeInTheDocument();
  });
});
