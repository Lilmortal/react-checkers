import React from 'react'
import ReactDOM from 'react-dom'
import Board from './board/board'
import { Provider } from 'react-redux'
import { store } from './store'
import DevTools from './containers/DevTools'

ReactDOM.render(
	<Provider store={store}>
		<div>
			<Board />
			<DevTools />
		</div>
	</Provider>,
	document.getElementById('board')
)