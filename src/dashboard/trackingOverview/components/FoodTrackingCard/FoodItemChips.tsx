import React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import Chip from '@material-ui/core/Chip';
import {
  withStyles,
  Theme,
  StyleRules,
  WithStyles,
} from '@material-ui/core/styles';
import capitalize from 'lodash/capitalize';

const styles = (theme: Theme): StyleRules => ({
  chip: {
    margin: `${theme.spacing(0.5)}px ${theme.spacing()}px`,
  },
  footer: {
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: '80%',
  },
});

interface OwnProps {
  foodItems: {
    name_de: string;
    name_en: string;
  }[];
  customFoodItems: {
    name: string;
  }[];
}

type Props = OwnProps & WrappedComponentProps & WithStyles<typeof styles>;

const FoodItemChips: React.FC<Props> = ({
  foodItems,
  customFoodItems,
  intl,
  classes,
}) => {
  const { locale } = intl;

  const foodItemChips = foodItems.map((foodItem, index) => {
    return (
      <Chip
        color="primary"
        className={classes.chip}
        key={'fi' + index}
        label={capitalize(
          locale === 'de' ? foodItem.name_de : foodItem.name_en
        )}
      />
    );
  });
  const customFoodItemChips = customFoodItems.map((customFoodItem, index) => (
    <Chip
      key={'cfi' + index}
      label={customFoodItem.name}
      color="primary"
      className={classes.chip}
    />
  ));
  if (foodItemChips.length !== 0 || customFoodItemChips.length !== 0) {
    return (
      <div className={classes.footer}>
        {foodItemChips}
        {customFoodItemChips}
      </div>
    );
  } else {
    return null;
  }
};

export default injectIntl(withStyles(styles)(FoodItemChips));
