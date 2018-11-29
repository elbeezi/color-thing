import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Game from '../game/Game';

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <Router>
        <Route path='/:level?' component={Game} />
      </Router>
    </Provider>
  );
};

export default Root;
