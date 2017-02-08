import React from 'react'
import ReactDOM from 'react-dom'
import mainModule from './modules/main'
import boardModule from './modules/board'
import reduxFormExampleModule from './modules/reduxFormExample'
import { Provider } from 'react-redux'
import { store } from './store'
import DevTools from './tools/DevTools'
import { Router, IndexRoute, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import './index.css'

const Main = mainModule.components.default.Main
const BoardContainer = boardModule.components.BoardContainer
const ReduxFormExample = reduxFormExampleModule.components.default.ReduxFormExample
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
	<Provider store={store}>
		<div>
			<Router history={history}>
				<Route path='/' component={Main}>
					<IndexRoute component={BoardContainer}></IndexRoute>
					<Route path='/reduxFormExample' component={ReduxFormExample}></Route>
				</Route>
			</Router>
			<DevTools />
		</div>
	</Provider>,
	document.getElementById('board')
)
