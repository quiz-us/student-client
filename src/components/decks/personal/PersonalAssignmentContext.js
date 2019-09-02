import React, { useReducer } from 'react';

let reducer = (state, action) => {
  const { type, assignment } = action;
  switch (type) {
    case 'setInitial':
      return {
        ...state,
        assignment
      };
    default:
      return;
  }
};
const initialState = {
  assignment: {
    deck: { questions: [] }
  },
  responses: []
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
