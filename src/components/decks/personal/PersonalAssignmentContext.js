import React, { useReducer } from 'react';
import findCurrentQuestion from '../findCurrentQuestion';

let reducer = (state, action) => {
  const { type, assignment, response } = action;
  switch (type) {
    case 'setInitial': {
      // find current question
      const {
        deck: { questions },
        responses
      } = assignment;
      const { currentQuestion, numCorrectResponses } = findCurrentQuestion(
        responses,
        questions
      );
      return {
        ...state,
        assignment,
        responses,
        numCorrectResponses,
        currentQuestion,
        loading: false
      };
    }
    case 'addResponse': {
      const {
        assignment: {
          deck: { questions }
        },
        responses
      } = state;
      const updatedResponses = responses.concat([response]);
      const { currentQuestion, numCorrectResponses } = findCurrentQuestion(
        updatedResponses,
        questions
      );
      return {
        ...state,
        responses: updatedResponses,
        currentQuestion,
        numCorrectResponses
      };
    }
    case 'loading': {
      return {
        ...state,
        loading: true
      };
    }
    default:
      return;
  }
};
const initialState = {
  assignment: {
    deck: { questions: [] }
  },
  currentQuestion: {},
  numCorrectResponses: 0,
  responses: [],
  loading: false
};
const PersonalAssignmentContext = React.createContext(initialState);

function PersonalAssignmentProvider({ children }) {
  const [personalAssignment, dispatch] = useReducer(reducer, initialState);
  return (
    <PersonalAssignmentContext.Provider
      value={{ personalAssignment, dispatch }}
    >
      {children}
    </PersonalAssignmentContext.Provider>
  );
}
export { PersonalAssignmentContext, PersonalAssignmentProvider };
