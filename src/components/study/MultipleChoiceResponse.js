import React, { useContext } from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';
import ReadOnly from '../decks/ReadOnly';
import blueGrey from '@material-ui/core/colors/blueGrey';
import { AssignmentContext } from './AssignmentContext';

const useStyles = makeStyles(theme => ({
  multipleChoice: {
    marginBottom: theme.spacing(2),
    fontSize: '16px',
  },
  mcEditor: {
    background: blueGrey[100],
    borderRadius: '4px',
  },
  answerChoiceContainer: {
    padding: '0 15px',
  },
}));

const MultipleChoiceResponse = () => {
  const classes = useStyles();
  const {
    assignment: {
      currentQuestion,
      currentResponse: { id },
    },
  } = useContext(AssignmentContext);

  const { questionOptions } = currentQuestion;
  // TODO:
  // when student selects an answer choice, update the unfinished response
  // when response has been graded, mcCorrect should now be set on, and we
  // can then display feedback on the student's answer.
  return (
    <div>
      {questionOptions.map(answerChoice => {
        const { id, richText } = answerChoice;
        return (
          <div
            className={classes.answerChoiceContainer}
            key={`answerchoice-${id}`}
          >
            <CardActionArea className={classes.multipleChoice}>
              <ReadOnly
                value={JSON.parse(richText)}
                editorClass={classes.mcEditor}
              />
            </CardActionArea>
          </div>
        );
      })}
    </div>
  );
};

export default MultipleChoiceResponse;
