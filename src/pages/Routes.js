import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Feedback from './Feedback';
import Login from './Login';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/feedback" component={ Feedback } />
      </Switch>
    );
  }
}

export default Routes;
