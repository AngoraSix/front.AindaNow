import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#A4B7BD',
      main: '#7F969C',
      dark: '#47626B',
      contrastText: '#fff',
    },
    secondary: {
      light: '#62a8de',
      main: '#3F6E91',
      dark: '#29475e',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: ['Ruluko', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(
      ','
    ),
    fontSize: 18,
    title1: {
      fontFamily: ['ZCool', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(
        ','
      ),
    },
  },
});

export default theme;
