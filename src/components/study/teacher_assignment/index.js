import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { CurrentStudentContext } from '../../home/Home';
import {
  TeacherAssignmentContext,
  TeacherAssignmentProvider,
  RECEIVE_TEACHER_ASSIGNMENT,
} from './TeacherAssignmentContext';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import { drawerWidth } from '../StudySessionSidebar';
import { GET_TEACHER_ASSIGNMENT } from '../../gql/queries/Assignment';
import GlobalLoader from '../../app/GlobalLoader';
import TeacherAssignmentInfo from './TeacherAssignmentInfo';

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
  const { dispatch } = useContext(TeacherAssignmentContext);
  const classes = useStyles();
  const { assignmentId } = match.params;
  const { loading } = useQuery(GET_TEACHER_ASSIGNMENT, {
    fetchPolicy: 'cache-and-network',
    variables: { assignmentId, studentId: currentStudent.id },
    onCompleted: ({ teacherAssignment }) => {
      dispatch({
        type: RECEIVE_TEACHER_ASSIGNMENT,
        teacherAssignment,
      });
    },
  });

  if (loading) {
    return <GlobalLoader />;
  }

  return (
    <div className={classes.root}>
      <TeacherAssignmentInfo />
      <main className={classes.content}>i am content</main>
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
