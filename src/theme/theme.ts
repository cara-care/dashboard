import { createMuiTheme, useTheme } from '@material-ui/core/styles';
import { TypographyStyleOptions } from '@material-ui/core/styles/createTypography';

export const PRIMARY_COLOR = '#489f9d';

const button: TypographyStyleOptions = {
  fontFamily: `"Source Sans Pro", "Roboto", "Helvetica", "Arial", sans-serif`,
  fontWeight: 500,
  fontSize: '0.875rem',
  lineHeight: 1.75,
  letterSpacing: '0.02857em',
  textTransform: 'uppercase',
};

export const lightTheme = createMuiTheme({
  palette: {
    primary: {
      main: PRIMARY_COLOR,
      contrastText: '#fff',
    },
    secondary: {
      main: '#f1f1f1',
    },
    background: {
      default: '#fffdfc',
    },
    divider: '#150b2c',
    text: {
      primary: '#150b2c',
    },
  },
  typography: {
    button,
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: PRIMARY_COLOR,
      contrastText: '#fff',
    },
    secondary: {
      main: 'rgba(216, 236, 235, 0.3)',
    },
    divider: '#d8eceb',
  },
  typography: {
    button,
  },
});

export const useIsDarkMode = () => {
  const theme = useTheme();
  return theme.palette.type === 'dark';
};

export const zIndexes = {
  chatHeader: 100,
};
// MUI defaults
// mobileStepper: 1000
// speedDial: 1050
// appBar: 1100
// drawer: 1200
// modal: 1300
// snackbar: 1400
// tooltip: 1500
