import React from 'react';
import QrReader from 'react-qr-reader';
import localforage from 'localforage';
import { useMutation } from '@apollo/react-hooks';
import { QR_LOG_IN, GET_CURRENT_STUDENT } from '../queries/Student';
import GlobalLoader from '../app/GlobalLoader';

const QRAuth = () => {
  const [qrLogInStudent, { loading, error }] = useMutation(QR_LOG_IN, {
    onError: err => console.error('ERROR', err),
    update: (cache, { data: { qrLogInStudent } }) => {
      const { token, ...currentStudent } = qrLogInStudent;
      if (token) {
        localforage.setItem('__STUDENT_QUIZUS__', token).then(() => {
          cache.writeQuery({
            query: GET_CURRENT_STUDENT,
            data: { currentStudent: currentStudent }
          });
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
    console.log(data);
    if (data) {
      console.log('HERE', data);
      qrLogInStudent({ variables: { qrCode: data } });
    }
  };
  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default QRAuth;
