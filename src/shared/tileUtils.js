import { fromJS, OrderedMap } from 'immutable'

const getTileNeighbourHighlightsToggled = (neighbourTilesToBeUpdated, tiles, tile, playerTurn, id) => {
	const enemyPlayer = playerTurn === 1 ? 2 : 1
	let tileNeighbour = tiles.get(tile.get(id))
	if (tile.get('hasDraught') && tile.get('player') === enemyPlayer && !tileNeighbour.get('hasDraught')) {
		tile = tile.set('isEnemy', !tile.get('isEnemy'))
		tileNeighbour = tileNeighbour.set('isHighlighted', !tileNeighbour.get('isHighlighted'))
		neighbourTilesToBeUpdated.push({id: tile.get('id'), tile: tile})
		neighbourTilesToBeUpdated.push({id: tileNeighbour.get('id'), tile: tileNeighbour})
	}

	if (!tile.get('hasDraught')) {
		tile = tile.set('isHighlighted', !tile.get('isHighlighted'))
		neighbourTilesToBeUpdated.push({id: tile.get('id'), tile: tile})
	}
	return neighbourTilesToBeUpdated
}

export const getTileNeighboursHighlightsToggled = (tiles, tile, playerTurn) => {
	const draught = tile.get('draught')
	let topLeftTile = tiles.get(tile.get('topLeftTileId'))
	let topRightTile = tiles.get(tile.get('topRightTileId'))
	let bottomLeftTile = tiles.get(tile.get('bottomLeftTileId'))
	let bottomRightTile = tiles.get(tile.get('bottomRightTileId'))

	let neighbourTilesToBeUpdated = []
	if (draught.get('player') === 1 || draught.get('isQueen')) {
		if (bottomLeftTile !== undefined) {
			neighbourTilesToBeUpdated = getTileNeighbourHighlightsToggled(neighbourTilesToBeUpdated, tiles, bottomLeftTile, playerTurn, 'bottomLeftTileId')
		}

		if (bottomRightTile !== undefined) {
			neighbourTilesToBeUpdated = getTileNeighbourHighlightsToggled(neighbourTilesToBeUpdated, tiles, bottomRightTile, playerTurn, 'bottomRightTileId')
		}
	}

	if (draught.get('player') === 2 || draught.get('isQueen')) {
		if (topLeftTile !== undefined) {
			neighbourTilesToBeUpdated = getTileNeighbourHighlightsToggled(neighbourTilesToBeUpdated, tiles, topLeftTile, playerTurn, 'topLeftTileId')
		}

		if (topRightTile !== undefined) {
			neighbourTilesToBeUpdated = getTileNeighbourHighlightsToggled(neighbourTilesToBeUpdated, tiles, topRightTile, playerTurn, 'topRightTileId')
		}
	}
	return neighbourTilesToBeUpdated
}

/**
 * Populate the default tiles
 * @return {Object} The updated tiles
 */
export const populateTiles = () => {
	let tiles = OrderedMap(), evenTile = false, id = 0
	const BOARD_WIDTH = 11
	const BOARD_HEIGHT = 11
  const TOTAL_TILES = BOARD_WIDTH * BOARD_HEIGHT

	for (let y = 0; y < BOARD_HEIGHT; y++) {
		evenTile = !evenTile

		for (let x = 0; x < BOARD_WIDTH; x++) {
			const allowDraught = (x % 2 != evenTile) ? true : false
			const hasDraught = (y < 3 || y > 7) && allowDraught ? true : false
			const player = (y < 3) ? 1 : (y > 7) ? 2 : undefined

      const topLeftTileId = (id - 12 >= 0) && (id - 12 <= TOTAL_TILES) ? id - 12 : undefined
      const topRightTileId = (id - 10 >= 0) && (id - 10 <= TOTAL_TILES) ? id - 10 : undefined
      const bottomLeftTileId = (id + 10 >= 0) && (id + 10 <= TOTAL_TILES) ? id + 10 : undefined
      const bottomRightTileId = (id + 12 >= 0) && (id + 12 <= TOTAL_TILES) ? id + 12 : undefined

			const draught = hasDraught ? fromJS({
				id: id,
				isSelected: false,
				player: player,
				isQueen: false,
				canSelectDraught: player === 2 ? true : false
			}) : undefined

			const tile = fromJS({
				id: id,
				allowDraught: allowDraught,
				hasDraught: hasDraught,
				isHighlighted: false,
				isEnemy: false,
				isAbleToEat: false,
				topLeftTileId: topLeftTileId,
        topRightTileId: topRightTileId,
				bottomLeftTileId: bottomLeftTileId,
				bottomRightTileId: bottomRightTileId,
				x: x,
				y: y,
				draught: draught
			})

			tiles = tiles.set(id++, tile)
		}
	}

	return tiles
}
