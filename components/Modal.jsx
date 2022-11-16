import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { truncateAddress } from '../lib/utils';

const useStyles = makeStyles((theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: 'none',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      borderRadius: 12,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    btn: {
      background: '#F8F8F9',
      cursor: 'pointer',
      border: 0,
      borderRadius: 12,
      outline: 'none',
      padding: '16px 0',
      width: 200,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 400,
      color: '#15181C',
      fontSize: 16,
      '&:first-child': {
        marginRight: 10
      }
    },
    btnContainer: {
      display: 'flex'
    },
    icon: {
      marginBottom: 10
    }
  })
);

export default function TransitionsModal(props) {
  const {
    disconnectWallet, open, handleClose,
    address
  } = props;
  const classes = useStyles();
  // const [open, setOpen] = React.useState(false);

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const copyToClipboard = () => {

  };

  return (
    <div>
      <Modal
        disableEnforceFocus
        disableAutoFocus
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <img src='/assets/metamask-logo.svg' alt='metamask' />
            <a href='https://mantle-blockscout.qa.davionlabs.com'>
              { truncateAddress(address) }
              <img src='/assets/arrow-out.svg' alt='explorer' />
            </a>
            <div className={classes.btnContainer}>
              <button
                className={classes.btn}
                onClick={copyToClipboard}>
                <img src='/assets/copy.svg' alt='copy' className={classes.icon} />
                <span>Copy Address</span>
              </button>
              <button
                className={classes.btn}
                onClick={disconnectWallet}>
                <img src='/assets/disconnect.svg' alt='copy' className={classes.icon} />
                <span>Disconnect</span>
              </button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
