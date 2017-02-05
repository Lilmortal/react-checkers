import * as actionTypes from './actionTypes'

export const START_MOVE_DRAUGHT = id => {
	return {
		type: actionTypes.START_MOVE_DRAUGHT,
		id
	}
}

export const HIGHLIGHT_NEIGHBOUR_TILES = neighbourTiles => {
	return {
		type: actionTypes.HIGHLIGHT_NEIGHBOUR_TILES,
		neighbourTiles
	}
}

export const REMOVE_DRAUGHT = (id, tile) => {
	return {
		type: actionTypes.REMOVE_DRAUGHT,
		id,
		tile
	}
}

export const ADD_DRAUGHT = (id, tile) => {
	return {
		type: actionTypes.ADD_DRAUGHT,
		id,
		tile
	}
}

export const UPDATE_BOARD = (selectedDraughtId, playerTurn, previousMoveId, isAbleToEatAvailable) => {
	return {
		type: actionTypes.UPDATE_BOARD,
		selectedDraughtId,
    playerTurn,
    previousMoveId,
    isAbleToEatAvailable
	}
}
