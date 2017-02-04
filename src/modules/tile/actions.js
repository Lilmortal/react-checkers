import * as actionTypes from './actionTypes'

export const START_MOVE_DRAUGHT = (id) => {
	return {
		type: actionTypes.START_MOVE_DRAUGHT,
		id
	}
}

export const MOVE_DRAUGHT = (id, tile, selectedDraughtId) => {
	return {
		type: actionTypes.MOVE_DRAUGHT,
		id,
		tile,
		selectedDraughtId
	}
}

export const HIGHLIGHT_NEIGHBOUR_TILES = (neighbourTiles) => {
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
