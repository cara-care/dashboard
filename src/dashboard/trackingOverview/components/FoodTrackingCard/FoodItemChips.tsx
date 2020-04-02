import React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Chip from '@material-ui/core/Chip';
import {
  withStyles,
  Theme,
  StyleRules,
  WithStyles,
} from '@material-ui/core/styles';

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

type Props = OwnProps & InjectedIntlProps & WithStyles<typeof styles>;

const FoodItemChips: React.FC<Props> = ({
  foodItems,
  customFoodItems,
  intl,
  classes,
}) => {
  const { locale } = intl;

  const foodItemChips = foodItems.map((foodItem, index) => {
    let name;
    if (locale === 'de') {
      name =
        foodItem.name_de.charAt(0).toUpperCase() + foodItem.name_de.slice(1);
    } else {
      name =
        foodItem.name_en.charAt(0).toUpperCase() + foodItem.name_en.slice(1);
    }
    return (
      <Chip
        color="primary"
        className={classes.chip}
        key={'fi' + index}
        label={name}
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
