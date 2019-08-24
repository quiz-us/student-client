import React from 'react';
import { Route } from 'react-router-dom';

export default () => {
  return (
    <React.Fragment>
      <Route exact path="/" component={() => <div>home</div>} />
      <Route exact path="/fun" component={() => <div>decks</div>} />
    </React.Fragment>
  );
};
