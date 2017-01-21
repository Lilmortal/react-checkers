import React from 'react'
import Draught from '../../draught/components/draught'
import { OrderedMap, fromJS } from 'immutable'
import { startSelectDraught } from '../ducks/tile'

/**
 * A list of neighbours that this tile have; it also includes what the opposite tile of this neighbour is and the player that is allowed to work with this neighbour
 * @type {Object}
 */
export const NEIGHBOUR_TILES = {
	topLeftTile: {
		oppositeTile: 'bottomRightTile',
		player: 2
	},
	topRightTile: {
		oppositeTile: 'bottomLeftTile',
		player: 2
	},
	bottomLeftTile: {
		oppositeTile: 'topRightTile',
		player: 1
	},
	bottomRightTile: {
		oppositeTile: 'topLeftTile',
		player: 1
	}
}

/**
 * Update the tiles with the updated tile
 * @param  {Object} tiles The list of tiles
 * @param  {Object} tile  The updated tile that will be incorporated into the tiles
 * @return {Object}       The updated tiles
 */
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
		const topLeftTile = tiles.find((neighbour) => neighbour.get('x') === tile.get('x') - 1 && neighbour.get('y') === tile.get('y') - 1)
		const topRightTile = tiles.find((neighbour) => neighbour.get('x') === tile.get('x') + 1 && neighbour.get('y') === tile.get('y') - 1)
		const bottomLeftTile = tiles.find((neighbour) => neighbour.get('x') === tile.get('x') - 1 && neighbour.get('y') === tile.get('y') + 1)
		const bottomRightTile = tiles.find((neighbour) => neighbour.get('x') === tile.get('x') + 1 && neighbour.get('y') === tile.get('y') + 1)
		tile = tile.withMutations((mutatedTile) => mutatedTile.set('topLeftTile', topLeftTile).set('topRightTile', topRightTile)
		.set('bottomLeftTile', bottomLeftTile).set('bottomRightTile', bottomRightTile))
		return tile
	})

	return tiles
}

/**
 * Populate the default tiles
 * @return {Object} The updated tiles
 */
export const populateTiles = () => {
	let tiles = OrderedMap(), evenTile = false, id = 0

	for (let y = 0; y < 11; y++) {
		evenTile = !evenTile

		for (let x = 0; x < 11; x++) {
			let tile
			// eslint-disable-next-line
			if (x % 2 == evenTile) {
				tile = fromJS({allowDraught: false, hasDraught: false, player: undefined, isSelected: false,
					isHighlighted: false, isEnemy: false, isQueen: false, isAbleToEat: false, topLeftTile: undefined,
          topRightTile: undefined, bottomLeftTile: undefined, bottomRightTile: undefined, x: x, y: y, id: id, draught: undefined})
			} else {
        const hasDraught = (y < 3 || y > 7) ? true : false
				const player = (y < 3) ? 1 : (y > 7) ? 2 : undefined
				tile = fromJS({allowDraught: true, hasDraught: hasDraught, player: player, isSelected: false,
					isHighlighted: false, isEnemy: false, isQueen: false, isAbleToEat: false, topLeftTile: undefined,
          topRightTile: undefined, bottomLeftTile: undefined, bottomRightTile: undefined, x: x, y: y, id: id})

        const draught = hasDraught ?
        <Draught
				isSelected={false}
				player={player}
				playerTurn={2}
				isQueen={false}
				isAbleToEat={false}
				isAbleToEatAvailable={false}
				startSelectDraught={startSelectDraught} /> : undefined

        tile = tile.set(draught, draught)
			}
			tiles = tiles.set(id++, tile)
		}
	}

	tiles = updateTiles(tiles, undefined)
	return tiles
}
