'use client';
import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
// import { useRouter } from 'next/router';

import { useSession, signIn, signOut } from 'next-auth/react';

const AuthGithub = () => {
  const classes = useStyles();
  // const theme = useTheme();
  // const router = useRouter();
  // const { code } = router.query;
  // if (code) {
  //   fetch('https://github.com/login/oauth/access_token', {
  //     headers: {
  //       'Accept': 'application/json'
  //     },
  //     method: 'POST', // POST, PUT, DELETE, etc.
  //     body: JSON.stringify({
  //       client_id: process.env.GITHUB_CLIENT_ID,
  //       client_secret: process.env.GITHUB_CLIENT_SECRETS,
  //       code: code
  //     })
  //   }).then(data => {
  //     console.log(data);
  //   });
  // }
  const { data: session } = useSession();
  console.log(session);
  return (
    <Paper className={classes.paper}>
      <div className={classes.h1}>
        <span className={classes.step}>Step1 </span>
        Authenticate with Github
      </div>
      <p>To be considered a valid account, you need to be following at least five people or organizations on Github.</p>
      {!session && (
        <button className={classes.btn} onClick={signIn}>
          <img src='/assets/github.svg' alt='github' />
          Authenticate your Github
        </button>
      )}
      {session?.user && (
        <p className={classes.username}>
          <span>Authenticated:{'\u00A0'}</span>
          <span>{session.user.name ?? session.user.email}</span>
          {'\u00A0'}
          <img src="/assets/checked.svg" alt="✅" />
        </p>
      )}
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 24,
    background: '#F8F8F9',
    borderRadius: 12,
    boxShadow: 'none',
    marginBottom: 24
  },
  h1: {
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '25px',
    color: '#15181C'
  },
  step: {
    color: '#65B3AE'
  },
  btn: {
    background: '#65B3AE',
    cursor: 'pointer',
    border: 0,
    outline: 'none',
    borderRadius: 8,
    height: 40,
    padding: '0 16px',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 700,
    color: '#15181C',
    fontSize: 14
  },
  text: {
    color: '#15181C',
    fontWeight: 700
  },
  username: {
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '19px',
    color: '#15181C',
    display: 'flex',
    alignItems: 'center'
  }
}));

export default AuthGithub;
