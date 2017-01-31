import { combineReducers } from 'redux'
import board from './modules/board'
import tile from './modules/tile'

export default combineReducers({
	[board.constants.NAME]: board.reducer,
	[tile.constants.NAME]: tile.reducer
})
