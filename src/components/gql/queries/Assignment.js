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
      currentResponse {
        id
        responseText
        mcCorrect
      }
    }
  }
  ${QUESTION_ATTRIBUTES}
`;

export const GET_NEXT_QUESTION = gql`
  query getNextQuestion($assignmentId: ID!, $studentId: ID!) {
    assignment(assignmentId: $assignmentId, studentId: $studentId) {
      id
      numCorrectResponses
      numQuestions
      currentQuestion {
        ...questionAttributes
      }
      currentResponse {
        id
        responseText
        mcCorrect
      }
    }
  }
  ${QUESTION_ATTRIBUTES}
`;

export const GET_PERSONAL_ASSIGNMENT = gql`
  query getPersonalAssignment {
    personalAssignment {
      instructions
      id
      numQuestions
      deck {
        id
        name
        description
      }
      currentQuestion {
        ...questionAttributes
      }
      currentResponse {
        id
        responseText
        mcCorrect
      }
    }
  }
  ${QUESTION_ATTRIBUTES}
`;

export const GET_NEXT_PERSONAL_QUESTION = gql`
  query getPersonalAssignment {
    personalAssignment {
      id
      numQuestions
      currentQuestion {
        ...questionAttributes
      }
      currentResponse {
        id
        responseText
        mcCorrect
      }
    }
  }
  ${QUESTION_ATTRIBUTES}
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
