import React, { useEffect, useState } from 'react';
// import Blockies from 'react-blockies';
import BN from 'bignumber.js';

import { makeStyles } from '@material-ui/core/styles';
import { useWeb3React } from '@web3-react/core';
import { UserRejectedRequestError } from '@web3-react/injected-connector';

// import { useWeb3Modal } from '../hooks/web3';
import Modal from './Modal';
import { truncateAddress } from '../lib/utils';
import { injected } from '../lib/connectors';
import useETHBalance from '../hooks/useETHBalance';
import useTokenBalance from '../hooks/useTokenBalance';
import { TOKEN_CONTRACT } from '../lib/constants';

function parseBalance(bn) {
  return new BN(bn.toString()).dividedBy(1e18).toString();
}

const ConnectWallet = ({myAddress}) => {
  const [connecting, setConnecting] = useState(false);

  const classes = useStyles();

  const [signerAddress, setSignerAddress] = useState('');

  const { active, error, activate, chainId, account, setError, library } =
    useWeb3React();
  const ethBalance = useETHBalance(account);
  const tokenBalance = useTokenBalance(account, TOKEN_CONTRACT);
  console.log(ethBalance, tokenBalance);

  const isConnected = typeof account === 'string' && !!library;

  // const [isWaiting, setWaiting] = useState(false)
  // const [isSent, setSent] = useState(false)
  // const [walletNotDetected, setWalletNotDetected] = useState(false)

  // const { connectWallet, disconnectWallet, provider, error } = useWeb3Modal();

  useEffect(() => {
    setSignerAddress(myAddress || '');
  }, [myAddress]);

  const handleClickConnect = async () => {
    setConnecting(true);
    activate(injected, undefined, true).catch((error) => {
      // ignore the error if it's a user rejected request
      if (error instanceof UserRejectedRequestError) {
        setConnecting(false);
      } else {
        setError(error);
      }
    });
  };
  const disconnectWallet = async () => {};

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (isConnected) {
    return (
      <div className={classes.container}>
        <div className={classes.bit}>
          {parseBalance(tokenBalance.data || '')} Bit
        </div>
        <div
          onClick={handleOpen}
          className={classes.address}
        >
          <span className={classes.dot} />
          {truncateAddress(account)}
        </div>
        <Modal
          disconnectWallet={disconnectWallet}
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          address={account}
          ethBalance={parseBalance(ethBalance.data || '')}
        />
      </div>
    );
  }

  return (
    <button
      className={classes.btn}
      onClick={handleClickConnect}>
        Connect Wallet
    </button>
  );
};

const useStyles = makeStyles((theme) => ({
  btn: {
    background: '#65B3AE',
    cursor: 'pointer',
    border: 0,
    outline: 'none',
    borderRadius: 9999,
    height: 40,
    padding: '0 16px',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 700,
    color: '#15181C',
    fontSize: 14
  },
  img: {
    borderRadius: 999,
    marginRight: 5
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: '#65B3AE',
    marginRight: 4,
    display: 'inline-block'
  },
  address: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: 700,
    color: '#15181C',
    fontSize: 14,
    cursor: 'pointer'
  },
  container: {
    display: 'flex',
    flexDirection: 'row'
  },
  bit: {
    fontWeight: 700,
    color: '#15181C',
    fontSize: 14,
    marginRight: 10
  }
}));

export default ConnectWallet;
