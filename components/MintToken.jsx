import React, {useState, useEffect} from 'react';
// import BN from 'bignumber.js';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import * as ethers from 'ethers';
import { useWeb3React } from '@web3-react/core';
import useTokenContract from '../hooks/useTokenContract';
import { TOKEN_CONTRACT } from '../lib/constants';
import SuccessModal from './SuccessModal';

const useStyles = makeStyles(theme => ({
  header: {
    backgroundColor: '#000000',
    padding: '20px',
    margin: '0 0 20px 0'
  },
  font: {
    color: '#ffffff'
  },
  cell: {
    backgroundColor: '#eeeeee',
    borderRadius: '5px',
    padding: '5px'
  },
  line: {
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  mainCont: {
    padding: '10px',
    margin: 'auto',
    maxWidth: '600px'
  },
  paper: {
    padding: 24,
    background: '#F8F8F9',
    borderRadius: 12,
    boxShadow: 'none'
  },
  input: {
    // flex: 1,
    marginTop: 4,
    marginBottom: 24
  },
  btnIcon: {
    margin: '0 0 0 10px'
  },
  upper: {
    margin: '50px 0 0 0'
  },
  tx: {
    margin: '0 0 10px 0'
  },
  smbtn: {
    height: '30px'
  },
  label: {
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '19px',
    color: '#2B3034'
  },
  btn: {
    background: '#65B3AE',
    cursor: 'pointer',
    border: 0,
    outline: 'none',
    borderRadius: 8,
    height: 40,
    padding: '0 16px',
    alignItems: 'center',
    fontWeight: 700,
    color: '#15181C',
    fontSize: 14,
    width: '200px',
    textAlign: 'center'
  },
  h1: {
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '25px',
    color: '#15181C',
    marginBottom: 4
  },
  desc: {
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '16px',
    color: '#6E767D',
    marginBottom: 24
  },
  step: {
    color: '#65B3AE'
  }
}));

const MIN_MINT_AMOUNT = 1;
const MAX_MINT_AMOUNT = 1000;

function validate(address, amount) {
  const stats = {
    eAddress: false,
    eAmount: false
  };
  if (!/^0x[0-9a-fA-F]{40}$/.test(address)) {
    stats.eAddress = true;
  }
  if (amount < MIN_MINT_AMOUNT || parseInt(amount, 10) > MAX_MINT_AMOUNT) {
    stats.eAmount = true;
  }
  return stats;
}

const Mint = () => {
  const classes = useStyles();
  const { account } = useWeb3React();
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [txs, setTxs] = useState([]);
  const [tx, setTx] = useState('');
  const [addrErr, setAddrErr] = useState(false);
  const [amountErr, setAmountErr] = useState(false);
  useEffect(() => {
    setAddress(account || '');
  }, [account]);

  const bitContract = useTokenContract(TOKEN_CONTRACT);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper className={classes.paper}>
      <div className={classes.h1}>
        <span className={classes.step}>Step2 </span>
        Set your mint address
      </div>
      <div className={classes.desc}>
        Each address can mint 1,000 tokens every 1,000 blocks (about 4 hours).
      </div>
      <div className={classes.label}>Mint Address</div>
      <TextField required id={'address'} spellCheck={false}
        error={addrErr}
        helperText={addrErr ? 'incorrect account' : ''}
        className={classes.input}
        fullWidth
        value={address}
        placeholder={'0x1234...'}
        onChange={e => setAddress(e.target.value)}
        variant='outlined'
      />
      {/* <Button className={classes.smbtn} variant={'contained'} size={'small'} onClick={e => setAddress(client.address)}>Self</Button> */}
      <div className={classes.label}>Mint Token Amount</div>
      <TextField required id={'amount'} type={'number'}
        error={amountErr}
        helperText={amountErr ? 'can only mint up to 1 - 1,000' : ''}
        className={classes.input}
        fullWidth
        value={amount}
        placeholder={'1-1,000'}
        inputProps={{inputMode: 'numeric', min: MIN_MINT_AMOUNT, max: MAX_MINT_AMOUNT}}
        onChange={e => setAmount(e.target.value)}
        variant='outlined'
      />
      <button
        className={classes.btn}
        onClick={e => {
          const {eAddress, eAmount} = validate(address, amount);
          setAddrErr(eAddress);
          setAmountErr(eAmount);
          if (!eAddress && !eAmount) {
            bitContract.mint(ethers.utils.parseEther(amount)).then(tx => {
              handleOpen();
              if (tx.hash) {
                setTx(tx.hash);
                setTxs([...txs, tx.hash]);
              }
            });
          }
        }}
      >
        Mint Token
      </button>
      <SuccessModal open={open} handleClose={handleClose} tx={tx} amount={amount} />
    </Paper>
  );
};

export default Mint;
