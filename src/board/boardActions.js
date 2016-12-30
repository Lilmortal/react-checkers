import * as actionTypes from './boardActionTypes'

export const NEIGHBOUR_TILES = {
	TOP_LEFT_TILE: 'topLeftTile',
	TOP_RIGHT_TILE: 'topRightTile',
	BOTTOM_LEFT_TILE: 'bottomLeftTile',
	BOTTOM_RIGHT_TILE: 'bottomRightTile'
}
/**
 * Toggle the selected draught top left tile
 * @param  {[array]} tiles      [list of tiles on the board]
 * @param  {[number]} selectedTileId         [selected tile id]
 * @param  {[bool]} highlighted [true to highlight the tiles, false to remove the highlights]
 * @param  {[number]} enemyPlayer [enemy player]
 * @return {[object]}            [updated tiles with the the selected draught top left tile highlight toggled]
 */
const toggleNeighbourTileHighlight = (tile, highlightedTile, enemyPlayer, highlighted) => {
	// check if the selected draught is not at the edge of the board
	if (tile.get(highlightedTile)) {
		// check if the selected tile is an enemy draught and there is a free tile above it
		//see if getIn returns undefined as thats 0 no need for has
		if (tile.getIn([highlightedTile, 'player']) === enemyPlayer && tile.getIn([highlightedTile, highlightedTile]) && !tile.getIn([highlightedTile, highlightedTile, 'hasDraught'])) {
			tile = tile.withMutations((tile) => tile.setIn([highlightedTile, 'isEnemy'], highlighted).setIn([highlightedTile, highlightedTile, 'highlighted'], highlighted))
			// if you can eat a draught, remove all other tile highlights because it is compulsory to eat a draught
			Object.keys(NEIGHBOUR_TILES).map((neighbourTile) => {
				if (NEIGHBOUR_TILES[neighbourTile] !== highlightedTile && tile.get(NEIGHBOUR_TILES[neighbourTile])) {
					tile = tile.withMutations((mutatedTile) => mutatedTile.setIn([highlightedTile, 'highlighted'], false).setIn([highlightedTile, 'selected'], false))
				}
			})
			// if it does not find any enemy draught, highlight this selected tile
		} else if (!tile.getIn([highlightedTile, 'hasDraught'])) {
			tile = tile.setIn([highlightedTile, 'highlighted'], highlighted)
			if (tile.getIn([highlightedTile, highlightedTile]))
				tile = tile.setIn([highlightedTile, highlightedTile, 'highlighted'], false)
		}
	}
	return tile
}

/**
 * Toggle the selected tile neighbour highlights
 * @param  {[array]} tiles      [list of tiles on the board]
 * @param  {[number]} selectedTileId         [selected tile id]
 * @param  {[bool]} highlighted [true to highlight the tiles, false to remove the highlights]
 * @param  {[number]} playerTurn [player turn]
 * @return {[object]}            [updated tiles with the the selected draught neighbours highlights toggled]
 */
export const toggleTileHighlights = (tile, playerTurn, highlighted) => {
	const enemyPlayer = playerTurn === 1 ? 2 : 1

	if (playerTurn === 1 || tile.get('isQueen')) {
		tile = toggleNeighbourTileHighlight(tile, NEIGHBOUR_TILES.BOTTOM_LEFT_TILE, enemyPlayer, highlighted)
		tile = toggleNeighbourTileHighlight(tile, NEIGHBOUR_TILES.BOTTOM_RIGHT_TILE, enemyPlayer, highlighted)
	}

	if (playerTurn === 2 || tile.get('isQueen')) {
		tile = toggleNeighbourTileHighlight(tile, NEIGHBOUR_TILES.TOP_LEFT_TILE, enemyPlayer, highlighted)
		tile = toggleNeighbourTileHighlight(tile, NEIGHBOUR_TILES.TOP_RIGHT_TILE, enemyPlayer, highlighted)
	}

	let hasNeighbourEnemies = false
	Object.keys(NEIGHBOUR_TILES).map((neighbour) => {
		// false even thogh isEnemy is true
		if (tile.getIn([NEIGHBOUR_TILES[neighbour], 'isEnemy'])) {
			hasNeighbourEnemies = true
		}
	})

	if (hasNeighbourEnemies) {
		Object.keys(NEIGHBOUR_TILES).map((neighbour) => {
			if (tile.get(NEIGHBOUR_TILES[neighbour]) && !tile.getIn([NEIGHBOUR_TILES[neighbour], 'isEnemy'])) {
				tile = tile.setIn([NEIGHBOUR_TILES[neighbour], 'highlighted'], false)
				if (tile.getIn([NEIGHBOUR_TILES[neighbour], NEIGHBOUR_TILES[neighbour]]))
				tile = tile.setIn([NEIGHBOUR_TILES[neighbour], NEIGHBOUR_TILES[neighbour], 'highlighted'], false)
			}
		})
	}

	return tile
}

export const selectDraught = (tile, selectedDraught, playerTurn) => {
		return {
			type: actionTypes.SELECT_DRAUGHT_SYNC,
			tile: tile,
			selectedDraught: selectedDraught,
			playerTurn, playerTurn
		}
}

export const moveDraught = (tile, selectedDraught, playerTurn) => {
	return {
		type: actionTypes.MOVE_DRAUGHT_SYNC,
		tile: tile,
		selectedDraught: selectedDraught,
		playerTurn, playerTurn
	}
}
