import gql from 'graphql-tag';

export const EVALUATE_RESPONSE = gql`
  query evaluateResponse($responseId: ID!, $responseText: String!) {
    evaluateResponse(responseId: $responseId, responseText: $responseText) {
      percent
    }
  }
`;
