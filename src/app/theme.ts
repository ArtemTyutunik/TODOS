import {createTheme} from '@mui/material';

declare module '@mui/material/styles' {

  interface Theme {
    description: string,
    background: {
      lightGrey: string,
      paper: string,
      inboxIcon: string,
    },
    text: {
      main: string,
      title: string,
      danger: string
    },
    priority: {
      first: string,
      second: string,
      third: string,
      fourth: string,
    },
    avatar: string
  }

  interface ThemeOptions {
    description: string,
    background: {
      lightGrey: string,
      paper: string,
      inboxIcon: string
    },
    text: {
      main: string,
      title: string,
      danger: string
    },
    priority: {
      first: string,
      second: string,
      third: string,
      fourth: string,
    },
    avatar: string
  }

  interface BreakpointOverrides {
    sm: false;
    md: false;
    lg: false;
    xl: false;
    xs: false;
    mobile: true;
    largeMobile: true;
    tablet: true;
    laptop: true;
    desktop: true;
  }

}

const theme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
  description: '#515761',
  background: {
    lightGrey: '#f5f5f5',
    paper: '#ffffff',
    inboxIcon: '#246fe0',
  },
  text: {
    main: '#808080',
    title: '#202020',
    danger: '#c40202',
  },
  priority: {
    first: '#cc2a25',
    second: '#ff824d',
    third: '#1531d1',
    fourth: '#babbc2',
  },
  avatar: '#48833f',
  breakpoints: {
    values: {
      mobile: 0,
      largeMobile: 570,
      tablet: 750,
      laptop: 1024,
      desktop: 1200,
    },
  },
})

export default theme;
