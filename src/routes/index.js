import React from 'react'
import { Provider } from 'react-redux'
import { Router, IndexRoute, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import headerModule from '../modules/header'
import boardModule from '../modules/board'
import profileModule from '../modules/profile'
import store from '../store'
import DevTools from '../tools/DevTools'

const history = syncHistoryWithStore(browserHistory, store)
const Header = headerModule.components.Header
const BoardContainer = boardModule.components.BoardContainer
const Profile = profileModule.components.Profile

export default (
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path='/' component={Header}>
          <IndexRoute component={BoardContainer} />
          <Route path='profile' component={Profile} />
        </Route>
      </Router>
      <DevTools />
    </div>
  </Provider>
)
