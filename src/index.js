import React from 'react'
import ReactDOM from 'react-dom'
import BoardContainer from './modules/board/containers/boardContainer'
import { Provider } from 'react-redux'
import { store } from './store'
import DevTools from './tools/DevTools'
import './index.css'

ReactDOM.render(
	<Provider store={store}>
		<div>
			<BoardContainer />
			<DevTools />
		</div>
	</Provider>,
	document.getElementById('board')
)
