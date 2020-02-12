import React, { useContext } from 'react';
import { TeacherAssignmentContext } from './AssignmentContext';
import QuestionContent from './QuestionContent';

const TeacherAssignmentContent = () => {
  const {
    teacherAssignment: { currentQuestion },
  } = useContext(TeacherAssignmentContext);

  return (
    <div>
      <QuestionContent currentQuestion={currentQuestion} />
    </div>
  );
};

export default TeacherAssignmentContent;
