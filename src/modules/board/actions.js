import * as actionTypes from './actionTypes'

export const UPDATE_BOARD = (selectedDraughtId, playerTurn, previousMoveId, isAbleToEatAvailable) => {
	return {
		type: actionTypes.UPDATE_BOARD,
		selectedDraughtId,
    playerTurn,
    previousMoveId,
    isAbleToEatAvailable
	}
}
