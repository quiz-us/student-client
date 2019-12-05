import React, { useContext } from 'react';
import { CurrentStudentContext } from '../home/Home';

export default () => {
  const currentStudent = useContext(CurrentStudentContext);
  return <div>Coming Soon</div>;
};
