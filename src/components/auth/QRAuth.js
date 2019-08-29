import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import QrReader from 'react-qr-reader';
import localforage from 'localforage';
import { useMutation } from '@apollo/react-hooks';
import { QR_LOG_IN } from '../queries/Student';
import GlobalLoader from '../app/GlobalLoader';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
  noProgress: {
    height: '4px'
  }
});

const QRAuth = () => {
  const classes = useStyles();
  const [scanning, setScanning] = useState(false);
  const [qrLogInStudent, { loading, error }] = useMutation(QR_LOG_IN, {
    onError: err => console.error('ERROR', err),
    onCompleted: ({ qrLogInStudent }) => {
      const { token } = qrLogInStudent;
      if (token) {
        localforage.setItem('__STUDENT_QUIZUS__', token).then(() => {
          window.location.reload(true);
        });
      }
    }
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
    </div>
  );
};

export default QRAuth;