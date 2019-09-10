import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import { GET_ASSIGNMENT } from '../../queries/Assignment';
import GlobalLoader from '../../app/GlobalLoader';
import StudySessionDetails from './StudySessionDetails';
import QuestionDisplay from './QuestionDisplay';
import shuffle from '../../../util/shuffle';

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

// TODO: memoize this or move logic to backend to avoid complex frontend computation:
const findCurrentQuestion = (responses, questions) => {
  const answeredQuestions = {};
  let numCorrectResponses = 0;
  responses.forEach(({ questionId, mcCorrect, selfGrade }) => {
    if (mcCorrect !== null) {
      //when it's mc question
      answeredQuestions[questionId] = mcCorrect;
    } else if (selfGrade !== null) {
      //when it's free response question
      answeredQuestions[questionId] = selfGrade >= 4 ? true : false;
    }

    if (mcCorrect || selfGrade >= 4) {
      numCorrectResponses += 1;
    }
  });

  // find the first question that had not already been answered:
  let currentQuestion = questions.find(({ id }) => {
    // first select questions that have not been answered (ie. undefined)
    return answeredQuestions[id] === undefined;
  });

  if (!currentQuestion) {
    const questionsDup = [...questions];
    currentQuestion = shuffle(questionsDup).find(({ id }) => {
      // then, select questions that were answered incorrectly
      return answeredQuestions[id] === false;
    });
  }

  return {
    numCorrectResponses,
    currentQuestion
  };
};

const StudySession = ({ match, currentStudent }) => {
  const classes = useStyles();
  const { assignmentId } = match.params;
  const { loading: assignmentLoading, data: assignmentData } = useQuery(
    GET_ASSIGNMENT,
    {
      fetchPolicy: 'cache-and-network',
      variables: { assignmentId, studentId: currentStudent.id }
    }
  );

  // fetch all responses to know where student is at any given point in the
  // study session
  if (assignmentLoading) {
    return <GlobalLoader />;
  }

  const { assignment } = assignmentData;
  const {
    responses,
    deck: { questions }
  } = assignment;

  const { currentQuestion, numCorrectResponses } = findCurrentQuestion(
    responses,
    questions
  );

  const numResponses = responses.length;
  const done = !currentQuestion;

  return (
    <div className={classes.root}>
      <StudySessionDetails
        assignment={assignment}
        numResponses={numCorrectResponses}
        numQuestions={questions.length}
      />
      <main className={classes.content}>
        {done ? (
          <div>you're done! nice work!</div>
        ) : (
          <QuestionDisplay
            key={`current-question-${numResponses}`}
            currentQuestion={currentQuestion}
            currentStudent={currentStudent}
            numResponses={numResponses}
            assignmentId={assignment.id}
          />
        )}
      </main>
    </div>
  );
};

export default StudySession;
