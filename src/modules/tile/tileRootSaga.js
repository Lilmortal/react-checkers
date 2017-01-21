import { takeLatest } from 'redux-saga'
import * as module from './ducks/tile'
import selectDraughtSaga from './sagas/selectDraughtSaga'
import moveDraughtSaga from './sagas/moveDraughtSaga'

const { START_SELECT_DRAUGHT, START_MOVE_DRAUGHT } = module

/**
 * Watch and see if any of the actions has been called; if it does, redirect them to the specfied function
 * @return {Generator} [description]
 */
export const watchUpdateTiles = function*() {
	// I dont know about putting fork in here... what if move draught run faster and select draught overwrites the state of move draught (e.g. )
  yield takeLatest(START_SELECT_DRAUGHT, selectDraughtSaga)
  yield takeLatest(START_MOVE_DRAUGHT, moveDraughtSaga)
}
