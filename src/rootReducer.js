import { combineReducers } from 'redux'
import { draughtReducer } from './draught/draughtReducer'
import { tileReducer } from './tile/tileReducer'

export default combineReducers({
	draughtReducer,
	tileReducer
})
