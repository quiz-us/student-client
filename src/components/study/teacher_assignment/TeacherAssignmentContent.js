import React, { useContext } from 'react';
import { TeacherAssignmentContext } from './TeacherAssignmentContext';

const TeacherAssignmentContent = () => {
  const {
    teacherAssignment: { currentQuestion },
  } = useContext(TeacherAssignmentContext);

  return <div>{JSON.stringify(currentQuestion, 4)}</div>;
};

export default TeacherAssignmentContent;
