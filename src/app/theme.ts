import {createTheme} from '@mui/material';

declare module '@mui/material/styles' {
  interface Theme {
    description: string,
    background: {
      lightGrey: string,
      paper: string
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
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
  description: '#515761',
  background: {
    lightGrey: '#f5f5f5',
    paper: '#ffffff',
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
})

export default theme;
