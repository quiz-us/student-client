import React, { useContext } from 'react';
import StudySessionSidebar from '../StudySessionSidebar';
import { TeacherAssignmentContext } from './TeacherAssignmentContext';

const TeacherAssignmentInfo = () => {
  const { teacherAssignment } = useContext(TeacherAssignmentContext);
  return <StudySessionSidebar assignment={teacherAssignment} />;
};

export default TeacherAssignmentInfo;
