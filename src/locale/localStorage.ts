export const loadLocale = () => {
  try {
    const locale = localStorage.getItem('locale');
    return locale;
  } catch (err) {
    return undefined;
  }
};

export const saveLocale = (locale: string) => {
  try {
    localStorage.setItem('locale', locale);
  } catch (err) {
    // ignore
  }
};
