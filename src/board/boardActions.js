import * as actionTypes from './boardActionTypes'

export const startSelectDraught = (tile, selectedDraught, playerTurn) => {
	return {
		type: actionTypes.START_SELECT_DRAUGHT,
		tile,
		selectedDraught,
		playerTurn
	}
}

export const selectDraught = (selectedDraught, tile) => {
	return {
		type: actionTypes.SELECT_DRAUGHT,
		selectedDraught,
		tile
	}
}

export const highlightTile = (tile) => {
	return {
		type: actionTypes.HIGHLIGHT_TILE,
		tile
	}
}

export const removeDraught = (tile) => {
	return {
		type: actionTypes.REMOVE_DRAUGHT,
		tile
	}
}

export const startMoveDraught = (tile, selectedDraught, previousMove, playerTurn, isAbleToEatAvailable) => {
	return {
		type: actionTypes.START_MOVE_DRAUGHT,
		tile,
		selectedDraught,
		previousMove,
		playerTurn,
		isAbleToEatAvailable
	}
}

export const moveDraught = (tile, playerTurn, previousMove, isAbleToEatAvailable) => {
	return {
		type: actionTypes.MOVE_DRAUGHT,
		tile,
		playerTurn,
		previousMove,
		isAbleToEatAvailable
	}
}
