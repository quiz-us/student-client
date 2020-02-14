import React, { useContext, useState } from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';
import ReadOnly from '../decks/ReadOnly';
import blueGrey from '@material-ui/core/colors/blueGrey';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { AssignmentContext } from './AssignmentContext';

import { SELECT_MC_ANSWER } from '../gql/mutation/Response';
import { useMutation } from '@apollo/react-hooks';

const useStyles = makeStyles({
  multipleChoice: {
    fontSize: '16px',
  },
  mcEditor: {
    background: blueGrey[100],
    borderRadius: '4px',
  },
  answerChoiceContainer: {
    margin: '25px 0 25px 25px',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    width: '20px',
  },
});

const Feedback = ({ selectedId, correctId, answerId }) => {
  const classes = useStyles();
  if (!selectedId) {
    return <span className={classes.icon} />;
  }
  if (answerId === correctId) {
    return <CheckIcon className={classes.icon} aria-label="correct answer" />;
  }

  if (selectedId === answerId) {
    return <ClearIcon className={classes.icon} aria-label="incorrect answer" />;
  }

  return <span className={classes.icon} />;
};

const MultipleChoiceResponse = () => {
  const [responseData, setResponseData] = useState({});
  const [selectMcAnswer] = useMutation(SELECT_MC_ANSWER, {
    onCompleted: ({
      selectMcAnswer: { questionOptionId, correctQuestionOptionId },
    }) => {
      console.log('WHAT CAME BACK', selectMcAnswer);
      setResponseData({
        selectedId: questionOptionId,
        correctId: correctQuestionOptionId,
      });
    },
    onError: err => console.error(err),
  });
  const classes = useStyles();
  const {
    assignment: {
      currentQuestion,
      currentResponse: { id },
    },
  } = useContext(AssignmentContext);

  const onClick = questionOptionId => {
    return () => {
      selectMcAnswer({
        variables: { questionOptionId, responseId: id },
      });
    };
  };

  const { selectedId, correctId } = responseData;

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
            <CardActionArea
              className={classes.multipleChoice}
              onClick={onClick(id)}
            >
              <ReadOnly
                value={JSON.parse(richText)}
                editorClass={classes.mcEditor}
              />
            </CardActionArea>
            <Feedback
              selectedId={selectedId}
              correctId={correctId}
              answerId={id}
            />
          </div>
        );
      })}
    </div>
  );
};

export default MultipleChoiceResponse;
