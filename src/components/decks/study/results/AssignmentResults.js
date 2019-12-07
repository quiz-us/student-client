import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Responses from './Responses';
import Question from './Question';
import { GET_STUDENT_ASSIGNMENT_RESULTS } from '../../../queries/Assignment';

const useStyles = makeStyles({
  root: {},
  container: {
    marginBottom: '10px',
  },
  questionContainer: {
    margin: '25px',
  },
});

const AssignmentResults = ({ studentId, assignmentId }) => {
  const classes = useStyles();
  const { data, loading } = useQuery(GET_STUDENT_ASSIGNMENT_RESULTS, {
    variables: { assignmentId, studentId },
  });
  if (loading) {
    return <LinearProgress />;
  }
  const { studentAssignmentResults } = data;
  return (
    <div className={classes.root}>
      <h2>Nice Work!</h2>
      <div>Here's how you did:</div>
      {studentAssignmentResults.map(({ responses, ...question }, i) => {
        return (
          <div
            className={classes.container}
            key={`assignment-show-${question.id}`}
          >
            <h2>{`${i + 1}.)`}</h2>
            <div className={classes.questionContainer}>
              <Question question={question} />
              <Responses responses={responses} />
            </div>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

AssignmentResults.propTypes = {
  assignmentId: PropTypes.string.isRequired,
  studentId: PropTypes.string.isRequired,
};

export default AssignmentResults;
