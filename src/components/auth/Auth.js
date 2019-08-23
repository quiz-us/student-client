import React, { useEffect } from 'react';
import localforage from 'localforage';
import gql from 'graphql-tag';
import { useMutation, useApolloClient } from '@apollo/react-hooks';

const LOG_IN = gql`
  mutation logInStudent($token: String!) {
    logInStudent(token: $token) {
      id
      email
      token
    }
  }
`;

export default ({ location: { search }, history }) => {
  const client = useApolloClient();
  const [logInStudent, { loading }] = useMutation(LOG_IN, {
    onCompleted: ({ logInStudent: { token } }) => {
      if (token) {
        localforage.setItem('__STUDENT_QUIZUS__', token).then(() => {
          const {
            push,
            location: { state = { from: { pathname: '/' } } }
          } = history;
          client.writeData({
            data: { loggedIn: true }
          });
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
  return null;
};
