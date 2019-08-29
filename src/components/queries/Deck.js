import gql from 'graphql-tag';

export const GET_PERSONAL_DECK = gql`
  query getPersonalDeck {
    personalDeck {
      name
      description
      id
      questions {
        questionText
        id
        questionType
        richText
        questionOptions {
          richText
          correct
          id
        }
      }
    }
  }
`;
