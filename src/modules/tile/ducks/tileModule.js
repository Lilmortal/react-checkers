import { populateTiles, updateTiles } from '../containers/tilesContainer'

export const START_SELECT_DRAUGHT = 'tile/START_SELECT_DRAUGHT'

export const SELECT_DRAUGHT = 'tile/SELECT_DRAUGHT'

export const HIGHLIGHT_TILE = 'tile/HIGHLIGHT_TILE'

export const REMOVE_DRAUGHT = 'tile/REMOVE_DRAUGHT'

export const START_MOVE_DRAUGHT = 'tile/START_MOVE_DRAUGHT'

export const MOVE_DRAUGHT = 'tile/MOVE_DRAUGHT'

export const startSelectDraught = (tile, selectedDraught, previousMove, playerTurn, isAbleToEatAvailable) => {
	return {
		type: START_SELECT_DRAUGHT,
		tile,
		selectedDraught,
		previousMove,
		playerTurn,
		isAbleToEatAvailable
	}
}

export const selectDraught = (tiles, tile, selectedDraught) => {
	tiles = updateTiles(tiles, tile)
	return {
		type: SELECT_DRAUGHT,
		tiles,
		selectedDraught
	}
}

export const highlightTile = (tiles, tile) => {
	tiles = updateTiles(tiles, tile)
	return {
		type: HIGHLIGHT_TILE,
		tiles
	}
}

export const removeDraught = (tiles, tile) => {
	tiles = updateTiles(tiles, tile)
	return {
		type: REMOVE_DRAUGHT,
		tiles
	}
}

export const startMoveDraught = (tile, selectedDraught, previousMove, playerTurn, isAbleToEatAvailable) => {
	return {
		type: START_MOVE_DRAUGHT,
		tile,
		selectedDraught,
		previousMove,
		playerTurn,
		isAbleToEatAvailable
	}
}

export const moveDraught = (tiles, tile) => {
	tiles = updateTiles(tiles, tile)
	return {
		type: MOVE_DRAUGHT,
		tiles
	}
}

const initialState = {
	tiles: populateTiles()
}

const tilesReducer = (state = initialState, payLoad) => {
	switch (payLoad.type) {
		case SELECT_DRAUGHT: {
			return {
				...state,
				tiles: payLoad.tiles
			}
		}
		case HIGHLIGHT_TILE: {
			return {
				...state,
				tiles: payLoad.tiles
			}
		}
		case REMOVE_DRAUGHT: {
			return {
				...state,
				tiles: payLoad.tiles
			}
		}
		case MOVE_DRAUGHT: {
			return {
				...state,
				tiles: payLoad.tiles
			}
		}
		default:
			return state
	}
}

export default tilesReducer
