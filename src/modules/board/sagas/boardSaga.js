import { put } from 'redux-saga/effects'

import * as actions from '../actions'

export const updateBoard = function*(dispatch) {
	yield put(actions.UPDATE_BOARD(dispatch.selectedDraughtId, dispatch.previousMoveId, dispatch.playerTurn, dispatch.isAbleToEatAvailable))
}
