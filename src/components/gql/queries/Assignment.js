import gql from 'graphql-tag';
import { QUESTION_ATTRIBUTES } from '../fragments/Question';

export const GET_ASSIGNMENTS = gql`
  query getAssignments {
    studentAssignments {
      instructions
      id
      numCorrectResponses
      numQuestions
      due
      deck {
        name
        description
        id
      }
    }
  }
`;

export const GET_TEACHER_ASSIGNMENT = gql`
  query getTeacherAssignment($assignmentId: ID!, $studentId: ID!) {
    assignment(assignmentId: $assignmentId, studentId: $studentId) {
      instructions
      id
      due
      numCorrectResponses
      numQuestions
      deck {
        id
        name
        description
      }
      currentQuestion {
        ...questionAttributes
      }
    }
  }
  ${QUESTION_ATTRIBUTES}
`;

export const GET_PERSONAL_ASSIGNMENT = gql`
  query getPersonalAssignment {
    personalAssignment {
      instructions
      responses {
        id
        questionId
        mcCorrect
        selfGrade
      }
      deck {
        id
        name
        description
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
  }
`;

export const GET_STUDENT_ASSIGNMENT_RESULTS = gql`
  query($studentId: ID!, $assignmentId: ID!) {
    studentAssignmentResults(
      studentId: $studentId
      assignmentId: $assignmentId
    ) {
      id
      richText
      questionType
      responses {
        createdAt
        id
        questionOption {
          richText
        }
        responseText
        mcCorrect
        selfGrade
      }
    }
  }
`;
