export const loadTheme = () => {
  try {
    const theme = localStorage.getItem('theme');
    return theme as 'dark' | 'light' | null;
  } catch (err) {
    return undefined;
  }
};

export const saveTheme = (theme: 'dark' | 'light') => {
  try {
    localStorage.setItem('theme', theme);
  } catch (err) {
    // ignore
  }
};
