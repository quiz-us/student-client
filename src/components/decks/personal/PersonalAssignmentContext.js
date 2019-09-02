import React, { useReducer } from 'react';

let reducer = (state, action) => {
  const { type, assignment, response } = action;
  switch (type) {
    case 'setInitial':
      return {
        ...state,
        assignment,
        loading: false
      };
    case 'addResponse':
      return {
        ...state,
        responses: {
          ...state.responses,
          [response.questionId]: true
        }
      };
    case 'loading':
      return {
        ...state,
        loading: true
      };
    default:
      return;
  }
};
const initialState = {
  assignment: {
    deck: { questions: [] }
  },
  responses: {},
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
