import * as actionTypes from './actionTypes'

export const UPDATE_TILE_IS_HIGHLIGHTED = (tile) => {
	return {
		type: actionTypes.UPDATE_TILE_IS_HIGHLIGHTED,
		tile
	}
}

export const removeDraught = (tiles, tile) => {
	return {
		type: actionTypes.REMOVE_DRAUGHT,
		tiles
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

export const moveDraughtAction = (tiles, tile) => {
	return {
		type: actionTypes.MOVE_DRAUGHT,
		tiles
	}
}

export const moveDraught = (tiles, tile) => {
	return dispatch => {
		dispatch(moveDraughtAction(tiles, tile))
		//dispatch(updateSelectedDraught(undefined))
	}
}
