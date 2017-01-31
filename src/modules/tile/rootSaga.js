import { takeLatest } from 'redux-saga'
import { START_MOVE_DRAUGHT } from './actionTypes'
import * as sagas from './sagas'

const { moveDraughtSaga } = sagas

/**
 * Watch and see if any of the actions has been called; if it does, redirect them to the specfied function
 * @return {Generator} [description]
 */
export const watchTileUpdates = function*() {
  yield takeLatest(START_MOVE_DRAUGHT, moveDraughtSaga)
}
