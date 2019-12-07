import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import QrReader from 'react-qr-reader';
import TextField from '@material-ui/core/TextField';
import localforage from 'localforage';
import { useMutation } from '@apollo/react-hooks';
import { QR_LOG_IN } from '../queries/Student';
import Fab from '@material-ui/core/Fab';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import GlobalLoader from '../app/GlobalLoader';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
  noProgress: {
    height: '4px',
  },
  manualInput: {
    marginTop: '10px',
    textAlign: 'center',
  },
  loginForm: {
    margin: '15px auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    marginLeft: '10px',
  },
});

const QRAuth = ({ history }) => {
  const classes = useStyles();
  const [scanning, setScanning] = useState(false);
  const [qrTextInput, setQrTextInput] = useState('');
  const [qrLogInStudent, { loading, error }] = useMutation(QR_LOG_IN, {
    onError: err => {
      console.error(err);
      window.alert(
        'An error occured. Please refresh and try again or ask your teacher for help.',
      );
    },
    onCompleted: ({ qrLogInStudent }) => {
      const { token } = qrLogInStudent;
      if (token) {
        localforage.setItem('__STUDENT_QUIZUS__', token).then(() => {
          history.push('/');
        });
      }
    },
  });

  if (loading) {
    return <GlobalLoader />;
  }

  const handleError = error => {
    console.error(error);
  };
  const handleScan = data => {
    if (data) {
      qrLogInStudent({ variables: { qrCode: data } });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    qrLogInStudent({ variables: { qrCode: qrTextInput } });
  };

  const onLoad = () => setScanning(true);

  return (
    <div>
      <QrReader
        delay={300}
        onLoad={onLoad}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      <div>
        {scanning ? <LinearProgress /> : <div className={classes.noProgress} />}
      </div>
      <div className={classes.manualInput}>
        <div>Camera not working? Type in your qr code instead to login:</div>
        <form className={classes.loginForm} onSubmit={handleSubmit}>
          <TextField
            error={!!error}
            type="text"
            name="qrTextInput"
            label="QR Code"
            value={qrTextInput}
            onChange={e => setQrTextInput(e.target.value)}
          />
          <Fab
            className={classes.submitButton}
            size="small"
            color="primary"
            type="submit"
            aria-label="login"
          >
            <ArrowForwardIcon />
          </Fab>
        </form>
      </div>
    </div>
  );
};

export default QRAuth;
