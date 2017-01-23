import { combineReducers } from 'redux'
import boardReducer from './modules/board/ducks/boardModule'
import tilesReducer from './modules/tile/ducks/tileModule'

export default combineReducers({
	boardReducer,
	tilesReducer
})
