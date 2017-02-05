import * as actions from '../actions'
import { put } from 'redux-saga/effects'

export const updateBoard = function*(dispatch) {
	yield put(actions.UPDATE_BOARD(dispatch.selectedDraughtId, dispatch.playerTurn, dispatch.previousMoveId, dispatch.isAbleToEatAvailable))
}
