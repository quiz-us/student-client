import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { CurrentStudentContext } from '../home/Home';
import { makeStyles } from '@material-ui/core/styles';
import { GET_ASSIGNMENT } from '../gql/queries/Assignment';
import { useQuery } from '@apollo/react-hooks';

const useStyles = makeStyles(theme => ({}));

const Study = ({ match }) => {
  const currentStudent = useContext(CurrentStudentContext);
  const classes = useStyles();
  const { assignmentId } = match.params;
  const { loading: assignmentLoading, data: assignmentData } = useQuery(
    GET_ASSIGNMENT,
    {
      fetchPolicy: 'cache-and-network',
      variables: { assignmentId, studentId: currentStudent.id },
    }
  );

  return <div>{currentStudent.email}</div>;
};

Study.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ assignmentId: PropTypes.string }),
  }).isRequired,
};

export default Study;
