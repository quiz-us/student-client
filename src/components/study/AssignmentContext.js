import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

const initialState = null;

const RECEIVE_TEACHER_ASSIGNMENT = 'RECEIVE_TEACHER_ASSIGNMENT';
const RECEIVE_NEXT_QUESTION = 'RECEIVE_NEXT_QUESTION';
const RECEIVE_FR_TEXT = 'RECEIVE_FR_TEXT';

let reducer = (assignment, action) => {
  const { type } = action;
  switch (type) {
    case RECEIVE_TEACHER_ASSIGNMENT: {
      return action.assignment;
    }
    case RECEIVE_NEXT_QUESTION: {
      return { ...assignment, ...action.assignment };
    }
    case RECEIVE_FR_TEXT: {
      return {
        ...assignment,
        currentResponse: {
          ...assignment.currentResponse,
          responseText: action.responseText,
        },
      };
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
  RECEIVE_NEXT_QUESTION,
  RECEIVE_FR_TEXT,
};
