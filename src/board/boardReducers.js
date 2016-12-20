import * as actionTypes from './boardActionTypes'
import { OrderedMap, fromJS } from 'immutable'

const updateAdjacentTiles = (tiles) => {
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
					highlighted: false, isEnemy: false, isQueen: false, topLeftTile: undefined, topRightTile: undefined, bottomLeftTile: undefined, bottomRightTile: undefined, x: x, y: y, id: id})
			} else {
				tile = fromJS({allowDraughts: true, hasDraught: hasDraught, player: player, selected: false,
					highlighted: false, isEnemy: false, isQueen: false, topLeftTile: undefined, topRightTile: undefined, bottomLeftTile: undefined, bottomRightTile: undefined, x: x, y: y, id: id})
			}
			tiles = tiles.set(id++, tile)
		}
	}

	// we cant do recursion since it goes against the immutability principle; need to figure out other methods than this shit
	tiles = updateAdjacentTiles(tiles)
	tiles = updateAdjacentTiles(tiles)
	tiles = updateAdjacentTiles(tiles)

	return tiles
}

const initialState = {
	tiles: populateTiles(),
	selectedDraught: undefined,
	playerTurn: 2
}

export const draughtReducer = (state = initialState, payLoad) => {
	switch (payLoad.type) {
		case actionTypes.SELECT_DRAUGHT: {
			if (payLoad.formerSelectedDraught !== undefined) {
				state.tiles = state.tiles.set(payLoad.formerSelectedDraught.get('id'), payLoad.formerSelectedDraught)
				state.tiles = state.tiles.set(payLoad.formerSelectedDraught.getIn(['topLeftTile', 'id']), payLoad.formerSelectedDraught.get('topLeftTile'))
				state.tiles = state.tiles.set(payLoad.formerSelectedDraught.getIn(['topRightTile', 'id']), payLoad.formerSelectedDraught.get('topRightTile'))
				state.tiles = state.tiles.set(payLoad.formerSelectedDraught.getIn(['bottomLeftTile', 'id']), payLoad.formerSelectedDraught.get('bottomLeftTile'))
				state.tiles = state.tiles.set(payLoad.formerSelectedDraught.getIn(['bottomRightTile', 'id']), payLoad.formerSelectedDraught.get('bottomRightTile'))
			}

			state.tiles = state.tiles.set(payLoad.tile.get('id'), payLoad.tile)
			state.tiles = state.tiles.set(payLoad.tile.getIn(['topLeftTile', 'id']), payLoad.tile.get('topLeftTile'))
			state.tiles = state.tiles.set(payLoad.tile.getIn(['topRightTile', 'id']), payLoad.tile.get('topRightTile'))
			state.tiles = state.tiles.set(payLoad.tile.getIn(['bottomLeftTile', 'id']), payLoad.tile.get('bottomLeftTile'))
			state.tiles = state.tiles.set(payLoad.tile.getIn(['bottomRightTile', 'id']), payLoad.tile.get('bottomRightTile'))

			return {
				...state,
				tiles: state.tiles,
				selectedDraught: payLoad.selectedDraught
			}
		}
		case actionTypes.MOVE_DRAUGHT: {
			state.tiles = state.tiles.set(payLoad.selectedDraught.get('id'), payLoad.selectedDraught)
			state.tiles = state.tiles.set(payLoad.selectedDraught.getIn(['topLeftTile', 'id']), payLoad.selectedDraught.get('topLeftTile'))
			state.tiles = state.tiles.set(payLoad.selectedDraught.getIn(['topRightTile', 'id']), payLoad.selectedDraught.get('topRightTile'))
			state.tiles = state.tiles.set(payLoad.selectedDraught.getIn(['bottomLeftTile', 'id']), payLoad.selectedDraught.get('bottomLeftTile'))
			state.tiles = state.tiles.set(payLoad.selectedDraught.getIn(['bottomRightTile', 'id']), payLoad.selectedDraught.get('bottomRightTile'))

			state.tiles = state.tiles.set(payLoad.tile.get('id'), payLoad.tile)

			return {
				...state,
				tiles: state.tiles,
				selectedDraught: undefined,
				playerTurn: payLoad.playerTurn
			}
		}
		default:
			return state
	}
}
