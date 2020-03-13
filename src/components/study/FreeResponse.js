import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { AssignmentContext, RECEIVE_FR_TEXT } from './AssignmentContext';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import { SUBMIT_FR_ANSWER, RATE_FR_ANSWER } from '../gql/mutation/Response';
import { CORRECT_FR_ANSWER } from '../gql/queries/Question';
import ReadOnly from '../decks/ReadOnly';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '20px',
  },
  field: {
    marginBottom: '25px',
  },
  submit: {
    margin: '0 auto',
    width: '100px',
    display: 'block',
  },
  ratings: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  rating: {
    width: '15%',
    [theme.breakpoints.down('sm')]: {
      width: '30%',
    },
    marginBottom: '20px',
  },
  correctAnswerContainer: {
    marginTop: '20px',
  },
}));

const FreeResponse = ({ getNextQuestion }) => {
  const classes = useStyles();

  // Context:
  const {
    assignment: {
      currentResponse: { id: responseId, responseText: submittedResponse },
    },
    dispatch,
  } = useContext(AssignmentContext);

  const [response, setResponse] = useState(submittedResponse || '');

  const [submitFrAnswer] = useMutation(SUBMIT_FR_ANSWER, {
    onCompleted: ({ submitFrAnswer: { responseText } }) => {
      dispatch({
        type: RECEIVE_FR_TEXT,
        responseText,
      });
    },
    onError: err => console.error(err),
  });

  const [rateFrAnswer] = useMutation(RATE_FR_ANSWER, {
    onCompleted: () => {
      setResponse('');
      getNextQuestion();
    },
    onError: err => console.error(err),
  });

  const { data: { correctFrAnswer } = {} } = useQuery(CORRECT_FR_ANSWER, {
    variables: { responseId },
    fetchPolicy: 'network-only',
    skip: !submittedResponse, // don't fetch answer if missing submittedResponse
  });

  const onSubmit = e => {
    e.preventDefault();
    submitFrAnswer({ variables: { responseText: response, responseId } });
  };

  return (
    <div onSubmit={onSubmit} className={classes.root}>
      <form>
        <TextField
          className={classes.field}
          required
          disabled={!!submittedResponse}
          value={response}
          onChange={e => setResponse(e.target.value)}
          variant="outlined"
          multiline
          label="Your Answer"
          fullWidth
        />
        <Button
          className={classes.submit}
          disabled={!!submittedResponse}
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </form>
      <Collapse in={!!correctFrAnswer} unmountOnExit>
        {correctFrAnswer && (
          <div className={classes.correctAnswerContainer}>
            <h3>Correct Answer</h3>
            <ReadOnly value={JSON.parse(correctFrAnswer.richText)} />
            <h4>How well did you do? (0 = didn't know it; 5 = perfect!)</h4>
            <div className={classes.ratings}>
              {[0, 1, 2, 3, 4, 5].map(rating => {
                return (
                  <Button
                    className={classes.rating}
                    key={`rating-${rating}`}
                    onClick={() =>
                      rateFrAnswer({
                        variables: { selfGrade: rating, responseId },
                      })
                    }
                    variant="contained"
                    color="secondary"
                  >
                    {rating}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </Collapse>
    </div>
  );
};

FreeResponse.propTypes = {
  getNextQuestion: PropTypes.func.isRequired,
};

export default FreeResponse;