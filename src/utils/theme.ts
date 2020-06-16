import { createMuiTheme } from '@material-ui/core/styles';

const PRIMARY_COLOR = '#00b3a5';

export const lightTheme = createMuiTheme({
  palette: {
    primary: {
      main: PRIMARY_COLOR,
      contrastText: '#fff',
    },
    background: {
      default: '#fafbfc',
    },
    text: {
      primary: '#535d7e',
    },
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: PRIMARY_COLOR,
    },
  },
});
