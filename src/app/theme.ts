import {ThemeOptions} from '@mui/material';

declare module '@mui/material/styles' {

  interface Theme {
    description: string,
    background: {
      lightGrey: string,
      appBackground: string,
      inboxIcon: string,
      icons: string,
      divider: string,
      visibleBackground: string
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
      appBackground: string,
      inboxIcon: string,
      icons: string,
      divider: string,
      visibleBackground: string
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

export const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => {
  const isDarkMode = mode === 'dark'
  return {
    palette: {
      primary: {
        main: isDarkMode ? '#282828' : '#1976d2',
      },
    },
    description: '#515761',
    background: {
      lightGrey: isDarkMode ? '#242424' : '#f5f5f5',
      appBackground: isDarkMode ? '#202124' : '#ffffff',
      visibleBackground: isDarkMode ? 'transparent' : '#ffffff',
      inboxIcon: '#246fe0',
      icons: isDarkMode ? '#d9a8f1' : '#808080',
      divider: isDarkMode ? 'hsla(0,0%,100%,0.1)' : '#f0f0f0',
    },
    text: {
      main: isDarkMode ? '#e8dede' : '#808080',
      title: isDarkMode ? '#ffffff' : '#202020',
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
  }
}

