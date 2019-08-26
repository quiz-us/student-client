import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import ReadOnly from './ReadOnly';
import ResponseForm from './ResponseForm';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center'
  },
  card: {
    width: '85%',
    marginTop: '25px'
  }
}));

const QuestionDisplay = ({ currentQuestion, currentStudent }) => {
  const localKey = `QU_PERSISTED_STUDENT${currentStudent.id}_QUESTION${currentQuestion.id}`;
  const persistedAnswer = localStorage.getItem(localKey) || '';
  const classes = useStyles();
  const [savedAnswer, setSavedAnswer] = useState(persistedAnswer);
  const [expanded, setExpanded] = useState(!!savedAnswer);

  const handleSubmit = answer => {
    localStorage.setItem(localKey, answer);
    setSavedAnswer(answer);
    setExpanded(true);
  };

  const submitResponse = () => {
    // clear localStorage of persisted answer here
  };

  const { questionNode, questionOptions } = currentQuestion;
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader title="Question" />
        <CardContent>
          <ReadOnly value={JSON.parse(questionNode)} />
          <ResponseForm handleSubmit={handleSubmit} savedAnswer={savedAnswer} />
        </CardContent>
        <Collapse in={expanded} unmountOnExit>
          <CardHeader title="Correct Answer" />
          <CardContent>
            {questionOptions.map(answer => {
              if (answer.correct) {
                return (
                  <ReadOnly
                    key={`answer-${answer.id}`}
                    value={JSON.parse(answer.optionNode)}
                  />
                );
              }
            })}
            <h4>Rate how well you did (1 = bad; 4 = perfect)</h4>
            <Button variant="contained" color="primary">
              1
            </Button>
            <Button variant="contained" color="primary">
              2
            </Button>
            <Button variant="contained" color="primary">
              3
            </Button>
            <Button variant="contained" color="primary">
              4
            </Button>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default QuestionDisplay;
