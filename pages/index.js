import React, {useState, useEffect} from 'react';
import BN from 'bignumber.js';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import {getContractInstance} from '../artifacts';
import MineIcon from 'mdi-material-ui/Pickaxe';
import cn from 'classnames';
import * as ethers from 'ethers';

import Root from '../components/Root';

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
  inputCont: {
    padding: '20px'
  },
  input: {
    // flex: 1,
    margin: '20px 0'
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
  }
}));

function short(str, len) {
  return `${str.substring(0, len)}...${str.substring(str.length - len)}`;
}

function validate(address, amount, currentAmount) {
  const stats = {
    eAddress: false,
    eAmount: false
  };
  if (!/^0x[0-9a-fA-F]{40}$/.test(address)) {
    stats.eAddress = true;
  }
  if (amount < 1 || (parseInt(amount, 10) + parseInt(currentAmount, 10)) > 1000) {
    stats.eAmount = true;
  }
  return stats;
}

function toUSD(bn) {
  return new BN(bn.toString()).dividedBy(1e6).toString();
}

function toBIT(bn) {
  return new BN(bn.toString()).dividedBy(1e18).toString();
}

let Index = ({
  dispatchGeneFetch,
  pinnedDragons = [],
  genes = {}
}) => {
  const classes = useStyles();
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState(1);
  const [txs, setTxs] = useState([]);
  const [addrErr, setAddrErr] = useState(false);
  const [amountErr, setAmountErr] = useState(false);

  const [bitContract, setBitContract] = useState(null);
  const [myBalance, setMyBalance] = useState('0.0');
  const [error, setError] = useState();

  const [haveMetamask, setHaveMetamask] = useState(true);

  const [client, setClient] = useState({
    isConnected: false
  });

  const changeNetwork = async () => {
    if (!window.ethereum) throw new Error('No crypto wallet found');
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x5' }]
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x5',
                chainName: 'Goerli',
                nativeCurrency: {
                  name: 'GoerliETH',
                  symbol: 'GoerliETH',
                  decimals: 18
                },
                rpcUrls: ['https://goerli.infura.io/v3/9f0c70345c8d4f9ea915af6a6141cf70'],
                blockExplorerUrls: ['https://goerli.etherscan.io/']
              }
            ]
          });
        } catch (addError) {
          throw addError;
        }
      }
    }
  };

  const checkConnection = async () => {
    const { ethereum } = window;
    if (ethereum) {
      setHaveMetamask(true);
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setClient({
          isConnected: true,
          address: accounts[0]
        });
      } else {
        setClient({
          isConnected: false
        });
      }
    } else {
      setHaveMetamask(false);
    }
  };

  const connectWeb3 = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log('Metamask not detected');
        return;
      }
      const chainId = parseInt(window.ethereum.chainId);

      if (chainId !== 5) {
        setError();
        await changeNetwork();
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
      });

      setClient({
        isConnected: true,
        address: accounts[0]
      });
    } catch (error) {
      console.log('Error connecting to metamask', error);
    }
  };

  useEffect(() => {
    checkConnection();
    connectWeb3();
  }, []);

  useEffect(() => {
    let interval;
    const { ethereum } = window;
    if (ethereum) {
      const address = client.address;
      if (address) {
        console.log('address:', address);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = getContractInstance(signer, 5);
        setBitContract(contract);
        if (interval) {
          clearInterval(interval);
        }
        if (address) {
          contract.balanceOf(address).then(balance => setMyBalance(
            toBIT(balance)
          ));
          interval = setInterval(() => {
            contract.balanceOf(address).then(balance => setMyBalance(
              toBIT(balance)
            ));
          }, 10000); // 10s
        }
      }
    }
    return () => {
      clearInterval(interval);
    };
  }, [client]);
  const accMul = (arg1, arg2) => {
    var m = 0;
    let s1 = arg1.toString();
    let s2 = arg2.toString();
    try {
      m += s1.split('.')[1].length;
    } catch (e) {}
    try {
      m += s2.split('.')[1].length;
    } catch (e) {}
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
  };

  return (
    <Root>
      <div className={classes.header}>
        <Typography className={classes.font}>Mantle Testnet Bit Token Faucet</Typography>
      </div>
      <div className={classes.mainCont}>
        <Paper className={classes.inputCont}>
          <div className={classes.cell}>
            <Typography>{`My Address: ${client.address || '-'}`}</Typography>
            <Typography>{`My Balance: ${myBalance} BIT`}</Typography>
          </div>
          <div className={classes.line}>
            <TextField required id={'address'} label={'ETH address'} spellCheck={false}
              error={addrErr}
              helperText={addrErr ? 'eth address incorrect!' : ''}
              className={classes.input}
              fullWidth
              value={address}
              placeholder={'0x1234...'}
              onChange={e => setAddress(e.target.value)} />
            <Button className={classes.smbtn} variant={'contained'} size={'small'} onClick={e => setAddress(client.address)}>Self</Button>
          </div>
          <TextField required id={'amount'} label={'Deposit Eth Amount'} type={'number'}
            error={amountErr}
            helperText={amountErr ? 'can only mint up to 1 - 1000 ETH' : ''}
            className={classes.input}
            fullWidth
            value={amount}
            inputProps={{min: 1}}
            onChange={e => setAmount(e.target.value)} />
          <p>you will receive {accMul(Number(amount), 1000)} bit</p>
          <Button className={classes.iconButton}
            color={'primary'}
            aria-label={'Mint'}
            variant={'contained'}
            onClick={e => {
              const {eAddress, eAmount} = validate(address, amount, myBalance);
              setAddrErr(eAddress);
              setAmountErr(eAmount);
              // console.log(`${eAddress}, ${eAmount}`);
              if (!eAddress && !eAmount) {
                bitContract.mint(new BN(amount).times(1e18).toString()).then(tx => {
                  if (tx.hash) {
                    setTxs([...txs, tx.hash]);
                  }
                });
              }
            }}>
            Mint Token
            <MineIcon className={classes.btnIcon} />
          </Button>
        </Paper>
        {txs && txs.length > 0 && (
          <Paper className={cn(classes.inputCont, classes.upper)}>
            {
              txs.map(tx => (
                <div key={tx} className={classes.tx}>
                  <a target={'_blank'} href={`https://goerli.etherscan.io/tx/${tx}`}>{short(tx, 8)}</a>
                </div>
              ))
            }
          </Paper>
        )}
      </div>
    </Root>
  );
};

export default Index;
