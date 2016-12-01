import React from 'react'
import ReactDOM from 'react-dom'
import Board from './board/board'
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
	<Provider store={store}>
		<Board />
	</Provider>,
	document.getElementById('board')
)