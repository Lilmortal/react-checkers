import * as actionTypes from './boardActionTypes'
import { OrderedMap, fromJS } from 'immutable'
import { NEIGHBOUR_TILES } from './boardSagas'

// put this in boardActions
export const updateTiles = (tiles, tile) => {
	if (tile !== undefined) {
		tiles = tiles.set(tile.get('id'), tile)
		Object.keys(NEIGHBOUR_TILES).map((neighbour) => {
			if (tile.get(neighbour) !== undefined) {
				tile = tile.setIn([neighbour, NEIGHBOUR_TILES[neighbour].oppositeTile], tile)
				tiles = tiles.set(tile.getIn([neighbour, 'id']), tile.get(neighbour))
			}
			if (tile.getIn([neighbour, neighbour]) !== undefined) {
				tile = tile.setIn([neighbour, neighbour, NEIGHBOUR_TILES[neighbour].oppositeTile], tile.get(neighbour))
				tiles = tiles.set(tile.getIn([neighbour, neighbour, 'id']), tile.getIn([neighbour, neighbour]))
			}
			return neighbour
		})
	}

	tiles = tiles.map((tile) => {
		const topLeftTile = tiles.find((adjacentTile) => adjacentTile.get('x') === tile.get('x') - 1 && adjacentTile.get('y') === tile.get('y') - 1)
		const topRightTile = tiles.find((adjacentTile) => adjacentTile.get('x') === tile.get('x') + 1 && adjacentTile.get('y') === tile.get('y') - 1)
		const bottomLeftTile = tiles.find((adjacentTile) => adjacentTile.get('x') === tile.get('x') - 1 && adjacentTile.get('y') === tile.get('y') + 1)
		const bottomRightTile = tiles.find((adjacentTile) => adjacentTile.get('x') === tile.get('x') + 1 && adjacentTile.get('y') === tile.get('y') + 1)
		tile = tile.withMutations((mutatedTile) => mutatedTile.set('topLeftTile', topLeftTile).set('topRightTile', topRightTile)
		.set('bottomLeftTile', bottomLeftTile).set('bottomRightTile', bottomRightTile))
		return tile
	})

	return tiles
}

const populateTiles = () => {
	let tiles = OrderedMap(), evenTile = false, id = 0

	for (let y = 0; y < 11; y++) {
		evenTile = !evenTile

		for (let x = 0; x < 11; x++) {
			let tile
			// eslint-disable-next-line
			if (x % 2 == evenTile) {
				tile = fromJS({allowDraughts: false, hasDraught: false, player: undefined, selected: false,
					highlighted: false, isEnemy: false, isQueen: false, needToEat: false, topLeftTile: undefined, topRightTile: undefined, bottomLeftTile: undefined, bottomRightTile: undefined, x: x, y: y, id: id})
			} else {
				tile = fromJS({allowDraughts: true, hasDraught: (y < 3 || y > 7) ? true : false, player: (y < 3) ? 1 : (y > 7) ? 2 : 0, selected: false,
					highlighted: false, isEnemy: false, isQueen: false, needToEat: false, topLeftTile: undefined, topRightTile: undefined, bottomLeftTile: undefined, bottomRightTile: undefined, x: x, y: y, id: id})
			}
			tiles = tiles.set(id++, tile)
		}
	}

	tiles = updateTiles(tiles, undefined)
	return tiles
}

const initialState = {
	tiles: populateTiles(),
	selectedDraught: undefined,
	playerTurn: 2,
	compulsoryToEat: false,
	previousDraughtMove: undefined
}

export const draughtReducer = (state = initialState, payLoad) => {
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
				compulsoryToEat: payLoad.compulsoryToEat,
				previousDraughtMove: payLoad.previousDraughtMove
			}
		}
		default:
			return state
	}
}
