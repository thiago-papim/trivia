import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Feedback from './Feedback';
import Login from './Login';
import Settings from './Settings';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/settings" component={ Settings } />
      </Switch>
    );
  }
}

export default Routes;
