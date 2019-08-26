import gql from 'graphql-tag';

export const CREATE_RESPONSE = gql`
  mutation createResponse(
    $questionId: ID!
    $assignmentID: ID
    $responseText: String
    $questionOptionId: ID
  ) {
    createResponse(
      questionId: $questionId
      assignmentId: $assignmentId
      reaponseText: $responseText
      questionOptionId: $questionOptionId
    ) {
      questionId
      assignmentId
      responseText
      questionOptionId
    }
  }
`;
