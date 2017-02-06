import boardModule from './modules/board'
import tileModule from './modules/tile'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

export default combineReducers({
	[boardModule.constants.NAME]: boardModule.reducer,
	[tileModule.constants.NAME]: tileModule.reducer,
	routing: routerReducer
})
