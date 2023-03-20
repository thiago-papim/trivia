import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Feedback from './Feedback';
import Login from './Login';
import Settings from './Settings';
import Game from './Game';
import Ranking from './Ranking';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/game" component={ Game } />
        <Route path="/settings" component={ Settings } />
        <Route exact path="/" component={ Login } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
      </Switch>
    );
  }
}

export default Routes;
