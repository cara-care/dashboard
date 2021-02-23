import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import withProviders from '../../../components/withProviders';
import { renderWithRedux } from '../../../utils/test-utils';
import ConversationItems from '../../components/inboxSidebar/ConversationsItem';

const testText = 'testText';
const handleSelectedMock = jest.fn();
const testCount = 1000;

describe('<ConversationItems />', () => {
  const ConversationItemsWithUser = () => (
    <ConversationItems
      icon="🐻"
      text={testText}
      count={testCount}
      active={false}
      handleSelected={handleSelectedMock}
    />
  );
  it('renders elements correctly', () => {
    const ConversationItemsWithProviders = withProviders(
      ConversationItemsWithUser,
      MemoryRouter
    );
    const { getByText } = renderWithRedux(<ConversationItemsWithProviders />);
    expect(getByText(testText)).toBeInTheDocument();
    expect(getByText(String(testCount))).toBeInTheDocument();
    expect(getByText('🐻')).toBeInTheDocument();
  });
});
