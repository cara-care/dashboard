import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { waitFor } from '@testing-library/react';
import withProviders from '../../../components/withProviders';
import { renderWithRedux } from '../../../utils/test-utils';
import InboxSidebar from '../../components/inboxSidebar/InboxSidebar';
import { getInboxesList } from '../../../utils/api';
import { chatConversationsMock } from '../../testHelpers';

jest.mock('../../../utils/api');
const mockGetInboxesList = getInboxesList as jest.Mock;

describe('<InboxSidebar />', () => {
  it('does render correctly', async () => {
    mockGetInboxesList.mockResolvedValueOnce({
      data: { results: chatConversationsMock },
    });
    const InboxSidebarWithProviders = withProviders(InboxSidebar, MemoryRouter);
    const { getByText } = renderWithRedux(<InboxSidebarWithProviders />);
    await waitFor(() => {
      expect(mockGetInboxesList).toBeCalledTimes(1);
    });
    expect(getByText(/inbox/i)).toBeInTheDocument();
  });
});
