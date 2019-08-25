import gql from 'graphql-tag';

export const GET_DECKS = gql`
  query getAssignments {
    studentAssignments {
      instructions
      id
      deck {
        name
        description
        id
      }
    }
  }
`;
