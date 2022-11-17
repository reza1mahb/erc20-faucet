import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    paper: {
      border: 'none',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      borderRadius: 12,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#091312',
      color: '#fff'
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
    open, handleClose,
    amount, tx
  } = props;
  const classes = useStyles();

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
            <img src='/assets/successful.svg' alt='metamask' />
            <div>
              <p>You have successful minted {amount} BIT!</p>
              <p>Please expect gETH to your address within half an hour</p>
              <a href={`https://mantle-blockscout.qa.davionlabs.com/tx/${tx}`} target='_blank'>
                View on explorer
              </a>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
