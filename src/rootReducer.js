import { combineReducers } from 'redux'
import boardReducer from './modules/board/ducks/board'
import tilesReducer from './modules/tile/ducks/tile'

export default combineReducers({
	boardReducer,
	tilesReducer
})
