import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import { GET_ASSIGNMENT } from '../../queries/Assignment';
import StudySessionDetails from './StudySessionDetails';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  content: {
    padding: theme.spacing(3)
  }
}));

const StudySession = ({ match }) => {
  const classes = useStyles();
  const { assignmentId } = match.params;
  const { loading, data } = useQuery(GET_ASSIGNMENT, {
    variables: { assignmentId }
  });
  console.log(data);
  console.log('loading', loading);
  return (
    <div className={classes.root}>
      <StudySessionDetails />
      <main className={classes.content}>here is my content</main>
    </div>
  );
};

export default StudySession;
