import { addDays, format as formatDateImpl, parseISO, format } from 'date-fns';
import { enUS, de } from 'date-fns/locale';

export const newDate = (days: number, referenceDate: Date = new Date()) => {
  const day = addDays(referenceDate, days);
  day.setHours(0, 0, 0, 0);
  return day;
};

export function getTime(date: Date): string;
export function getTime(isoString: string): string;
export function getTime(dateOrIsoString: Date | string): string;
export function getTime(dateOrIsoString: Date | string) {
  return format(getDate(dateOrIsoString), 'h:mm a');
}

export function formatDate(
  isoString: string,
  format: string,
  locale: string
): string;
export function formatDate(date: Date, format: string, locale: string): string;
export function formatDate(
  dateOrIsoString: Date | string,
  format: string,
  locale: string
) {
  return formatDateImpl(getDate(dateOrIsoString), getFormat(format), {
    locale: getLocale(locale),
  });
}

export function getLocale(localeCode: string) {
  return localeCode === 'de' ? de : enUS;
}

export function isSameOrAfter(left: Date, right: Date) {
  return left.valueOf() >= right.valueOf();
}

export function isSameOrBefore(left: Date, right: Date) {
  return left.valueOf() <= right.valueOf();
}

function getDate(dateOrIsoString: Date | string) {
  return typeof dateOrIsoString === 'string'
    ? parseISO(dateOrIsoString)
    : dateOrIsoString;
}

function getFormat(formatOrPreset: string) {
  return presets[formatOrPreset] ?? formatOrPreset;
}

export function padWith0(date: string, maxLength: number = 8) {
  const length = Math.min(date.length + 1, maxLength);
  return date.padStart(length, '0');
}

/**
 * Only include formats that are _**invalid**_ `date-fns` formats, as to not disallow usages of `getFormat` with a built-in, valid format.
 */
const presets = {
  // LLL is not a valid date-fns format, so it should be fine to use here
  LLL: 'MMMM d yyyy p',
};
