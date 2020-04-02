import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Typography from '@material-ui/core/Typography';
import {
  withStyles,
  Theme,
  StyleRules,
  WithStyles,
} from '@material-ui/core/styles';
import * as Sentry from '@sentry/browser';
import FoodItemChips from './FoodItemChips';
import TrackingOverviewCardHeader from '../TrackingOverviewCardHeader';
import Spinner from '../../../../components/Spinner';
import { getIntlLabelForTrackingType } from '../../trackingOverviewUtils';
import { TrackingDataPoint } from '../../../types';
import { getTime } from '../../../../utils/dateUtils';
import { downloadMealItemImage } from '../../../../utils/api';
import { getPatientId } from '../../../../auth';

const styles = (theme: Theme): StyleRules => ({
  container: {
    padding: '20px 0',
    borderBottom: '1px solid #e0e0e0',
  },
  body: {
    margin: `${theme.spacing()}px auto`,
    width: '80%',
  },
  imgFluid: {
    display: 'block',
    width: '100%',
    maxWidth: '100%',
    height: 'auto',
  },
  spinnerWrapper: {
    marginBottom: '20px',
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

interface OwnProps {
  trackingDataPoint: TrackingDataPoint;
}

type Props = OwnProps & WithStyles<typeof styles>;

const FoodTrackingCard: React.FC<Props> = ({
  trackingDataPoint: { type, mealItems, timestampTracking },
  classes,
}) => {
  const patientId = useSelector(getPatientId);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const {
    hasImage,
    name,
    foodItems,
    customFoodItems,
    realmIdString,
  } = mealItems[0];

  useEffect(() => {
    const { realmIdString, hasImage } = mealItems[0];
    async function downloadImage() {
      if (realmIdString && hasImage) {
        try {
          const res = await downloadMealItemImage({
            userId: patientId,
            realmId: realmIdString,
          });
          setImageURL(URL.createObjectURL(res.data));
        } catch (err) {
          if (process.env.NODE_ENV === 'production') {
            Sentry.captureException(err);
          }
        }
      }
    }
    downloadImage();
  }, [mealItems, patientId]);

  if (hasImage) {
    if (imageURL) {
      return (
        <div key={realmIdString} className={classes.container}>
          <TrackingOverviewCardHeader
            time={getTime(timestampTracking).toString()}
            type={
              <FormattedMessage
                // @ts-ignore
                id={getIntlLabelForTrackingType(type)}
                defaultMessage="Food"
              />
            }
          />
          <img src={imageURL} alt={name} className={classes.imgFluid} />
          <div className={classes.body}>
            <Typography variant="body2">{name}</Typography>
          </div>
          <FoodItemChips
            foodItems={foodItems}
            customFoodItems={customFoodItems}
          />
        </div>
      );
    } else {
      return (
        <div key={realmIdString} className={classes.container}>
          <TrackingOverviewCardHeader
            time={getTime(timestampTracking).toString()}
            type={
              <FormattedMessage
                // @ts-ignore
                id={getIntlLabelForTrackingType(type)}
                defaultMessage="Food"
              />
            }
          />
          <div className={classes.spinnerWrapper}>
            <Spinner noText />
          </div>
          <FoodItemChips
            foodItems={foodItems}
            customFoodItems={customFoodItems}
          />
        </div>
      );
    }
  } else {
    return (
      <div key={realmIdString} className={classes.container}>
        <TrackingOverviewCardHeader
          time={getTime(timestampTracking).toString()}
          type={
            <FormattedMessage
              // @ts-ignore
              id={getIntlLabelForTrackingType(type)}
              defaultMessage="Food"
            />
          }
        />
        <div className={classes.body}>
          <Typography variant="body2">{name}</Typography>
        </div>
        <FoodItemChips
          foodItems={foodItems}
          customFoodItems={customFoodItems}
        />
      </div>
    );
  }
};

export default withStyles(styles)(FoodTrackingCard);
