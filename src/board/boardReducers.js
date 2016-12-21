import * as actionTypes from './boardActionTypes'
import { OrderedMap, fromJS } from 'immutable'

const updateAdjacentTiles = (tiles) => {
	tiles = tiles.map((tile) => {
			const topLeftTile = tiles.find((adjacentTile) => adjacentTile != undefined && tile != undefined && adjacentTile.get('x') === tile.get('x') - 1 && adjacentTile.get('y') === tile.get('y') - 1)
			const topRightTile = tiles.find((adjacentTile) => adjacentTile != undefined && tile != undefined && adjacentTile.get('x') === tile.get('x') + 1 && adjacentTile.get('y') === tile.get('y') - 1)
			const bottomLeftTile = tiles.find((adjacentTile) => adjacentTile != undefined && tile != undefined && adjacentTile.get('x') === tile.get('x') - 1 && adjacentTile.get('y') === tile.get('y') + 1)
			const bottomRightTile = tiles.find((adjacentTile) => adjacentTile != undefined && tile != undefined && adjacentTile.get('x') === tile.get('x') + 1 && adjacentTile.get('y') === tile.get('y') + 1)

			if (tile != undefined)
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
			/*if (payLoad.formerSelectedDraught !== undefined) {
				state.tiles = state.tiles.set(payLoad.formerSelectedDraught.get('id'), payLoad.formerSelectedDraught)
				if (payLoad.formerSelectedDraught.get('topLeftTile') != undefined)
					state.tiles = state.tiles.set(payLoad.formerSelectedDraught.getIn(['topLeftTile', 'id']), payLoad.formerSelectedDraught.get('topLeftTile'))
				if (payLoad.formerSelectedDraught.getIn(['topLeftTile', 'topLeftTile']) != undefined)
				state.tiles = state.tiles.set(payLoad.formerSelectedDraught.getIn(['topLeftTile', 'topLeftTile', 'id']), payLoad.formerSelectedDraught.getIn(['topLeftTile', 'topLeftTile']))
				if (payLoad.formerSelectedDraught.get('topRightTile') != undefined)
				state.tiles = state.tiles.set(payLoad.formerSelectedDraught.getIn(['topRightTile', 'id']), payLoad.formerSelectedDraught.get('topRightTile'))
				if (payLoad.formerSelectedDraught.getIn(['topRightTile', 'topRightTile']) != undefined)
				state.tiles = state.tiles.set(payLoad.formerSelectedDraught.getIn(['topRightTile', 'topRightTile', 'id']), payLoad.formerSelectedDraught.getIn(['topRightTile', 'topRightTile']))
				if (payLoad.formerSelectedDraught.get('bottomLeftTile') != undefined)
				state.tiles = state.tiles.set(payLoad.formerSelectedDraught.getIn(['bottomLeftTile', 'id']), payLoad.formerSelectedDraught.get('bottomLeftTile'))
				if (payLoad.formerSelectedDraught.getIn(['bottomLeftTile', 'bottomLeftTile']) != undefined)
				state.tiles = state.tiles.set(payLoad.formerSelectedDraught.getIn(['bottomLeftTile', 'bottomLeftTile', 'id']), payLoad.formerSelectedDraught.getIn(['bottomLeftTile', 'bottomLeftTile']))
				if (payLoad.formerSelectedDraught.get('bottomRightTile') != undefined)
				state.tiles = state.tiles.set(payLoad.formerSelectedDraught.getIn(['bottomRightTile', 'id']), payLoad.formerSelectedDraught.get('bottomRightTile'))
				if (payLoad.formerSelectedDraught.getIn(['bottomRightTile', 'bottomRightTile']) != undefined)
				state.tiles = state.tiles.set(payLoad.formerSelectedDraught.getIn(['bottomRightTile', 'bottomRightTile', 'id']), payLoad.formerSelectedDraught.getIn(['bottomRightTile', 'bottomRightTile']))
			}*/

			state.tiles = state.tiles.set(payLoad.tile.get('id'), payLoad.tile)
			if (payLoad.tile.get('topLeftTile') != undefined)
			state.tiles = state.tiles.set(payLoad.tile.getIn(['topLeftTile', 'id']), payLoad.tile.get('topLeftTile'))
			if (payLoad.tile.getIn(['topLeftTile', 'topLeftTile']) != undefined)
			state.tiles = state.tiles.set(payLoad.tile.getIn(['topLeftTile', 'topLeftTile', 'id']), payLoad.tile.getIn(['topLeftTile', 'topLeftTile']))
			if (payLoad.tile.get('topRightTile') != undefined)
			state.tiles = state.tiles.set(payLoad.tile.getIn(['topRightTile', 'id']), payLoad.tile.get('topRightTile'))
			if (payLoad.tile.getIn(['topRightTile', 'topRightTile']) != undefined)
			state.tiles = state.tiles.set(payLoad.tile.getIn(['topRightTile', 'topRightTile', 'id']), payLoad.tile.getIn(['topRightTile', 'topRightTile']))
			if (payLoad.tile.get('bottomLeftTile') != undefined)
			state.tiles = state.tiles.set(payLoad.tile.getIn(['bottomLeftTile', 'id']), payLoad.tile.get('bottomLeftTile'))
			if (payLoad.tile.getIn(['bottomLeftTile', 'bottomLeftTile']) != undefined)
			state.tiles = state.tiles.set(payLoad.tile.getIn(['bottomLeftTile', 'bottomLeftTile', 'id']), payLoad.tile.getIn(['bottomLeftTile', 'bottomLeftTile']))
			if (payLoad.tile.get('bottomRightTile') != undefined)
			state.tiles = state.tiles.set(payLoad.tile.getIn(['bottomRightTile', 'id']), payLoad.tile.get('bottomRightTile'))
			if (payLoad.tile.getIn(['bottomRightTile', 'bottomRightTile']) != undefined)
			state.tiles = state.tiles.set(payLoad.tile.getIn(['bottomRightTile', 'bottomRightTile', 'id']), payLoad.tile.getIn(['bottomRightTile', 'bottomRightTile']))

			state.tiles = updateAdjacentTiles(state.tiles)

			return {
				...state,
				tiles: state.tiles,
				selectedDraught: payLoad.selectedDraught
			}
		}
		case actionTypes.MOVE_DRAUGHT: {
			if (payLoad.selectedDraught != undefined) {
				state.tiles = state.tiles.set(payLoad.selectedDraught.get('id'), payLoad.selectedDraught)
				if (payLoad.selectedDraught.get('topLeftTile') != undefined)
				state.tiles = state.tiles.set(payLoad.selectedDraught.getIn(['topLeftTile', 'id']), payLoad.selectedDraught.get('topLeftTile'))
				if (payLoad.selectedDraught.getIn(['topLeftTile', 'topLeftTile']) != undefined)
				state.tiles = state.tiles.set(payLoad.selectedDraught.getIn(['topLeftTile', 'topLeftTile', 'id']), payLoad.selectedDraught.getIn(['topLeftTile', 'topLeftTile']))
				if (payLoad.selectedDraught.get('topRightTile') != undefined)
				state.tiles = state.tiles.set(payLoad.selectedDraught.getIn(['topRightTile', 'id']), payLoad.selectedDraught.get('topRightTile'))
				if (payLoad.selectedDraught.getIn(['topRightTile', 'topRightTile']) != undefined)
				state.tiles = state.tiles.set(payLoad.selectedDraught.getIn(['topRightTile', 'topRightTile', 'id']), payLoad.selectedDraught.getIn(['topRightTile', 'topRightTile']))
				if (payLoad.selectedDraught.get('bottomLeftTile') != undefined)
				state.tiles = state.tiles.set(payLoad.selectedDraught.getIn(['bottomLeftTile', 'id']), payLoad.selectedDraught.get('bottomLeftTile'))
				if (payLoad.selectedDraught.getIn(['bottomLeftTile', 'bottomLeftTile']) != undefined)
				state.tiles = state.tiles.set(payLoad.selectedDraught.getIn(['bottomLeftTile', 'bottomLeftTile', 'id']), payLoad.selectedDraught.getIn(['bottomLeftTile', 'bottomLeftTile']))
				if (payLoad.selectedDraught.get('bottomRightTile') != undefined)
				state.tiles = state.tiles.set(payLoad.selectedDraught.getIn(['bottomRightTile', 'id']), payLoad.selectedDraught.get('bottomRightTile'))
				if (payLoad.selectedDraught.getIn(['bottomRightTile', 'bottomRightTile']) != undefined)
				state.tiles = state.tiles.set(payLoad.selectedDraught.getIn(['bottomRightTile', 'bottomRightTile', 'id']), payLoad.selectedDraught.getIn(['bottomRightTile', 'bottomRightTile']))
			}

			if (payLoad.formerSelectedDraught !== undefined) {
				state.tiles = state.tiles.set(payLoad.formerSelectedDraught.get('id'), payLoad.formerSelectedDraught)
				if (payLoad.formerSelectedDraught.get('topLeftTile') != undefined)
					state.tiles = state.tiles.set(payLoad.formerSelectedDraught.getIn(['topLeftTile', 'id']), payLoad.formerSelectedDraught.get('topLeftTile'))
				if (payLoad.formerSelectedDraught.getIn(['topLeftTile', 'topLeftTile']) != undefined)
				state.tiles = state.tiles.set(payLoad.formerSelectedDraught.getIn(['topLeftTile', 'topLeftTile', 'id']), payLoad.formerSelectedDraught.getIn(['topLeftTile', 'topLeftTile']))
				if (payLoad.formerSelectedDraught.get('topRightTile') != undefined)
				state.tiles = state.tiles.set(payLoad.formerSelectedDraught.getIn(['topRightTile', 'id']), payLoad.formerSelectedDraught.get('topRightTile'))
				if (payLoad.formerSelectedDraught.getIn(['topRightTile', 'topRightTile']) != undefined)
				state.tiles = state.tiles.set(payLoad.formerSelectedDraught.getIn(['topRightTile', 'topRightTile', 'id']), payLoad.formerSelectedDraught.getIn(['topRightTile', 'topRightTile']))
				if (payLoad.formerSelectedDraught.get('bottomLeftTile') != undefined)
				state.tiles = state.tiles.set(payLoad.formerSelectedDraught.getIn(['bottomLeftTile', 'id']), payLoad.formerSelectedDraught.get('bottomLeftTile'))
				if (payLoad.formerSelectedDraught.getIn(['bottomLeftTile', 'bottomLeftTile']) != undefined)
				state.tiles = state.tiles.set(payLoad.formerSelectedDraught.getIn(['bottomLeftTile', 'bottomLeftTile', 'id']), payLoad.formerSelectedDraught.getIn(['bottomLeftTile', 'bottomLeftTile']))
				if (payLoad.formerSelectedDraught.get('bottomRightTile') != undefined)
				state.tiles = state.tiles.set(payLoad.formerSelectedDraught.getIn(['bottomRightTile', 'id']), payLoad.formerSelectedDraught.get('bottomRightTile'))
				if (payLoad.formerSelectedDraught.getIn(['bottomRightTile', 'bottomRightTile']) != undefined)
				state.tiles = state.tiles.set(payLoad.formerSelectedDraught.getIn(['bottomRightTile', 'bottomRightTile', 'id']), payLoad.formerSelectedDraught.getIn(['bottomRightTile', 'bottomRightTile']))
			}

			state.tiles = state.tiles.set(payLoad.tile.get('id'), payLoad.tile)

			/*if (payLoad.tile.get('topLeftTile') != undefined)
			state.tiles = state.tiles.set(payLoad.tile.getIn(['topLeftTile', 'id']), payLoad.tile.get('topLeftTile'))
			if (payLoad.tile.getIn(['topLeftTile', 'topLeftTile']) != undefined)
			state.tiles = state.tiles.set(payLoad.tile.getIn(['topLeftTile', 'topLeftTile', 'id']), payLoad.tile.getIn(['topLeftTile', 'topLeftTile']))
			if (payLoad.tile.get('topRightTile') != undefined)
			state.tiles = state.tiles.set(payLoad.tile.getIn(['topRightTile', 'id']), payLoad.tile.get('topRightTile'))
			if (payLoad.tile.getIn(['topRightTile', 'topRightTile']) != undefined)
			state.tiles = state.tiles.set(payLoad.tile.getIn(['topRightTile', 'topRightTile', 'id']), payLoad.tile.getIn(['topRightTile', 'topRightTile']))
			if (payLoad.tile.get('bottomLeftTile') != undefined)
			state.tiles = state.tiles.set(payLoad.tile.getIn(['bottomLeftTile', 'id']), payLoad.tile.get('bottomLeftTile'))
			if (payLoad.tile.getIn(['bottomLeftTile', 'bottomLeftTile']) != undefined)
			state.tiles = state.tiles.set(payLoad.tile.getIn(['bottomLeftTile', 'bottomLeftTile', 'id']), payLoad.tile.getIn(['bottomLeftTile', 'bottomLeftTile']))
			if (payLoad.tile.get('bottomRightTile') != undefined)
			state.tiles = state.tiles.set(payLoad.tile.getIn(['bottomRightTile', 'id']), payLoad.tile.get('bottomRightTile'))
			if (payLoad.tile.getIn(['bottomRightTile', 'bottomRightTile']) != undefined)
			state.tiles = state.tiles.set(payLoad.tile.getIn(['bottomRightTile', 'bottomRightTile', 'id']), payLoad.tile.getIn(['bottomRightTile', 'bottomRightTile']))*/

			state.tiles = updateAdjacentTiles(state.tiles)

			return {
				...state,
				tiles: state.tiles,
				selectedDraught: payLoad.selectedDraught,
				playerTurn: payLoad.playerTurn
			}
		}
		default:
			return state
	}
}
