import React, { useEffect, useState } from 'react';
// import Blockies from 'react-blockies';

import { makeStyles } from '@material-ui/core/styles';

import { useWeb3Modal } from '../hooks/web3';
import Modal from './Modal';
import { truncateAddress } from '../lib/utils';

const ConnectWallet = () => {
  const classes = useStyles();

  const [signerAddress, setSignerAddress] = useState('');
  // const [isWaiting, setWaiting] = useState(false)
  // const [isSent, setSent] = useState(false)
  // const [walletNotDetected, setWalletNotDetected] = useState(false)

  const { connectWallet, disconnectWallet, provider, error } = useWeb3Modal();

  console.log(error);

  useEffect(() => {
    const getAddress = async () => {
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setSignerAddress(address);
    };
    if (provider) getAddress();
    else setSignerAddress('');
  }, [provider]);

  const handleClickConnect = async () => {
    await connectWallet();
  };

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (signerAddress) {
    return (
      <div>
        <div
          onClick={handleOpen}
          className={classes.address}
        >
          <span className={classes.dot} />
          {truncateAddress(signerAddress)}
        </div>
        <Modal
          disconnectWallet={disconnectWallet}
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          address={signerAddress}
        />
      </div>
    );
  }

  return (
    <button
      className={classes.btn}
      onClick={handleClickConnect}>
      {/* <Blockies
        className={classes.img}
        seed={signerAddress.toLowerCase()}
        size={8}
        scale={3}
      /> */}
      <div>
        {signerAddress ? truncateAddress(signerAddress) : 'Connect Wallet'}
      </div>
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
  }
}));

export default ConnectWallet;
