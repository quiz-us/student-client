import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

const initialState = null;

const RECEIVE_TEACHER_ASSIGNMENT = 'RECEIVE_TEACHER_ASSIGNMENT';

let reducer = (assignment, action) => {
  const { type } = action;
  switch (type) {
    case RECEIVE_TEACHER_ASSIGNMENT: {
      console.log(action.assignment, 'ASSIGNMENT RECEIVED');
      return action.assignment;
    }
    default:
      return assignment;
  }
};

const AssignmentContext = React.createContext(initialState);

function TeacherAssignmentProvider({ children }) {
  const [assignment, dispatch] = useReducer(reducer, initialState);
  return (
    <AssignmentContext.Provider value={{ assignment, dispatch }}>
      {children}
    </AssignmentContext.Provider>
  );
}

TeacherAssignmentProvider.propTypes = {
  children: PropTypes.node,
};

export {
  AssignmentContext,
  TeacherAssignmentProvider,
  RECEIVE_TEACHER_ASSIGNMENT,
};
