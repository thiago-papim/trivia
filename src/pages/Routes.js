import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Feedback from './Feedback';
import Login from './Login';
import Settings from './Settings';
import Game from './Game';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/game" component={ Game } />
        <Route path="/settings" component={ Settings } />
        <Route path="/feedback" component={ Feedback } />
        <Route exact path="/" component={ Login } />
      </Switch>
    );
  }
}

export default Routes;
