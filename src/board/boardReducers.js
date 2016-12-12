import * as actionTypes from './boardActionTypes'

const populateTiles = () => {
	let tiles = []
	let evenTile = false, id = 0, hasDraught, player

	for (let y = 0; y < 11; y++) {
		evenTile = !evenTile
		if (y < 3) {
			hasDraught = true
			player = 1
		} else if (y > 7) {
			hasDraught = true
			player = 2
		} else {
			hasDraught = false
			player = 0
		}

		for (let x = 0; x < 11; x++) {
			let tile = {}
			// eslint-disable-next-line
			if (x % 2 == evenTile) {
				Object.assign(tile, {allowDraughts: false, hasDraught: false, player: undefined, selected: false, 
					highlighted: false, isEnemyHighlighted: false, isQueen: false, id: id++})
			} else {
				Object.assign(tile, {allowDraughts: true, hasDraught: hasDraught, player: player, selected: false, 
					highlighted: false, isEnemyHighlighted: false, isQueen: false, id: id++})
			}
			tiles.push(tile)
		}
	}
	return tiles
}

const initialState = {
	tiles: populateTiles(),
	highlighted: false,
	selectedId: 0,
	playerTurn: 2
}

export const draughtReducer = (state = initialState, payLoad) => {
	switch (payLoad.type) {
		case actionTypes.SELECT_DRAUGHT: {
			return {
				...state,
				tiles: payLoad.tiles,
				selectedId: payLoad.selectedId
			}
		}
		case actionTypes.MOVE_DRAUGHT: {
			return {
				...state,
				tiles: payLoad.tiles,
				selectedId: payLoad.selectedId,
				playerTurn: payLoad.playerTurn
			}
		}
		default:
			return state
	}
}