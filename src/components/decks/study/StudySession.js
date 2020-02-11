import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import { GET_ASSIGNMENT } from '../../gql/queries/Assignment';
import GlobalLoader from '../../app/GlobalLoader';
import StudySessionDetails, { drawerWidth } from './StudySessionDetails';
import QuestionDisplay from './QuestionDisplay';
import findCurrentQuestion from '../findCurrentQuestion';
import AssignmentResults from './results/AssignmentResults';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    padding: theme.spacing(3),
    boxSizing: 'border-box',
    width: `calc(100% - ${drawerWidth}px)`,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

const StudySession = ({ match, currentStudent }) => {
  const classes = useStyles();
  const { assignmentId } = match.params;
  const { loading: assignmentLoading, data: assignmentData } = useQuery(
    GET_ASSIGNMENT,
    {
      fetchPolicy: 'cache-and-network',
      variables: { assignmentId, studentId: currentStudent.id },
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
    deck: { questions },
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
          <AssignmentResults
            assignmentId={assignmentId}
            studentId={currentStudent.id}
          />
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
