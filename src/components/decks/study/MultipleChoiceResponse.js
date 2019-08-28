import React from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/styles';
import ReadOnly from './ReadOnly';
import shuffle from '../../../util/shuffle';

const useStyles = makeStyles(theme => ({
  multipleChoice: {
    marginBottom: theme.spacing(2),
    fontSize: '16px'
  }
}));

const MultipleChoiceResponse = ({ questionOptions }) => {
  const classes = useStyles();
  console.log('uh ok', questionOptions);
  return (
    <div>
      <h3>Choose the correct answer:</h3>
      {shuffle(questionOptions).map(answerChoice => {
        const { id, richText } = answerChoice;
        return (
          <CardActionArea
            key={`answerchoice-${id}`}
            className={classes.multipleChoice}
          >
            <ReadOnly value={JSON.parse(richText)} />
          </CardActionArea>
        );
      })}
    </div>
  );
};

export default MultipleChoiceResponse;
