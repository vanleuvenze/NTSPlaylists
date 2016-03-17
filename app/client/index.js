import React, { Component} from 'react'
import { render } from 'react-dom'

import routes from './routes.js'
import { Router, browserHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'

import { Provider } from 'react-redux'
import store from './store.js'


render (
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('root')
);
