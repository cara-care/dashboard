import moment from 'moment';

export const newDate = (days: number, referenceDate: Date = new Date()) => {
  const day = moment(referenceDate).add(days, 'd').toDate();
  day.setHours(0, 0, 0, 0);
  return day;
};

export const addDays = (date: Date, days: number = 1) => {
  return moment(date).add(days, 'd').toDate();
};

export const getTime = (date: Date | string) => {
  return moment(date).format('h:mm A');
};
