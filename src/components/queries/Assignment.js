import gql from 'graphql-tag';

export const GET_ASSIGNMENTS = gql`
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

export const GET_ASSIGNMENT = gql`
  query getAssignment($assignmentId: ID!) {
    assignment(assignmentId: $assignmentId) {
      instructions
      id
      deck {
        name
        description
        id
        questions {
          questionText
        }
      }
    }
  }
`;
