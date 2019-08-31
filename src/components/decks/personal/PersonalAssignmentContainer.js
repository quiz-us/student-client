import React from 'react';
import { PersonalAssignmentProvider } from './PersonalAssignmentContext';
import PersonalAssignment from './PersonalAssignment';

export default () => {
  return (
    <PersonalAssignmentProvider>
      <PersonalAssignment />
    </PersonalAssignmentProvider>
  );
};
