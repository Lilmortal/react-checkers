import * as actionTypes from './boardActionTypes'

export const selectDraught = (tile, selectedDraught, playerTurn) => {
	return {
		type: actionTypes.SELECT_DRAUGHT_SYNC,
		tile,
		selectedDraught,
		playerTurn
	}
}


export const highlightTile = (tile) => {
	return {
		type: actionTypes.HIGHLIGHT_DRAUGHT,
		tile
	}
}

export const removeDraught = (tile) => {
	return {
		type: actionTypes.REMOVE_DRAUGHT,
		tile
	}
}

export const moveDraught = (tile, selectedDraught, previousDraughtMove, playerTurn) => {
	return {
		type: actionTypes.MOVE_DRAUGHT_SYNC,
		tile,
		selectedDraught,
		previousDraughtMove,
		playerTurn
	}
}
