import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { CurrentStudentContext } from '../home/Home';
import {
  AssignmentContext,
  TeacherAssignmentProvider,
  RECEIVE_TEACHER_ASSIGNMENT,
  RECEIVE_NEXT_QUESTION,
} from './AssignmentContext';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { drawerWidth } from './StudySessionSidebar';
import {
  GET_TEACHER_ASSIGNMENT,
  GET_NEXT_QUESTION,
} from '../gql/queries/Assignment';
import GlobalLoader from '../app/GlobalLoader';
import QuestionContent from './QuestionContent';
import StudySessionSidebar from './StudySessionSidebar';

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

const StudyTeacherAssignment = ({ match }) => {
  const currentStudent = useContext(CurrentStudentContext);
  const { dispatch, assignment } = useContext(AssignmentContext);
  const classes = useStyles();
  const { assignmentId } = match.params;
  const [getNextQuestion] = useLazyQuery(GET_NEXT_QUESTION, {
    fetchPolicy: 'network-only',
    variables: { assignmentId, studentId: currentStudent.id },
    onCompleted: ({ assignment }) => {
      dispatch({
        type: RECEIVE_NEXT_QUESTION,
        assignment,
      });
    },
    onError: error => {
      console.error(error);
    },
  });
  const { loading } = useQuery(GET_TEACHER_ASSIGNMENT, {
    fetchPolicy: 'network-only',
    variables: { assignmentId, studentId: currentStudent.id },
    onCompleted: ({ assignment }) => {
      dispatch({
        type: RECEIVE_TEACHER_ASSIGNMENT,
        assignment,
      });
    },
    onError: error => {
      console.error(error);
    },
  });
  if (loading || !assignment) {
    // if assignment has not been received yet, keep loading
    return <GlobalLoader />;
  }

  return (
    <div className={classes.root}>
      <StudySessionSidebar />
      <main className={classes.content}>
        <QuestionContent getNextQuestion={getNextQuestion} />
      </main>
    </div>
  );
};

StudyTeacherAssignment.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ assignmentId: PropTypes.string }),
  }).isRequired,
};

const StudyTeacherAssignmentContainer = props => (
  <TeacherAssignmentProvider>
    <StudyTeacherAssignment {...props} />
  </TeacherAssignmentProvider>
);

export default StudyTeacherAssignmentContainer;
