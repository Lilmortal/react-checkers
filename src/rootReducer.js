import boardModule from './modules/board'
import tileModule from './modules/tile'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
	[boardModule.constants.NAME]: boardModule.reducer,
	[tileModule.constants.NAME]: tileModule.reducer,
	routing: routerReducer,
	form: formReducer
})
