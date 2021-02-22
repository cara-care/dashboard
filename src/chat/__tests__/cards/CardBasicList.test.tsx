import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import withProviders from '../../../components/withProviders';
import { renderWithRedux } from '../../../utils/test-utils';
import CardBasicList from '../../components/cards/CardBasicList';

const testSpan = 'testSpan';
const cardDetailsValues = [
  { key: 'testKey', value: 'testValue' },
  { key: 'test2Key', value: 'test2Value', component: <span>{testSpan}</span> },
];

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
    expect(
      getByText(new RegExp(cardDetailsValues[1].key, 'i'))
    ).toBeInTheDocument();
    expect(
      getByText(new RegExp(cardDetailsValues[1].value, 'i'))
    ).toBeInTheDocument();
    expect(getByText(new RegExp(testSpan, 'i'))).toBeInTheDocument();
  });
});
