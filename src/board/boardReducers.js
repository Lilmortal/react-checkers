import * as actionTypes from './boardActionTypes'
import { OrderedMap, fromJS } from 'immutable'

export const updateAdjacentTiles = (tiles) => {
	tiles = tiles.map((tile) => {
			if (tile !== undefined) {
				const topLeftTile = tiles.find((adjacentTile) => adjacentTile !== undefined && adjacentTile.get('x') === tile.get('x') - 1 && adjacentTile.get('y') === tile.get('y') - 1)
				const topRightTile = tiles.find((adjacentTile) => adjacentTile !== undefined && adjacentTile.get('x') === tile.get('x') + 1 && adjacentTile.get('y') === tile.get('y') - 1)
				const bottomLeftTile = tiles.find((adjacentTile) => adjacentTile !== undefined && adjacentTile.get('x') === tile.get('x') - 1 && adjacentTile.get('y') === tile.get('y') + 1)
				const bottomRightTile = tiles.find((adjacentTile) => adjacentTile !== undefined && adjacentTile.get('x') === tile.get('x') + 1 && adjacentTile.get('y') === tile.get('y') + 1)
				tile = tile.withMutations((mutatedTile) => mutatedTile.set('topLeftTile', topLeftTile).set('topRightTile', topRightTile)
				.set('bottomLeftTile', bottomLeftTile).set('bottomRightTile', bottomRightTile))
			}
			return tile
	})

	return tiles
}

const updateTiles = (tiles, tile) => {
	tiles = tiles.set(tile.get('id'), tile)
	if (tile.get('topLeftTile') !== undefined) {
		tile = tile.setIn(['topLeftTile', 'bottomRightTile'], tile)
		tiles = tiles.set(tile.getIn(['topLeftTile', 'id']), tile.get('topLeftTile'))
	}
	if (tile.getIn(['topLeftTile', 'topLeftTile']) !== undefined) {
		tile = tile.setIn(['topLeftTile', 'topLeftTile', 'bottomRightTile'], tile.get('topLeftTile'))
		tiles = tiles.set(tile.getIn(['topLeftTile', 'topLeftTile', 'id']), tile.getIn(['topLeftTile', 'topLeftTile']))
	}
	if (tile.get('topRightTile') !== undefined) {
		tile = tile.setIn(['topRightTile', 'bottomLeftTile'], tile)
		tiles = tiles.set(tile.getIn(['topRightTile', 'id']), tile.get('topRightTile'))
	}
	if (tile.getIn(['topRightTile', 'topRightTile']) !== undefined) {
		tile = tile.setIn(['topRightTile', 'topRightTile', 'bottomLeftTile'], tile.get('topRightTile'))
		tiles = tiles.set(tile.getIn(['topRightTile', 'topRightTile', 'id']), tile.getIn(['topRightTile', 'topRightTile']))
	}
	if (tile.get('bottomLeftTile') !== undefined) {
		tile = tile.setIn(['bottomLeftTile', 'topRightTile'], tile)
		tiles = tiles.set(tile.getIn(['bottomLeftTile', 'id']), tile.get('bottomLeftTile'))
	}
	if (tile.getIn(['bottomLeftTile', 'bottomLeftTile']) !== undefined) {
		tile = tile.setIn(['bottomLeftTile', 'bottomLeftTile', 'topRightTile'], tile.get('bottomLeftTile'))
		tiles = tiles.set(tile.getIn(['bottomLeftTile', 'bottomLeftTile', 'id']), tile.getIn(['bottomLeftTile', 'bottomLeftTile']))
	}
	if (tile.get('bottomRightTile') !== undefined) {
		tile = tile.setIn(['bottomRightTile', 'topLeftTile'], tile)
		tiles = tiles.set(tile.getIn(['bottomRightTile', 'id']), tile.get('bottomRightTile'))
	}
	if (tile.getIn(['bottomRightTile', 'bottomRightTile']) !== undefined) {
		tile = tile.setIn(['bottomRightTile', 'bottomRightTile', 'topLeftTile'], tile.get('bottomRightTile'))
		tiles = tiles.set(tile.getIn(['bottomRightTile', 'bottomRightTile', 'id']), tile.getIn(['bottomRightTile', 'bottomRightTile']))
	}

	return tiles
}

const populateTiles = () => {
	let tiles = OrderedMap()
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
			let tile
			// eslint-disable-next-line
			if (x % 2 == evenTile) {
				tile = fromJS({allowDraughts: false, hasDraught: false, player: undefined, selected: false,
					highlighted: false, isEnemy: false, isQueen: false, needToEat: false, topLeftTile: undefined, topRightTile: undefined, bottomLeftTile: undefined, bottomRightTile: undefined, x: x, y: y, id: id})
			} else {
				tile = fromJS({allowDraughts: true, hasDraught: hasDraught, player: player, selected: false,
					highlighted: false, isEnemy: false, isQueen: false, needToEat: false, topLeftTile: undefined, topRightTile: undefined, bottomLeftTile: undefined, bottomRightTile: undefined, x: x, y: y, id: id})
			}
			tiles = tiles.set(id++, tile)
		}
	}

	// we cant do recursion since it goes against the immutability principle; need to figure out other methods than this shit
	tiles = updateAdjacentTiles(tiles)

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
			state.tiles = updateAdjacentTiles(state.tiles)

			return {
				...state,
				tiles: state.tiles,
				selectedDraught: payLoad.selectedDraught,
			}
		}
		case actionTypes.HIGHLIGHT_TILE: {
			state.tiles = updateTiles(state.tiles, payLoad.tile)
			state.tiles = updateAdjacentTiles(state.tiles)

			return {
				...state,
				tiles: state.tiles
			}
		}
		case actionTypes.REMOVE_DRAUGHT: {
			state.tiles = updateTiles(state.tiles, payLoad.tile)
			state.tiles = updateAdjacentTiles(state.tiles)

			return {
				...state,
				tiles: state.tiles
			}
		}
		case actionTypes.MOVE_DRAUGHT: {
			state.tiles = updateTiles(state.tiles, payLoad.tile)
			state.tiles = updateAdjacentTiles(state.tiles)

			return {
				...state,
				tiles: state.tiles,
				selectedDraught: payLoad.selectedDraught,
				playerTurn: payLoad.playerTurn,
				compulsoryToEat: payLoad.compulsoryToEat,
				previousDraughtMove: payLoad.previousDraughtMove
			}
		}
		default:
			return state
	}
}
