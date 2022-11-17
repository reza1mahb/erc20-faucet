import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import {
//   Brightness4Outlined as ToggleDarkModeIcon,
//   Brightness5Outlined as ToggleLightModeIcon
// } from '@material-ui/icons/';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import ConnectWallet from './ConnectWallet';

// import dynamic from 'next/dynamic';
// const ConnectWallet = dynamic(() => import("./ConnectWallet"), {
//   ssr: false,
// });

const Navbar = ({ toggleMode, darkMode, ...props }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <AppBar position='static' className={classes.root}>
      <Toolbar>
        <img src='/assets/mantle-logo.svg' alt='logo' />

        <Typography variant='h6' className={classes.title} />

        {/* <IconButton
          edge="start"
          color="inherit"
          aria-label="mode"
          onClick={toggleMode}
          className={classes.toggleBtn}
        >
          {darkMode ? <ToggleLightModeIcon htmlColor={theme.custom.palette.iconColor} /> : <ToggleDarkModeIcon htmlColor={theme.custom.palette.iconColor} />}
        </IconButton> */}

        <div className={classes.supportChain}>
          <img src='/assets/eth-logo.svg' alt='ethereum' className={classes.supportChainLogo} />
          <span className={classes.text}>Goerli Testnet</span>
        </div>

        <ConnectWallet {...props} />
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 'auto',
    maxWidth: 1100,
    boxShadow: 'none',
    backgroundColor: '#F8F8F9'
  },
  img: {
    width: 50,
    marginRight: 20
  },
  title: {
    flexGrow: 1,
    // color: '#784ffe',
    [theme.breakpoints.down('xs')]: {
      fontSize: 0
      // display: 'none'
    }
  },
  toggleBtn: {
    marginRight: 10,
    [theme.breakpoints.down('xs')]: {
      marginRight: 5
    }
  },
  supportChain: {
    backgroundColor: '#F0F1F2',
    height: 40,
    padding: '0 16px',
    borderRadius: '50px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    marginRight: 10
  },
  supportChainLogo: {
    marginRight: '10px'
  },
  text: {
    color: '#15181C',
    fontWeight: 700
  }
}));

export default Navbar;
