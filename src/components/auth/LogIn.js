import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/styles';
import { useMutation } from '@apollo/react-hooks';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';
import gql from 'graphql-tag';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import QRAuth from './QRAuth';

const styles = theme => {
  return {
    root: {
      height: '100%',
      display: 'flex',
      justifyContent: 'center'
    },
    formContainer: {
      marginTop: '60px',
      height: 'max-content',
      width: '30%',
      [theme.breakpoints.down('md')]: {
        width: '50%'
      },
      [theme.breakpoints.down('sm')]: {
        width: '85%'
      },
      padding: '30px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    submitButton: {
      marginTop: '30px'
    },
    loginType: {
      marginTop: '20px'
    }
  };
};

const CREATE_LOGIN_LINK = gql`
  mutation createLoginLink($email: String!) {
    createLoginLink(email: $email)
  }
`;

const Login = ({ classes }) => {
  const [email, setEmail] = useState('');
  const [dialogState, setDialogState] = useState({
    open: false,
    message: '',
    title: ''
  });
  const [loginType, setLoginType] = useState('email');

  const { open, message, title } = dialogState;
  const [createLoginLink, { loading }] = useMutation(CREATE_LOGIN_LINK, {
    onCompleted: ({ createLoginLink }) => {
      let message =
        'There was an issue sending your login email. Please try again.';
      let title = 'Something went wrong';
      if (createLoginLink) {
        message = 'Please check your email for the login link!';
        title = 'Success!';
      }
      setDialogState({
        open: true,
        message,
        title
      });
    },
    onError: err => {
      const title = 'Something went wrong';
      let message =
        'There was an issue sending your login email. Please try again.';
      if (err.message === 'GraphQL error: Not Found') {
        message =
          "Hmm it doesn't look like that email exists. Please check to make sure you've typed it in correctly. If that doesn't solve the issue, please check in with your teacher!";
      }
      setDialogState({
        open: true,
        message,
        title
      });
    }
  });

  const handleSubmit = e => {
    e.preventDefault();
    createLoginLink({ variables: { email } });
  };

  const handleClose = () => {
    setDialogState({
      ...dialogState,
      open: false
    });
  };

  const renderLogin = () => {
    if (loginType === 'email') {
      return (
        <form className={classes.form} onSubmit={handleSubmit}>
          <h3>Enter email:</h3>
          <TextField
            required
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {loading ? (
            <LinearProgress className={classes.submitButton} />
          ) : (
            <Button
              color="primary"
              variant="contained"
              type="submit"
              className={classes.submitButton}
            >
              Send Log In Link to My Email
            </Button>
          )}
        </form>
      );
    } else if (loginType === 'qr') {
      return <QRAuth />;
    }
    return null;
  };

  return (
    <div className={classes.root}>
      <Card className={classes.formContainer}>
        {renderLogin()}
        <Button
          onClick={() => setLoginType('qr')}
          className={classes.loginType}
          color="secondary"
          variant="contained"
        >
          Use QR Login
        </Button>
      </Card>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="md">
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default withStyles(styles)(Login);
