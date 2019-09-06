import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { PersonalAssignmentContext } from './PersonalAssignmentContext';
import StudySessionDetails from '../study/StudySessionDetails';
import PersonalQuestion from './PesonalQuestion';
import { GET_PERSONAL_ASSIGNMENT } from '../../queries/Assignment';
import { useApolloClient } from '@apollo/react-hooks';
import GlobalLoader from '../../app/GlobalLoader';

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

const PersonalAssignment = ({ currentStudent }) => {
  const classes = useStyles();
  const client = useApolloClient();
  const { personalAssignment, dispatch } = useContext(
    PersonalAssignmentContext
  );

  useEffect(() => {
    dispatch({ type: 'loading' });

    client
      .query({
        query: GET_PERSONAL_ASSIGNMENT,
        variables: {}
      })
      .then(({ data }) => {
        dispatch({
          type: 'setInitial',
          assignment: data.personalAssignment
        });
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { assignment, responses, loading } = personalAssignment;
  if (loading) {
    return <GlobalLoader />;
  }
  const {
    deck: { questions }
  } = assignment;
  const numResponses = Object.keys(responses).length;
  return (
    <div className={classes.root}>
      <StudySessionDetails
        assignment={assignment}
        numResponses={numResponses}
        numQuestions={questions.length}
      />
      <main className={classes.content}>
        <PersonalQuestion currentStudent={currentStudent} />
      </main>
    </div>
  );
};

export default PersonalAssignment;
