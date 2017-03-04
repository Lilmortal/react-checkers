import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import boardModule from './modules/board'
import tileModule from './modules/tile'

export default combineReducers({
	[boardModule.constants.NAME]: boardModule.reducer,
	[tileModule.constants.NAME]: tileModule.reducer,
	routing: routerReducer
})
