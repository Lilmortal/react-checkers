import * as actionTypes from './boardActionTypes'

export const startSelectDraught = (tile, selectedDraught, playerTurn) => {
	console.log(tile)
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

export const startMoveDraught = (tile, selectedDraught, previousSelectedDraught, previousMove, playerTurn) => {
	return {
		type: actionTypes.START_MOVE_DRAUGHT,
		tile,
		selectedDraught,
		previousSelectedDraught,
		previousMove,
		playerTurn
	}
}

export const moveDraught = (tile, playerTurn, previousSelectedDraught, previousMove, isAbleToEatAvailable) => {
	return {
		type: actionTypes.MOVE_DRAUGHT,
		tile,
		playerTurn,
		previousSelectedDraught,
		previousMove,
		isAbleToEatAvailable
	}
}
