import * as actionTypes from './actionTypes'

export const updateSelectedDraught = (selectedDraught) => {
	return {
		type: actionTypes.UPDATE_SELECTED_DRAUGHT,
    selectedDraught
	}
}

export const updateBoard = (playerTurn, previousMove, isAbleToEatAvailable) => {
	return {
		type: actionTypes.UPDATE_BOARD,
    playerTurn,
    previousMove,
    isAbleToEatAvailable
	}
}
