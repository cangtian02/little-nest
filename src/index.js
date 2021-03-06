import React from 'react';
import FastClick from 'fastclick';
import { render } from 'react-dom';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import { routes, RouteWithSubRoutes } from './router/routerConfig';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './redux/reducers/index';
import './assets/css/reset.css';
import './assets/font/iconfont.css';
import Const  from './common/Const';

React.lnConst = Const;

FastClick.attach(document.body);

const store = createStore(rootReducer);

render((
  <Provider store={store}>
    <Router>
      <Route exact path="/" render={() => <Redirect exact from="/" to="/home" />} />
      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
    </Router>
  </Provider>
), document.getElementById('root'));
