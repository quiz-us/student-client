import gql from 'graphql-tag';

export const LOG_IN = gql`
  mutation logInStudent($token: String!) {
    logInStudent(token: $token) {
      token
    }
  }
`;

export const QR_LOG_IN = gql`
  mutation qrLogInStudent($qrCode: String!) {
    qrLogInStudent(qrCode: $qrCode) {
      token
      firstName
      lastName
      email
      id
    }
  }
`;

export const GET_CURRENT_STUDENT = gql`
  {
    currentStudent {
      firstName
      lastName
      email
      id
    }
  }
`;
