import React from 'react';
import { PersonalAssignmentProvider } from './PersonalAssignmentContext';
import PersonalAssignment from './PersonalAssignment';

export default props => {
  return (
    <PersonalAssignmentProvider>
      <PersonalAssignment {...props} />
    </PersonalAssignmentProvider>
  );
};
