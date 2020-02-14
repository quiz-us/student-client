import gql from 'graphql-tag';

export const CREATE_RESPONSE = gql`
  mutation createResponse(
    $questionId: ID!
    $assignmentId: ID
    $responseText: String
    $questionOptionId: ID
    $questionType: String!
    $selfGrade: Int
  ) {
    createResponse(
      questionId: $questionId
      assignmentId: $assignmentId
      responseText: $responseText
      questionOptionId: $questionOptionId
      questionType: $questionType
      selfGrade: $selfGrade
    ) {
      id
      questionId
      mcCorrect
      selfGrade
    }
  }
`;

export const SELECT_MC_ANSWER = gql`
  mutation($responseId: ID!, $questionOptionId: ID!) {
    selectMcAnswer(
      responseId: $responseId
      questionOptionId: $questionOptionId
    ) {
      id
      questionOptionId
      mcCorrect
      correctQuestionOptionId
    }
  }
`;
