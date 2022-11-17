import React from 'react';
import { makeStyles } from '@material-ui/styles';

import Root from '../components/Root';
import Navbar from '../components/Navbar';
import AuthGithub from '../components/AuthGithub';
import MintToken from '../components/MintToken';
import useEagerConnect from '../hooks/useEagerConnect';

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
  },
  box: {
    backgroundColor: '#fff',
    padding: '32px',
    borderRadius: '12px'
  }
}));

let Index = () => {
  const classes = useStyles();

  const triedToEagerConnect = useEagerConnect();

  return (
    <Root>
      <Navbar triedToEagerConnect={triedToEagerConnect} />
      <div className={classes.mainCont}>
        <h1 className={classes.h1}>Mantle Testnet Faucet</h1>
        <div className={classes.box}>
          <AuthGithub />
          <MintToken />
        </div>
        <div>
          <p>Don’t have enough gas to mint tokens? Get some goerli ETH here:</p>
          <div>
            <a target='_blank' rel='noreferrer' href='https://faucet.paradigm.xyz/'>Paradigm gETH Faucet</a>
          </div>
          <div>
            <a target='_blank' rel='noreferrer' href='https://faucets.chain.link/'>Chainlink gETH Faucet</a>
          </div>
        </div>
      </div>
    </Root>
  );
};

export default Index;
