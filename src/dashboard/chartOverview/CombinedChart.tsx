import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import { useIntl } from 'react-intl';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ChartTrackingTypes, DataSet } from './chartOverviewUtils';
import { addDays, subDays } from 'date-fns';

interface OwnProps {
  displayGrids: boolean;
  data: DataSet[];
  startDate: Date;
  endDate: Date;
}

type Props = OwnProps;

const useStyles = makeStyles((_theme) => ({
  root: {
    width: '100%',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'left',
    padding: '15px',
    overflow: 'hidden',
  },
}));

const CombinedChart: React.FC<Props> = ({
  displayGrids,
  startDate,
  endDate,
  data,
}) => {
  const intl = useIntl();
  const classes = useStyles();
  const theme = useTheme();
  const isDarkMode = theme.palette.type === 'dark';
  const labelsColor = isDarkMode ? theme.palette.text.primary : undefined;
  const maxLabelY = intl.formatMessage({ id: 'overview.chartLabel.bad' });
  const minLabelY = intl.formatMessage({ id: 'overview.chartLabel.good' });
  let displayWater = false;
  let displayBowel = false;
  let displayLong = false;

  if (
    data.findIndex(
      (data) => data.chartTrackingType === ChartTrackingTypes.water
    ) !== -1
  ) {
    displayWater = true;
  }
  if (
    data.findIndex(
      (data) => data.chartTrackingType === ChartTrackingTypes.bowelMovements
    ) !== -1
  ) {
    displayBowel = true;
  }
  if (
    data.findIndex(
      (data) => data.chartTrackingType === ChartTrackingTypes.workout
    ) !== -1 ||
    data.findIndex(
      (data) => data.chartTrackingType === ChartTrackingTypes.sleep
    ) !== -1
  ) {
    displayLong = true;
  }

  const options: ChartOptions = {
    maintainAspectRatio: true,
    legend: {
      display: true,
      labels: {
        fontColor: labelsColor,
      },
      position: 'bottom',
    },
    scales: {
      xAxes: [
        {
          gridLines: { display: displayGrids },
          type: 'time',
          bounds: 'ticks',
          time: {
            // FIXME: figure out if this is intended
            // @ts-ignore
            // distribution: 'series',
            unit: 'day',
          },
          ticks: {
            min: subDays(startDate, 1),
            max: addDays(endDate, 1),
            fontColor: labelsColor,
          },
          scaleLabel: {
            display: false,
            labelString: 'Date',
            fontColor: labelsColor,
          },
        },
      ],
      yAxes: [
        {
          gridLines: { display: displayGrids },
          display: true,
          id: 'value',
          scaleLabel: {
            display: false,
            fontColor: labelsColor,
            labelString: 'Value',
          },
          ticks: {
            min: 0,
            max: 100,
            fontColor: labelsColor,
            callback: function (label, index, labels) {
              switch (label) {
                case 0:
                  return minLabelY;
                case 100:
                  return maxLabelY;
                default:
                  return '';
              }
            },
          },
        },
        {
          display: displayWater,
          position: 'right',
          id: 'water',
          scaleLabel: {
            display: true,
            fontColor: labelsColor,
            labelString: intl.formatMessage({
              id: 'overview.chartLabel.water',
            }),
          },
          ticks: {
            min: 0,
            max: 20,
            fontColor: labelsColor,
          },
        },
        {
          display: displayBowel,
          position: 'right',
          id: 'bowel',
          scaleLabel: {
            display: true,
            fontColor: labelsColor,
            labelString: intl.formatMessage({
              id: 'overview.chartLabel.bowelMovement',
            }),
          },
          ticks: {
            min: 0,
            max: 10,
            fontColor: labelsColor,
          },
        },
        {
          display: displayLong,
          position: 'right',
          ticks: {
            min: 0,
            max: 100,
            fontColor: labelsColor,
            callback: function (label) {
              switch (label) {
                case 0:
                  return intl.formatMessage({
                    id: 'overview.chartLabel.short',
                  });
                case 100:
                  return intl.formatMessage({
                    id: 'overview.chartLabel.long',
                  });
                default:
                  return '';
              }
            },
          },
        },
      ],
    },
    // TODO: check functionality with removing title from tooltip
    // @ts-ignore
    tooltips: {
      custom: function (tooltip) {
        if (!tooltip) return;
        // disable displaying the color box;
        tooltip.displayColors = false;
      },
      filter: function (tooltipItem, data) {
        return (
          // @ts-ignore
          data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
            .tag !== undefined
        );
      },
      callbacks: {
        // use label callback to return the desired label
        label: function (tooltipItem, data) {
          // @ts-ignore
          return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
            .tag;
        },
        // @ts-ignore && remove title
        title: () => null,
      },
    },
  };

  const dataSets = {
    datasets: data.map((dataSet) => {
      return {
        ...dataSet,
        type: dataSet.graphType,
        label: dataSet.chartTrackingType,
      };
    }),
  };

  return (
    <div className={classes.root}>
      <Bar data={dataSets} options={options} />
    </div>
  );
};

export default CombinedChart;
