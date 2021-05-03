import blue from '@material-ui/core/colors/blue';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#734F9F',
      main: '#603499',
      dark: '#521C99',
      contrastText: '#fff',
    },
    secondary: blue,
  },
  typography: {
    fontFamily: [
      '"Advent Pro"',
      '"Roboto"',
      '"Helvetica"',
      '"Arial"',
      'sans-serif',
    ].join(','),
    fontSize: 18,
  }
});

export default theme;
