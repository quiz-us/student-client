import React, { useContext, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation, useQuery, useLazyQuery } from '@apollo/react-hooks';
import { AssignmentContext, RECEIVE_FR_TEXT } from './AssignmentContext';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { SUBMIT_FR_ANSWER, RATE_FR_ANSWER } from '../gql/mutation/Response';
import { EVALUATE_RESPONSE } from '../gql/queries/Response';
import { CORRECT_FR_ANSWER } from '../gql/queries/Question';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '@material-ui/core/Chip';
import ReadOnly from '../decks/ReadOnly';

const useStyles = makeStyles((theme) => ({
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
  progressBar: {
    marginTop: '40px',
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
  },
  evaluation: {
    marginLeft: '10px',
    transition: 'width 100ms ease-in-out',
  },
}));

const RateFreeResponse = ({
  setResponse,
  getNextQuestion,
  correctFrAnswer,
  evaluation,
}) => {
  const classes = useStyles();
  const scrolled = useRef(false);
  useEffect(() => {
    const container = document.querySelector('#correct-answer-container');
    if (container && !scrolled.current) {
      container.scrollIntoView({ behavior: 'smooth' });
      scrolled.current = true;
    }
  });

  const {
    assignment: {
      currentResponse: { id: responseId },
    },
  } = useContext(AssignmentContext);

  const [rateFrAnswer, { loading: ratingLoading }] = useMutation(
    RATE_FR_ANSWER,
    {
      onCompleted: () => {
        setResponse('');
        getNextQuestion();
      },
      onError: (err) => console.error(err),
    }
  );

  if (correctFrAnswer) {
    return (
      <div
        id="correct-answer-container"
        className={classes.correctAnswerContainer}
      >
        <div className={classes.headerContainer}>
          <h3>Correct Answer</h3>
          {evaluation && (
            <Chip
              label={evaluation}
              className={classes.evaluation}
              color="primary"
            />
          )}
        </div>
        <ReadOnly value={JSON.parse(correctFrAnswer.richText)} />
        <h4>How well did you do? (0 = didn't know it; 5 = perfect!)</h4>
        {ratingLoading ? (
          <LinearProgress />
        ) : (
          <div className={classes.ratings}>
            {[0, 1, 2, 3, 4, 5].map((rating) => {
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
        )}
      </div>
    );
  }
  return null;
};

RateFreeResponse.propTypes = {
  getNextQuestion: PropTypes.func.isRequired,
  setResponse: PropTypes.func.isRequired,
  correctFrAnswer: PropTypes.object,
};

const FreeResponse = ({ getNextQuestion }) => {
  const classes = useStyles();
  const [evaluation, setEvaluation] = useState('loading...');
  const {
    assignment: {
      currentResponse: { id: responseId, responseText: submittedResponse },
    },
    dispatch,
  } = useContext(AssignmentContext);

  const [response, setResponse] = useState(submittedResponse || '');
  useQuery(EVALUATE_RESPONSE, {
    variables: { responseText: submittedResponse, responseId },
    onCompleted: (data) => {
      if (data) {
        const {
          evaluateResponse: { percent },
        } = data;
        setEvaluation(`${percent}% match`);
      }
    },
    onError: () => {
      setEvaluation('');
    },
    skip: !submittedResponse,
  });

  const [submitFrAnswer, { loading }] = useMutation(SUBMIT_FR_ANSWER, {
    onCompleted: ({ submitFrAnswer: { responseText } }) => {
      dispatch({
        type: RECEIVE_FR_TEXT,
        responseText,
      });
    },
    onError: (err) => console.error(err),
  });
  const { data: { correctFrAnswer } = {} } = useQuery(CORRECT_FR_ANSWER, {
    variables: { responseId },
    fetchPolicy: 'network-only',
    skip: !submittedResponse, // don't fetch answer if missing submittedResponse
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const variables = { responseText: response, responseId };
    submitFrAnswer({ variables });
  };

  const handleChange = (e) => {
    setResponse(e.target.value);
  };

  if (loading) {
    return <LinearProgress className={classes.progressBar} />;
  }

  return (
    <div onSubmit={onSubmit} className={classes.root}>
      <form>
        <TextField
          className={classes.field}
          required
          disabled={!!submittedResponse}
          value={response}
          onChange={handleChange}
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
      <div>
        <RateFreeResponse
          evaluation={evaluation}
          getNextQuestion={getNextQuestion}
          setResponse={setResponse}
          correctFrAnswer={correctFrAnswer}
        />
      </div>
    </div>
  );
};

FreeResponse.propTypes = {
  getNextQuestion: PropTypes.func.isRequired,
};

export default FreeResponse;
