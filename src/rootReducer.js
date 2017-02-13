import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import boardModule from './modules/board'
import tileModule from './modules/tile'
import reduxFormModule from './modules/reduxFormExample'

export default combineReducers({
	[boardModule.constants.NAME]: boardModule.reducer,
	[tileModule.constants.NAME]: tileModule.reducer,
	[reduxFormModule.constants.NAME]: reduxFormModule.reducer,
	routing: routerReducer,
	form: formReducer
})
