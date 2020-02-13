import React, { useContext } from 'react';
import { AssignmentContext } from './AssignmentContext';
import MultipleChoiceResponse from './MultipleChoiceResponse';
import FreeResponse from './FreeResponse';

const ResponseForm = () => {
  const {
    assignment: { currentQuestion },
  } = useContext(AssignmentContext);

  const { questionType } = currentQuestion;

  switch (questionType) {
    case 'Multiple Choice':
      return <MultipleChoiceResponse />;
    case 'Free Response':
      return <FreeResponse />;
    default:
      throw Error(`Question Type of ${questionType} is not supported`);
  }
};

export default ResponseForm;
