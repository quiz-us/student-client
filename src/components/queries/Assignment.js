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
          richText
          questionOptions {
            richText
            correct
            id
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

export const GET_PERSONAL_ASSIGNMENT = gql`
  query getPersonalAssignment {
    personalAssignment {
      instructions
      deck {
        id
        name
        description
        cards {
          nextDue
          question {
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
    }
  }
`;