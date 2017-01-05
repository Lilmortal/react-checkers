import * as actionTypes from './boardActionTypes'
import { populateTiles, updateTiles } from '../tiles/tiles'

const initialState = {
	tiles: populateTiles(),
	selectedDraught: undefined,
	playerTurn: 2,
	isAbleToEatAvailable: false,
	previousSelectedDraught: undefined,
	previousMove: undefined
}

export const boardReducer = (state = initialState, payLoad) => {
	switch (payLoad.type) {
		case actionTypes.SELECT_DRAUGHT: {
			state.tiles = updateTiles(state.tiles, payLoad.tile)

			return {
				...state,
				tiles: state.tiles,
				selectedDraught: payLoad.selectedDraught,
			}
		}
		case actionTypes.HIGHLIGHT_TILE: {
			state.tiles = updateTiles(state.tiles, payLoad.tile)

			return {
				...state,
				tiles: state.tiles
			}
		}
		case actionTypes.REMOVE_DRAUGHT: {
			state.tiles = updateTiles(state.tiles, payLoad.tile)

			return {
				...state,
				tiles: state.tiles
			}
		}
		case actionTypes.MOVE_DRAUGHT: {
			state.tiles = updateTiles(state.tiles, payLoad.tile)

			return {
				...state,
				tiles: state.tiles,
				selectedDraught: undefined,
				playerTurn: payLoad.playerTurn,
				isAbleToEatAvailable: payLoad.isAbleToEatAvailable,
				previousSelectedDraught: payLoad.previousSelectedDraught,
				previousMove: payLoad.previousMove
			}
		}
		default:
			return state
	}
}
