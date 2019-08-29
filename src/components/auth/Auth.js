import React, { useEffect } from 'react';
import localforage from 'localforage';
import { useMutation } from '@apollo/react-hooks';
import { LOG_IN } from '../queries/Student';

export default ({ location: { search }, history }) => {
  const [logInStudent, { loading, error }] = useMutation(LOG_IN, {
    onCompleted: ({ logInStudent }) => {
      const { token } = logInStudent;
      if (token) {
        localforage.setItem('__STUDENT_QUIZUS__', token).then(() => {
          const {
            push,
            location: { state = { from: { pathname: '/' } } }
          } = history;
          push(state.from.pathname);
        });
      }
    },
    onError: err => console.error('ERROR', err)
  });
  useEffect(() => {
    const token = search.split('?token=')[1];
    logInStudent({ variables: { token } });
  }, [logInStudent, search]);
  if (loading) {
    return <div>Signing In...</div>;
  }
  if (error) {
    return (
      <div>Something went wrong. Please request another email login link.</div>
    );
  }
  return null;
};
