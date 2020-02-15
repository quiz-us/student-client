import gql from 'graphql-tag';

export const GET_STANDARDS_MASTERY = gql`
  {
    standardsMastery {
      standard {
        title
        description
      }
      numCorrect
      numAttempted
    }
  }
`;
