import React from 'react'
import { Provider } from 'react-redux'
import { Router, IndexRoute, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import mainModule from '../modules/main'
import boardModule from '../modules/board'
import reduxFormExampleModule from '../modules/reduxFormExample'
import store from '../store'
import DevTools from '../tools/DevTools'
import { onFormEnter } from './route_callbacks'

const history = syncHistoryWithStore(browserHistory, store)
const Main = mainModule.components.default.Main
const BoardContainer = boardModule.components.BoardContainer
const ReduxFormExampleContainer = reduxFormExampleModule.components.default.ReduxFormExampleContainer

export default (
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path='/' component={Main}>
          <IndexRoute component={BoardContainer} />
          <Route path='reduxFormExample/:pnr' component={ReduxFormExampleContainer} onEnter={onFormEnter} />
        </Route>
      </Router>
      <DevTools />
    </div>
  </Provider>
)
