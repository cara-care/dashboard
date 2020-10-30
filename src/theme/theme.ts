import { createMuiTheme, useTheme } from '@material-ui/core/styles';
import { TypographyStyleOptions } from '@material-ui/core/styles/createTypography';

const PRIMARY_COLOR = '#489f9d';

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
    background: {
      default: '#fffdfc',
    },
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
  },
  typography: {
    button,
  },
});

export const useIsDarkMode = () => {
  const theme = useTheme();
  return theme.palette.type === 'dark';
};
