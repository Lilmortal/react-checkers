import { combineReducers } from 'redux'
import { selectDraughtReducer, moveDraughtReducer } from './board/boardReducers'

export default combineReducers({
	selectDraughtReducer,
	moveDraughtReducer
})