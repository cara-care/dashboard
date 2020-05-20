import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import moment from 'moment';
import { ChartTrackingTypes, DataSet } from './chartOverviewUtils';

interface OwnProps {
  displayGrids: boolean;
  data: DataSet[];
  startDate: Date;
  endDate: Date;
}

type Props = OwnProps & WrappedComponentProps;

class CombinedChart extends React.Component<Props> {
  render() {
    const { intl, displayGrids, startDate, endDate } = this.props;
    const maxLabelY = intl.formatMessage({ id: 'overview.chartLabel.bad' });
    const minLabelY = intl.formatMessage({ id: 'overview.chartLabel.good' });

    let displayWater = false;
    let displayBowel = false;
    let displayLong = false;
    if (
      this.props.data.findIndex(
        (data) => data.chartTrackingType === ChartTrackingTypes.water
      ) !== -1
    ) {
      displayWater = true;
    }
    if (
      this.props.data.findIndex(
        (data) => data.chartTrackingType === ChartTrackingTypes.bowelMovements
      ) !== -1
    ) {
      displayBowel = true;
    }
    if (
      this.props.data.findIndex(
        (data) => data.chartTrackingType === ChartTrackingTypes.workout
      ) !== -1 ||
      this.props.data.findIndex(
        (data) => data.chartTrackingType === ChartTrackingTypes.sleep
      ) !== -1
    ) {
      displayLong = true;
    }

    const options: ChartOptions = {
      maintainAspectRatio: true,
      legend: {
        display: true,
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
              min: moment(startDate).add(-1, 'days').toDate(),
              max: moment(endDate).add(1, 'days').toDate(),
            },
            scaleLabel: {
              display: false,
              labelString: 'Date',
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
              labelString: 'Value',
            },
            ticks: {
              min: 0,
              max: 100,
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
              labelString: intl.formatMessage({
                id: 'overview.chartLabel.water',
              }),
            },
            ticks: {
              min: 0,
              max: 20,
            },
          },
          {
            display: displayBowel,
            position: 'right',
            id: 'bowel',
            scaleLabel: {
              display: true,
              labelString: intl.formatMessage({
                id: 'overview.chartLabel.bowelMovement',
              }),
            },
            ticks: {
              min: 0,
              max: 10,
            },
          },
          {
            display: displayLong,
            position: 'right',
            ticks: {
              min: 0,
              max: 100,
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
            return data.datasets[tooltipItem.datasetIndex].data[
              tooltipItem.index
            ].tag;
          },
          // remove title
          title: () => null,
        },
      },
    };

    const data = {
      datasets: this.props.data.map((dataSet) => {
        return {
          ...dataSet,
          type: dataSet.graphType,
          label: dataSet.chartTrackingType,
        };
      }),
    };

    return (
      <div
        style={{
          width: '100%',
          minHeight: '200px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'left',
          padding: '15px',
          overflow: 'hidden',
        }}
      >
        <Bar data={data} options={options} />
      </div>
    );
  }
}

export default injectIntl(CombinedChart);
