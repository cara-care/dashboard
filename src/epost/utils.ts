const timeZoneOptions = { timeZone: 'Europe/Berlin' };

export const germanFormattedDate = (draftDate?: string) => {
  if (!draftDate) {
    return new Date().toLocaleString('de-DE', timeZoneOptions);
  }
  return new Date(draftDate).toLocaleString('de-DE', timeZoneOptions);
};
