import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Settings from './Settings';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/settings" component={ Settings } />
        <Route exact path="/" component={ Login } />
      </Switch>
    );
  }
}

export default Routes;
