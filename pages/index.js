import React from 'react';
import { makeStyles } from '@material-ui/styles';

import Root from '../components/Root';
import AuthGithub from '../components/AuthGithub';
import MintToken from '../components/MintToken';

const useStyles = makeStyles(theme => ({
  mainCont: {
    padding: '10px',
    margin: 'auto',
    maxWidth: '600px'
  },
  h1: {
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '33px',
    color: '#15181C'
  }
}));

let Index = () => {
  const classes = useStyles();
  return (
    <Root>
      <div className={classes.mainCont}>
        <h1 className={classes.h1}>Mantle Testnet Faucet</h1>
        <AuthGithub />
        <MintToken />
      </div>
    </Root>
  );
};

export default Index;
