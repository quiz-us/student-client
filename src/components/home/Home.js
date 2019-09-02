import React from 'react';
import { Route } from 'react-router-dom';
import DeckIndex from '../decks/DeckIndex';
import StudySession from '../decks/study/StudySession';
import PersonalAssignment from '../decks/personal/PersonalAssignmentContainer';

export default ({ currentStudent }) => {
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
