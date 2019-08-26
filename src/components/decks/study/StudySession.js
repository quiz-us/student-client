import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import { GET_ASSIGNMENT } from '../../queries/Assignment';
import StudySessionDetails from './StudySessionDetails';

const StudySession = ({ match }) => {
  const { assignmentId } = match.params;
  const { loading, data } = useQuery(GET_ASSIGNMENT, {
    variables: { assignmentId }
  });
  console.log(data);
  return (
    <div>
      <StudySessionDetails />
    </div>
  );
};

export default StudySession;
