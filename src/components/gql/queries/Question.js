import gql from 'graphql-tag';

export const TRANSLATED_QUESTION = gql`
  query translatedQuestion($questionId: ID!) {
    translatedQuestion(questionId: $questionId) {
      questionText
      translatedQuestionText
      questionOptions {
        optionText
        translatedOptionText
      }
    }
  }
`;

export const CORRECT_FR_ANSWER = gql`
  query correctFrAnswer($responseId: ID!) {
    correctFrAnswer(responseId: $responseId) {
      richText
      optionText
    }
  }
`;
