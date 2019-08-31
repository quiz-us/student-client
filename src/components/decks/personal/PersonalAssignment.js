import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { PersonalAssignmentContext } from './PersonalAssignmentContext';
import StudySessionDetails from '../study/StudySessionDetails';
// import QuestionDisplay from './QuestionDisplay';

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
  const { personalAssignment, dispatch } = useContext(
    PersonalAssignmentContext
  );

  console.log(personalAssignment);
  return (
    <div className={classes.root}>
      <StudySessionDetails
        assignment={personalAssignment}
        // numResponses={numResponses}
        // numQuestions={questions.length}
      />
      <main className={classes.content}></main>
    </div>
  );
};

export default StudySession;
