import React from 'react';
import { Route } from 'react-router-dom';
import DeckIndex from '../decks/DeckIndex';
import StudySession from '../decks/study/StudySession';

export default () => {
  return (
    <React.Fragment>
      <Route exact path="/" component={DeckIndex} />
      <Route exact path="/study/:assignmentId" component={StudySession} />
      <Route exact path="/fun" component={() => <div>decks</div>} />
    </React.Fragment>
  );
};
