import React, { useReducer } from 'react';
import { GET_PERSONAL_ASSIGNMENT } from '../../queries/Assignment';
import { useQuery } from '@apollo/react-hooks';
import GlobalLoader from '../../app/GlobalLoader';

let reducer = (personalAssignment, action) => {
  const { type, assignment } = action;
  switch (type) {
    case 'setInitial':
      return assignment;
    default:
      return;
  }
};
const initialState = {
  deck: {}
};
const PersonalAssignmentContext = React.createContext(initialState);

function PersonalAssignmentProvider({ children }) {
  const [personalAssignment, dispatch] = useReducer(reducer, initialState);
  const { loading } = useQuery(GET_PERSONAL_ASSIGNMENT, {
    onCompleted: data => {
      console.log('DONE');
      dispatch({
        type: 'setInitial',
        assignment: data.personalAssignment
      });
    }
  });
  if (loading) {
    return <GlobalLoader />;
  }
  return (
    <PersonalAssignmentContext.Provider
      value={{ personalAssignment, dispatch }}
    >
      {children}
    </PersonalAssignmentContext.Provider>
  );
}
export { PersonalAssignmentContext, PersonalAssignmentProvider };
