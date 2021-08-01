import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import withProviders from '../../../components/withProviders';
import { renderWithRedux } from '../../../utils/test-utils';
import CardBasicList from '../../components/cards/CardBasicList';

const cardDetailsValues = [{ key: 'testKey', value: 'testValue' }];

describe('<CardBasicList />', () => {
  const CardBasicListWithUser = () => (
    <CardBasicList cardDetailsValues={cardDetailsValues} />
  );
  it('renders items correctly', () => {
    const CardBasicListWithProviders = withProviders(
      CardBasicListWithUser,
      MemoryRouter
    );
    const { getByText } = renderWithRedux(<CardBasicListWithProviders />);
    expect(
      getByText(new RegExp(cardDetailsValues[0].key, 'i'))
    ).toBeInTheDocument();
    expect(
      getByText(new RegExp(cardDetailsValues[0].value, 'i'))
    ).toBeInTheDocument();
  });
});
