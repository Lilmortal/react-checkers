import { fromJS, OrderedMap } from 'immutable'

const getTileNeighbourHighlightsToggled = (neighbourTilesToBeUpdated, tiles, tile, playerTurn, tileNeighbour) => {
	const enemyPlayer = playerTurn === 1 ? 2 : 1
	const draught = tile.get('draught')
	if (draught && draught.get('player') === enemyPlayer && tileNeighbour && !tileNeighbour.get('hasDraught')) {
		tile = tile.set('isEnemy', !tile.get('isEnemy'))
		tileNeighbour = tileNeighbour.set('isHighlighted', !tileNeighbour.get('isHighlighted'))
		neighbourTilesToBeUpdated.push({id: tile.get('id'), tile: tile, isEnemy: true })
		neighbourTilesToBeUpdated.push({id: tileNeighbour.get('id'), tile: tileNeighbour, isEnemy: true })
	}

	if (!tile.get('hasDraught')) {
		tile = tile.set('isHighlighted', !tile.get('isHighlighted'))
		neighbourTilesToBeUpdated.push({id: tile.get('id'), tile: tile, isEnemy: false })
	}
	return neighbourTilesToBeUpdated
}

/**
 * Toggle tile neighbours highlights.
 * @param  {Object} tiles      List of tiles.
 * @param  {Object} tile       The tile that will have it's neighbours highlights toggled.
 * @param  {Number} playerTurn Current player turn.
 * @return {Array}            A list of tiles that have its highlight state changed.
 */
export const getTileNeighboursHighlightsToggled = (tiles, tile, playerTurn) => {
	const draught = tile.get('draught')
	let topLeftTile = tiles.get(tile.get('topLeftTileId'))
	let topRightTile = tiles.get(tile.get('topRightTileId'))
	let bottomLeftTile = tiles.get(tile.get('bottomLeftTileId'))
	let bottomRightTile = tiles.get(tile.get('bottomRightTileId'))

	let neighbourTilesToBeUpdated = []
	if (draught.get('player') === 1 || draught.get('isQueen')) {
		if (bottomLeftTile !== undefined) {
			const tileNeighbour = tiles.get(bottomLeftTile.get('bottomLeftTileId'))
			neighbourTilesToBeUpdated = getTileNeighbourHighlightsToggled(neighbourTilesToBeUpdated, tiles, bottomLeftTile, playerTurn, tileNeighbour)
		}

		if (bottomRightTile !== undefined) {
			const tileNeighbour = tiles.get(bottomRightTile.get('bottomRightTileId'))
			neighbourTilesToBeUpdated = getTileNeighbourHighlightsToggled(neighbourTilesToBeUpdated, tiles, bottomRightTile, playerTurn, tileNeighbour)
		}
	}

	if (draught.get('player') === 2 || draught.get('isQueen')) {
		if (topLeftTile !== undefined) {
			const tileNeighbour = tiles.get(topLeftTile.get('topLeftTileId'))
			neighbourTilesToBeUpdated = getTileNeighbourHighlightsToggled(neighbourTilesToBeUpdated, tiles, topLeftTile, playerTurn, tileNeighbour)
		}

		if (topRightTile !== undefined) {
			const tileNeighbour = tiles.get(topRightTile.get('topRightTileId'))
			neighbourTilesToBeUpdated = getTileNeighbourHighlightsToggled(neighbourTilesToBeUpdated, tiles, topRightTile, playerTurn, tileNeighbour)
		}
	}

	const hasEnemy = neighbourTilesToBeUpdated.find(neighbourTile => {
		return neighbourTile.isEnemy
	})

	if (hasEnemy) {
		neighbourTilesToBeUpdated = neighbourTilesToBeUpdated.filter(neighbourTile => {
			return neighbourTile.isEnemy
		})
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
			// eslint-disable-next-line
			const allowDraught = (x % 2 != evenTile) ? true : false
			const hasDraught = (y < 3 || y > 7) && allowDraught ? true : false
			const player = (y < 3) ? 1 : (y > 7) ? 2 : undefined

      const topLeftTileId = (id - 12 >= 0) && (id - 12 <= TOTAL_TILES) && x !== 0 ? id - 12 : undefined
      const topRightTileId = (id - 10 >= 0) && (id - 10 <= TOTAL_TILES) && x !== BOARD_WIDTH - 1 ? id - 10 : undefined
      const bottomLeftTileId = (id + 10 >= 0) && (id + 10 <= TOTAL_TILES) && x !== 0 ? id + 10 : undefined
      const bottomRightTileId = (id + 12 >= 0) && (id + 12 <= TOTAL_TILES) && x !== BOARD_WIDTH - 1 ? id + 12 : undefined

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
