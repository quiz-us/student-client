import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { CurrentStudentContext } from '../home/Home';
import {
  TeacherAssignmentContext,
  TeacherAssignmentProvider,
  RECEIVE_TEACHER_ASSIGNMENT,
} from './AssignmentContext';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import { drawerWidth } from './StudySessionSidebar';
import { GET_TEACHER_ASSIGNMENT } from '../gql/queries/Assignment';
import GlobalLoader from '../app/GlobalLoader';
import AssignmentContent from './AssignmentContent';
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
  const { dispatch, assignment } = useContext(TeacherAssignmentContext);
  const classes = useStyles();
  const { assignmentId } = match.params;
  const { loading } = useQuery(GET_TEACHER_ASSIGNMENT, {
    fetchPolicy: 'network-only',
    variables: { assignmentId, studentId: currentStudent.id },
    onCompleted: ({ assignment: assignment }) => {
      dispatch({
        type: RECEIVE_TEACHER_ASSIGNMENT,
        assignment,
      });
    },
    onError: error => {
      console.error(error);
    },
  });
  console.log(loading);
  if (loading || !assignment) {
    // if assignment has not been received yet, keep loading
    return <GlobalLoader />;
  }

  return (
    <div className={classes.root}>
      <StudySessionSidebar />
      <main className={classes.content}>
        <AssignmentContent />
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
