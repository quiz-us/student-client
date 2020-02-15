import React, { useContext } from 'react';
import PropTypes from 'prop-types';
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
  GET_PERSONAL_ASSIGNMENT,
  GET_NEXT_PERSONAL_QUESTION,
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

const StudyPersonalAssignment = () => {
  const { dispatch, assignment } = useContext(AssignmentContext);
  const classes = useStyles();
  const [getNextQuestion] = useLazyQuery(GET_NEXT_PERSONAL_QUESTION, {
    fetchPolicy: 'network-only',
    onCompleted: ({ personalAssignment }) => {
      dispatch({
        type: RECEIVE_NEXT_QUESTION,
        assignment: personalAssignment,
      });
    },
    onError: error => {
      console.error(error);
    },
  });
  const { loading } = useQuery(GET_PERSONAL_ASSIGNMENT, {
    fetchPolicy: 'network-only',
    onCompleted: ({ personalAssignment }) => {
      dispatch({
        type: RECEIVE_TEACHER_ASSIGNMENT,
        assignment: {
          ...personalAssignment,
          personal: true,
        },
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

StudyPersonalAssignment.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ assignmentId: PropTypes.string }),
  }).isRequired,
};

const StudyPersonalAssignmentContainer = props => (
  <TeacherAssignmentProvider>
    <StudyPersonalAssignment {...props} />
  </TeacherAssignmentProvider>
);

export default StudyPersonalAssignmentContainer;
