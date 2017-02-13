import { takeLatest } from 'redux-saga'

import * as actionTypes from './actionTypes'
import * as sagas from './sagas'

const { selectDraughtSaga } = sagas
/**
 * Watch and see if any of the actions has been called; if it does, redirect them to the specfied function
 * @return {Generator} [description]
 */
export const watchDraughtUpdates = function*() {
  yield takeLatest(actionTypes.START_SELECT_DRAUGHT, selectDraughtSaga)
}
