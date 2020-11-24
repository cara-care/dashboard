import React from 'react';
import { build, fake } from '@jackfranklin/test-data-bot';
import times from 'lodash/times';
import FoodItemChips from '../components/FoodTrackingCard/FoodItemChips';
import withProviders from '../../../components/withProviders';
import { renderWithRedux } from '../../../utils/test-utils';

const foodItemBuilder = build<{ name_de: string; name_en: string }>(
  'FoodItem',
  {
    fields: {
      name_de: fake((f) => f.random.word()),
      name_en: fake((f) => f.random.word()),
    },
  }
);

const customFoodItemBuilder = build<{ name: string }>('CustomFoodItem', {
  fields: {
    name: fake((f) => f.random.word()),
  },
});

describe('<FoodItemChips />', () => {
  const NUM_ITEMS = 5;
  const mockFoodItemsData = Array(NUM_ITEMS)
    .fill(undefined)
    .map(foodItemBuilder);
  const mockCustomFoodItemsData = Array(NUM_ITEMS)
    .fill(undefined)
    .map(customFoodItemBuilder);

  const FoodItemChipsEmpty = () => (
    <FoodItemChips foodItems={[]} customFoodItems={[]} />
  );
  const FoodItemChipsFilled = () => (
    <FoodItemChips
      foodItems={mockFoodItemsData}
      customFoodItems={mockCustomFoodItemsData}
    />
  );

  it("doesn't render anything when passed empty array", () => {
    const ConnectedFoodItemChips = withProviders(FoodItemChipsEmpty);
    const screen = renderWithRedux(<ConnectedFoodItemChips />);
    expect(screen.container.firstChild).toBeNull();
  });

  it('renders foodItems and customFoodItems when given a prop', () => {
    const ConnectedFoodItemChips = withProviders(FoodItemChipsFilled);
    const screen = renderWithRedux(<ConnectedFoodItemChips />);

    times(NUM_ITEMS).forEach((_n, i) => {
      screen
        .getAllByText(new RegExp(mockFoodItemsData[i].name_en, 'i'))
        .forEach((el) => expect(el).toBeVisible());
      screen
        .getAllByText(mockCustomFoodItemsData[i].name)
        .forEach((el) => expect(el).toBeVisible());
    });
  });
});
