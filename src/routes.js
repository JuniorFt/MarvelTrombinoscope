import React from 'react';
import { Router, browserHistory, Route } from 'react-router';
import App from './containers/App';
import HeroDetail from './containers/HeroDetail';

export default () => {

  return (
    <Router history={browserHistory}>
      <Route path="/" component={App} />
      <Route path="/:heroName" component={HeroDetail} />
    </Router>
  );
};
