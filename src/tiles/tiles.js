import { OrderedMap, fromJS } from 'immutable'

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

export const populateTiles = () => {
	let tiles = OrderedMap(), evenTile = false, id = 0

	for (let y = 0; y < 11; y++) {
		evenTile = !evenTile

		for (let x = 0; x < 11; x++) {
			let tile
			// eslint-disable-next-line
			if (x % 2 == evenTile) {
				tile = fromJS({allowDraught: false, hasDraught: false, player: undefined, isSelected: false,
					isHighlighted: false, isEnemy: false, isQueen: false, isAbleToEat: false, topLeftTile: undefined, topRightTile: undefined, bottomLeftTile: undefined, bottomRightTile: undefined, x: x, y: y, id: id})
			} else {
				tile = fromJS({allowDraught: true, hasDraught: (y < 3 || y > 7) ? true : false, player: (y < 3) ? 1 : (y > 7) ? 2 : undefined, isSelected: false,
					isHighlighted: false, isEnemy: false, isQueen: false, isAbleToEat: false, topLeftTile: undefined, topRightTile: undefined, bottomLeftTile: undefined, bottomRightTile: undefined, x: x, y: y, id: id})
			}
			tiles = tiles.set(id++, tile)
		}
	}

	tiles = updateTiles(tiles, undefined)
	return tiles
}
