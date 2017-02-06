import * as actionTypes from './actionTypes'

export const START_SELECT_DRAUGHT = (id) => {
	return {
		type: actionTypes.START_SELECT_DRAUGHT,
		id
	}
}

export const SELECT_DRAUGHT = (id, tile) => {
	return {
		type: actionTypes.SELECT_DRAUGHT,
		id,
		tile
	}
}

export const HIGHLIGHT_NEIGHBOUR_TILES = (neighbourTiles) => {
	return {
		type: actionTypes.HIGHLIGHT_NEIGHBOUR_TILES,
		neighbourTiles
	}
}

export const UPDATE_BOARD = (selectedDraughtId, previousMoveId, playerTurn, isAbleToEatAvailable) => {
	return {
		type: actionTypes.UPDATE_BOARD,
		selectedDraughtId,
		previousMoveId,
    playerTurn,
    isAbleToEatAvailable
	}
}
