import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import { GET_PERSONAL_DECK } from '../../queries/Assignment';
import GlobalLoader from '../../app/GlobalLoader';
import StudySessionDetails from './StudySessionDetails';
import QuestionDisplay from './QuestionDisplay';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  content: {
    padding: theme.spacing(3),
    width: '70%',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  }
}));

const StudySession = () => {
  const classes = useStyles();
  const { loading, data } = useQuery(GET_PERSONAL_DECK);

  // fetch all responses to know where student is at any given point in the
  // study session
  if (loading) {
    return <GlobalLoader />;
  }

  const { assignment } = data;
  const { responses, deck } = assignment;
  const answeredQuestions = {};
  responses.forEach(({ questionId }) => (answeredQuestions[questionId] = true));
  const questions = deck.questions;
  // find the first question that had not already been answered:
  const currentQuestion = questions.find(({ id }) => !answeredQuestions[id]);
  console.log(currentQuestion);
  const numResponses = responses.length;
  const done = numResponses === questions.length;
  return (
    <div className={classes.root}>
      <StudySessionDetails
        assignment={assignment}
        numResponses={numResponses}
        numQuestions={questions.length}
      />
      <main className={classes.content}>
        {done ? (
          <div>you're done! nice work!</div>
        ) : (
          <QuestionDisplay
            key={`current-question-${currentQuestion.id}`}
            currentQuestion={currentQuestion}
            numResponses={numResponses}
            assignmentId={assignment.id}
          />
        )}
      </main>
    </div>
  );
};

export default StudySession;
