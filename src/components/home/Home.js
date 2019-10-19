import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import DeckIndex from '../decks/DeckIndex';
import StudySession from '../decks/study/StudySession';
import PersonalAssignment from '../decks/personal/PersonalAssignmentContainer';
import { GET_CURRENT_STUDENT } from '../queries/Student';
import GlobalLoader from '../app/GlobalLoader';

export default () => {
  const { data = {}, loading } = useQuery(GET_CURRENT_STUDENT);

  if (loading) {
    return <GlobalLoader />;
  }

  const { currentStudent } = data;

  if (!currentStudent) {
    return <Redirect to="/login" />;
  }
  return (
    <React.Fragment>
      <Route exact path="/" component={DeckIndex} />
      <Route
        exact
        path="/study/:assignmentId"
        component={props => (
          <StudySession currentStudent={currentStudent} {...props} />
        )}
      />
      <Route
        exact
        path="/personal-deck"
        component={() => <PersonalAssignment currentStudent={currentStudent} />}
      />
      <Route exact path="/fun" component={() => <div>decks</div>} />
    </React.Fragment>
  );
};
