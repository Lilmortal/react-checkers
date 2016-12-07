import { combineReducers } from 'redux'
import checkerReducer from './checker/checkerReducer'
import tileReducer from './tile/tileReducer'

export default combineReducers({
	checkerReducer,
	tileReducer
})