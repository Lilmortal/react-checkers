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

export const selectDraught = (tile, selectedDraught) => {
	return {
		type: SELECT_DRAUGHT,
		tile,
		selectedDraught
	}
}

export const highlightTile = (tile) => {
	return {
		type: HIGHLIGHT_TILE,
		tile
	}
}

export const removeDraught = (tile) => {
	return {
		type: REMOVE_DRAUGHT,
		tile
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

export const moveDraught = (tile) => {
	return {
		type: MOVE_DRAUGHT,
		tile
	}
}

const initialState = {
	tiles: populateTiles()
}

const tilesReducer = (state = initialState, payLoad) => {
	switch (payLoad.type) {
		case SELECT_DRAUGHT: {
			state.tiles = updateTiles(state.tiles, payLoad.tile)

			return {
				...state,
				tiles: state.tiles
			}
		}
		case HIGHLIGHT_TILE: {
			state.tiles = updateTiles(state.tiles, payLoad.tile)

			return {
				...state,
				tiles: state.tiles
			}
		}
		case REMOVE_DRAUGHT: {
			state.tiles = updateTiles(state.tiles, payLoad.tile)

			return {
				...state,
				tiles: state.tiles
			}
		}
		case MOVE_DRAUGHT: {
			state.tiles = updateTiles(state.tiles, payLoad.tile)

			return {
				...state,
				tiles: state.tiles
			}
		}
		default:
			return state
	}
}

export default tilesReducer
