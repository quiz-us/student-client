import React from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';
import ReadOnly from './ReadOnly';
import shuffle from '../../../util/shuffle';

const MultipleChoiceResponse = ({ questionOptions }) => {
  console.log('uh ok', questionOptions);
  return (
    <div>
      <h3>Choose correct answer:</h3>
      {shuffle(questionOptions).map(answerChoice => {
        const { id, optionNode } = answerChoice;
        return (
          <CardActionArea key={`answerchoice-${id}`}>
            <ReadOnly value={JSON.parse(optionNode)} />
          </CardActionArea>
        );
      })}
    </div>
  );
};

export default MultipleChoiceResponse;
