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
  query getAssignment($assignmentId: ID!, $studentId: ID!) {
    assignment(assignmentId: $assignmentId, studentId: $studentId) {
      instructions
      id
      due
      deck {
        name
        description
        id
        questions {
          questionText
          id
          questionType
          questionNode
          questionOptions {
            optionNode
            correct
          }
        }
      }
      responses {
        id
        questionId
      }
    }
  }
`;
