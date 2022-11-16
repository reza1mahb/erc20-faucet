import React, { useState, useEffect } from 'react';
import Head from 'next/head';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { darkTheme, lightTheme } from '../lib/theme';
import Navbar from '../components/Navbar';
import { SessionProvider } from 'next-auth/react';

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  const [darkMode, setDarkMode] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    // Setup darkmode
    setDarkMode(
      localStorage.getItem('mode')
        ? parseInt(localStorage.getItem('mode'))
        : 0
    );
    // Naive check for mobile
    setIsMobile(
      navigator.userAgent.match(
        /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
      )
    );
  }, []);

  const toggleMode = () => {
    localStorage.setItem('mode', (1 - darkMode).toString());
    setDarkMode(1 - darkMode);
  };

  const muiTheme = darkMode ? lightTheme : darkTheme;

  return (
    <SessionProvider session={session}>
      <React.Fragment>
        <Head>
          <title>Faucet</title>
          <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
        </Head>
        <ThemeProvider theme={muiTheme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Navbar
            {...pageProps}
            darkMode={darkMode}
            toggleMode={toggleMode}
          />
          <Component
            {...pageProps}
            isMobile={isMobile}
          />
        </ThemeProvider>
      </React.Fragment>
    </SessionProvider>
  );
};

export default App;
