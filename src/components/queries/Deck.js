import gql from 'graphql-tag';

export const GET_DECKS = gql`
  query getDecks {
    studentDecks {
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
