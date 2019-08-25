import React from 'react';
import { Route } from 'react-router-dom';
import DeckIndex from '../decks/DeckIndex';

export default () => {
  return (
    <React.Fragment>
      <Route exact path="/" component={DeckIndex} />
      <Route exact path="/fun" component={() => <div>decks</div>} />
    </React.Fragment>
  );
};
