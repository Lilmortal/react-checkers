import * as actionTypes from './actionTypes'

export const UPDATE_BOARD = (selectedDraughtId, previousMoveId, playerTurn, isAbleToEatAvailable) => {
	return {
		type: actionTypes.UPDATE_BOARD,
		selectedDraughtId,
		previousMoveId,
    playerTurn,
    isAbleToEatAvailable
	}
}
