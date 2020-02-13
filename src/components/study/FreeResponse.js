import React, { useContext } from 'react';
import { AssignmentContext } from './AssignmentContext';

const FreeResponse = () => {
  const {
    assignment: { currentQuestion },
  } = useContext(AssignmentContext);

  const { questionType } = currentQuestion;

  return <div>here is where you can answer free response</div>;
};

export default FreeResponse;
