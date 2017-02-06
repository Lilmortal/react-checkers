import tileModule from '../tile'
import draughtModule from '../draught'
import * as sagas from './sagas'
import { takeLatest } from 'redux-saga'

const { updateBoard } = sagas
/**
 * Watch and see if any of the actions has been called; if it does, redirect them to the specfied function
 * @return {Generator} [description]
 */
export const watchBoardUpdates = function*() {
  yield [
    takeLatest(tileModule.actionTypes.UPDATE_BOARD, updateBoard),
    takeLatest(draughtModule.actionTypes.UPDATE_BOARD, updateBoard)
  ]
}
