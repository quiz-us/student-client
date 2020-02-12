import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

const initialState = null;

const RECEIVE_TEACHER_ASSIGNMENT = 'RECEIVE_TEACHER_ASSIGNMENT';

let reducer = (teacherAssignment, action) => {
  const { type } = action;
  switch (type) {
    case RECEIVE_TEACHER_ASSIGNMENT: {
      console.log(action.teacherAssignment, 'ASSIGNMENT RECEIVED');
      return action.teacherAssignment;
    }
    default:
      return teacherAssignment;
  }
};

const TeacherAssignmentContext = React.createContext(initialState);

function TeacherAssignmentProvider({ children }) {
  const [teacherAssignment, dispatch] = useReducer(reducer, initialState);
  return (
    <TeacherAssignmentContext.Provider value={{ teacherAssignment, dispatch }}>
      {children}
    </TeacherAssignmentContext.Provider>
  );
}

TeacherAssignmentProvider.propTypes = {
  children: PropTypes.node,
};

export {
  TeacherAssignmentContext,
  TeacherAssignmentProvider,
  RECEIVE_TEACHER_ASSIGNMENT,
};
