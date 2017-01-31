import React from 'react'
import ReactDOM from 'react-dom'
import board from './modules/board'
import { Provider } from 'react-redux'
import { store } from './store'
import DevTools from './tools/DevTools'
import './index.css'

const { BoardContainer } = board.components

ReactDOM.render(
	<Provider store={store}>
		<div>
			<BoardContainer />
			<DevTools />
		</div>
	</Provider>,
	document.getElementById('board')
)
