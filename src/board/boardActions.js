import * as actionTypes from './boardActionTypes'

const TOP_LEFT_TILE = -12
const TOP_LEFT_TILE_OVER_ENEMY = -24
const TOP_RIGHT_TILE = -10
const TOP_RIGHT_TILE_OVER_ENEMY = -20
const BOTTOM_LEFT_TILE = 10
const BOTTOM_LEFT_TILE_OVER_ENEMY = 20
const BOTTOM_RIGHT_TILE = 12
const BOTTOM_RIGHT_TILE_OVER_ENEMY = 24

/**
 * Toggle the selected draught top left tile
 * @param  {[array]} tiles      [list of tiles on the board]
 * @param  {[number]} selectedTileId         [selected tile id]
 * @param  {[bool]} highlighted [true to highlight the tiles, false to remove the highlights]
 * @param  {[number]} enemyPlayer [enemy player]
 * @return {[object]}            [updated tiles with the the selected draught top left tile highlight toggled]
 */
const toggleTopLeftTileHighlight = (tiles, selectedTileId, highlighted, enemyPlayer) => {
	// check if the selected draught is not at the edge of the board
	if (tiles.get(selectedTileId).get('x') !== 0 && tiles.has(selectedTileId + TOP_LEFT_TILE)) {
		// check if the selected tile is an enemy draught and there is a free tile above it
		if (tiles.get(selectedTileId + TOP_LEFT_TILE).get('hasDraught') && tiles.has(selectedTileId + TOP_LEFT_TILE_OVER_ENEMY) &&
		!tiles.get(selectedTileId + TOP_LEFT_TILE_OVER_ENEMY).get('hasDraught') && tiles.get(selectedTileId + TOP_LEFT_TILE).get('player') === enemyPlayer) {
			tiles = tiles.setIn([selectedTileId + TOP_LEFT_TILE, 'isEnemy'], highlighted)
			tiles = tiles.setIn([selectedTileId + TOP_LEFT_TILE_OVER_ENEMY, 'highlighted'], highlighted)
			// if you can eat a draught, remove all other tile highlights because it is compulsory to eat a draught
			if (tiles.has(selectedTileId + TOP_RIGHT_TILE))
				tiles = tiles.setIn([selectedTileId + TOP_RIGHT_TILE, 'highlighted'], false)
			if (tiles.get(selectedTileId).get('isQueen')) {
				if (tiles.has(selectedTileId + BOTTOM_LEFT_TILE))
					tiles = tiles.setIn([selectedTileId + BOTTOM_LEFT_TILE, 'highlighted'], false)
				if (tiles.has(selectedTileId + BOTTOM_RIGHT_TILE))
					tiles = tiles.setIn([selectedTileId + BOTTOM_RIGHT_TILE, 'highlighted'], false)
			}
		// if it does not find any enemy draught, highlight this selected tile
		} else if (!tiles.get(selectedTileId + TOP_LEFT_TILE).get('hasDraught') &&
		(tiles.has(selectedTileId + TOP_RIGHT_TILE) ? !tiles.get(selectedTileId + TOP_RIGHT_TILE).get('isEnemy') : true) &&
		(tiles.has(selectedTileId + BOTTOM_LEFT_TILE) ? !tiles.get(selectedTileId + BOTTOM_LEFT_TILE).get('isEnemy') : true) &&
		(tiles.has(selectedTileId + BOTTOM_RIGHT_TILE) ? !tiles.get(selectedTileId + BOTTOM_RIGHT_TILE).get('isEnemy') : true)) {
			tiles = tiles.setIn([selectedTileId + TOP_LEFT_TILE, 'highlighted'], highlighted)
		}
	}

	return tiles
}

/**
 * Toggle the selected draught top right tile
 * @param  {[array]} tiles      [list of tiles on the board]
 * @param  {[number]} selectedTileId         [selected tile id]
 * @param  {[bool]} highlighted [true to highlight the tiles, false to remove the highlights]
 * @param  {[number]} enemyPlayer [enemy player]
 * @return {[object]}            [updated tiles with the the selected draught top right tile highlight toggled]
 */
const toggleTopRightTileHighlight = (tiles, selectedTileId, highlighted, enemyPlayer) => {
	// check if the selected tile is not at the edge of the board
	if (tiles.get(selectedTileId).get('x') !== 10 && tiles.has(selectedTileId + TOP_RIGHT_TILE)) {
		// check if the selected tile is an enemy draught and there is a free tile above it
		if (tiles.get(selectedTileId + TOP_RIGHT_TILE).get('hasDraught') && tiles.has(selectedTileId + TOP_RIGHT_TILE_OVER_ENEMY) &&
		!tiles.get(selectedTileId + TOP_RIGHT_TILE_OVER_ENEMY).get('hasDraught') && tiles.get(selectedTileId + TOP_RIGHT_TILE).get('player') === enemyPlayer) {
			tiles = tiles.setIn([selectedTileId + TOP_RIGHT_TILE, 'isEnemy'], highlighted)
			tiles = tiles.setIn([selectedTileId + TOP_RIGHT_TILE_OVER_ENEMY, 'highlighted'], highlighted)
			// if you can eat a draught, remove all other tile highlights because it is compulsory to eat a draught
			if (tiles.has(selectedTileId + TOP_LEFT_TILE))
				tiles = tiles.setIn([selectedTileId + TOP_LEFT_TILE, 'highlighted'], false)
			if (tiles.get(selectedTileId).get('isQueen')) {
				if (tiles.has(selectedTileId + BOTTOM_LEFT_TILE))
					tiles = tiles.setIn([selectedTileId + BOTTOM_LEFT_TILE, 'highlighted'], false)
				if (tiles.has(selectedTileId + BOTTOM_RIGHT_TILE))
					tiles = tiles.setIn([selectedTileId + BOTTOM_RIGHT_TILE, 'highlighted'], false)
			}
		// if it does not find any enemy draught, highlight this selected tile
		} else if (!tiles.get(selectedTileId + TOP_RIGHT_TILE).get('hasDraught') &&
		(tiles.has(selectedTileId + TOP_LEFT_TILE) ? !tiles.get(selectedTileId + TOP_LEFT_TILE).get('isEnemy') : true) &&
		(tiles.has(selectedTileId + BOTTOM_LEFT_TILE) ? !tiles.get(selectedTileId + BOTTOM_LEFT_TILE).get('isEnemy') : true) &&
		(tiles.has(selectedTileId + BOTTOM_RIGHT_TILE) ? !tiles.get(selectedTileId + BOTTOM_RIGHT_TILE).get('isEnemy') : true)) {
			tiles = tiles.setIn([selectedTileId + TOP_RIGHT_TILE, 'highlighted'], highlighted)
		}
	}

	return tiles
}

/**
 * Toggle the selected draught bottom left tile
 * @param  {[array]} tiles      [list of tiles on the board]
 * @param  {[number]} selectedTileId         [selected tile id]
 * @param  {[bool]} highlighted [true to highlight the tiles, false to remove the highlights]
 * @param  {[number]} enemyPlayer [enemy player]
 * @return {[object]}            [updated tiles with the the selected draught bottom left tile highlight toggled]
 */
const toggleBottomLeftTileHighlight = (tiles, selectedTileId, highlighted, enemyPlayer) => {
	// check if the selected tile is not at the edge of the board
	if (tiles.get(selectedTileId).get('x') !== 0 && tiles.has(selectedTileId + BOTTOM_LEFT_TILE)) {
		// check if the selected tile is an enemy draught and there is a free tile above it
		if (tiles.get(selectedTileId + BOTTOM_LEFT_TILE).get('hasDraught') && tiles.has(selectedTileId + BOTTOM_LEFT_TILE_OVER_ENEMY) &&
		!tiles.get(selectedTileId + BOTTOM_LEFT_TILE_OVER_ENEMY).get('hasDraught') && tiles.get(selectedTileId + BOTTOM_LEFT_TILE).get('player') === enemyPlayer) {
			tiles = tiles.setIn([selectedTileId + BOTTOM_LEFT_TILE, 'isEnemy'], highlighted)
			tiles = tiles.setIn([selectedTileId + BOTTOM_LEFT_TILE_OVER_ENEMY, 'highlighted'], highlighted)
			// if you can eat a draught, remove all other tile highlights because it is compulsory to eat a draught
			if (tiles.has(selectedTileId + BOTTOM_RIGHT_TILE))
				tiles = tiles.setIn([selectedTileId + BOTTOM_RIGHT_TILE, 'highlighted'], false)
			if (tiles.get(selectedTileId).get('isQueen')) {
				if (tiles.has(selectedTileId + TOP_LEFT_TILE))
					tiles = tiles.setIn([selectedTileId + TOP_LEFT_TILE, 'highlighted'], false)
				if (tiles.has(selectedTileId + TOP_RIGHT_TILE))
					tiles = tiles.setIn([selectedTileId + TOP_RIGHT_TILE, 'highlighted'], false)
			}
		// if it does not find any enemy draught, highlight this selected tile
		} else if (!tiles.get(selectedTileId + BOTTOM_LEFT_TILE).get('hasDraught') &&
		(tiles.has(selectedTileId + BOTTOM_RIGHT_TILE) ? !tiles.get(selectedTileId + BOTTOM_RIGHT_TILE).get('isEnemy') : true) &&
		(tiles.has(selectedTileId + TOP_RIGHT_TILE) ? !tiles.get(selectedTileId + TOP_RIGHT_TILE).get('isEnemy') : true) &&
		(tiles.has(selectedTileId + TOP_LEFT_TILE) ? !tiles.get(selectedTileId + TOP_LEFT_TILE).get('isEnemy') : true)) {
			tiles = tiles.setIn([selectedTileId + BOTTOM_LEFT_TILE, 'highlighted'], highlighted)
		}
	}

	return tiles
}

/**
 * Toggle the selected draught bottom right tile
 * @param  {[array]} tiles      [list of tiles on the board]
 * @param  {[number]} selectedTileId         [selected tile id]
 * @param  {[bool]} highlighted [true to highlight the tiles, false to remove the highlights]
 * @param  {[number]} enemyPlayer [enemy player]
 * @return {[object]}            [updated tiles with the the selected draught bottom right tile highlight toggled]
 */
const toggleBottomRightTileHighlight = (tiles, selectedTileId, highlighted, enemyPlayer) => {
	// check if the selected tile is not at the edge of the board
	if (tiles.get(selectedTileId).get('x') !== 10 && tiles.has(selectedTileId + BOTTOM_RIGHT_TILE)) {
		// check if the selected tile is an enemy draught and there is a free tile above it
		if (tiles.get(selectedTileId + BOTTOM_RIGHT_TILE).get('hasDraught') && tiles.has(selectedTileId + BOTTOM_RIGHT_TILE_OVER_ENEMY) &&
		!tiles.get(selectedTileId + BOTTOM_RIGHT_TILE_OVER_ENEMY).get('hasDraught') && tiles.get(selectedTileId + BOTTOM_RIGHT_TILE).get('player') === enemyPlayer) {
			tiles = tiles.setIn([selectedTileId + BOTTOM_RIGHT_TILE, 'isEnemy'], highlighted)
			tiles = tiles.setIn([selectedTileId + BOTTOM_RIGHT_TILE_OVER_ENEMY, 'highlighted'], highlighted)
			// if you can eat a draught, remove all other tile highlights because it is compulsory to eat a draught
			if (tiles.has(selectedTileId + BOTTOM_LEFT_TILE))
				tiles = tiles.setIn([selectedTileId + BOTTOM_LEFT_TILE, 'highlighted'], false)
			if (tiles.get(selectedTileId).get('isQueen')) {
				if (tiles.has(selectedTileId + TOP_LEFT_TILE))
					tiles = tiles.setIn([selectedTileId + TOP_LEFT_TILE, 'highlighted'], false)
				if (tiles.has(selectedTileId + TOP_RIGHT_TILE))
					tiles = tiles.setIn([selectedTileId + TOP_RIGHT_TILE, 'highlighted'], false)
			}
		// if it does not find any enemy draught, highlight this selected tile
		} else if (!tiles.get(selectedTileId + BOTTOM_RIGHT_TILE).get('hasDraught') &&
		(tiles.has(selectedTileId + BOTTOM_LEFT_TILE) ? !tiles.get(selectedTileId + BOTTOM_LEFT_TILE).get('isEnemy') : true) &&
		(tiles.has(selectedTileId + TOP_RIGHT_TILE) ? !tiles.get(selectedTileId + TOP_RIGHT_TILE).get('isEnemy') : true) &&
		(tiles.has(selectedTileId + TOP_LEFT_TILE) ? !tiles.get(selectedTileId + TOP_LEFT_TILE).get('isEnemy') : true)) {
			tiles = tiles.setIn([selectedTileId + BOTTOM_RIGHT_TILE, 'highlighted'], highlighted)
		}
	}

	return tiles
}

/**
 * Toggle the selected tile neighbour highlights
 * @param  {[array]} tiles      [list of tiles on the board]
 * @param  {[number]} selectedTileId         [selected tile id]
 * @param  {[bool]} highlighted [true to highlight the tiles, false to remove the highlights]
 * @param  {[number]} playerTurn [player turn]
 * @return {[object]}            [updated tiles with the the selected draught neighbours highlights toggled]
 */
const toggleTileHighlights = (tiles, selectedTileId, highlighted, playerTurn) => {
	const enemyPlayer = playerTurn === 1 ? 2 : 1

	//can just pass tiles[selectedTileId], then up there go tile.get('x') + 4 (NVM U CANT)
	if (playerTurn === 1 || tiles.get(selectedTileId).get('isQueen')) {
		tiles = toggleBottomLeftTileHighlight(tiles, selectedTileId, highlighted, enemyPlayer)
		tiles = toggleBottomRightTileHighlight(tiles, selectedTileId, highlighted, enemyPlayer)
	}

	if (playerTurn === 2 || tiles.get(selectedTileId).get('isQueen')) {
		tiles = toggleTopLeftTileHighlight(tiles, selectedTileId, highlighted, enemyPlayer)
		tiles = toggleTopRightTileHighlight(tiles, selectedTileId, highlighted, enemyPlayer)
	}

	return tiles
}

/**
 * Select the draught
 * @param  {[array]} tiles      [list of tiles on the board]
 * @param  {[number]} selectedTileId         [selected tile id]
 * @param  {[number]} selectedDraughtId [selected draught id]
 * @param  {[number]} playerTurn [player turn]
 * @return {[object]}            [updated tiles with the the draught selected/unselected]
 */
export const selectDraught = (tiles, selectedTileId, selectedDraughtId, playerTurn) => {
	// remove all previous highlighted tiles
	if (selectedDraughtId !== 0) tiles = toggleTileHighlights(tiles, selectedDraughtId, false, playerTurn)

	// toggle tile highlights that the draught is allow to move to
	tiles = toggleTileHighlights(tiles, selectedTileId, tiles.get(selectedTileId).get('selected') ? false : true, playerTurn)
	//tiles = tiles.setIn([selectedTileId, 'selected'], !tiles.get(selectedTileId).get('selected'))

	tiles = tiles.map((tile, id) =>
		id === selectedTileId ? tile.set('selected', !tile.get('selected')) : tile.set('selected', false)
	)

	return {
		type: actionTypes.SELECT_DRAUGHT,
		// toggle whether the draught is being selected or not
		tiles: tiles,
		selectedDraughtId: tiles.get(selectedTileId).get('selected') ? selectedTileId : 0
	}
}

/**
 * Move the draught
 * @param  {[array]} tiles      [list of tiles on the board]
 * @param  {[number]} selectedTileId         [selected tile id]
 * @param  {[number]} selectedDraughtId [selected draught id]
 * @param  {[number]} playerTurn [player turn]
 * @return {[object]}            [updated tiles with the selected draught moved to the selected tile]
 */
export const moveDraught = (tiles, selectedTileId, selectedDraughtId, playerTurn) => {
	let canChangePlayerTurn = false
	// remove previous draught and add a new draught in the selected tile, as well as remove draught that has been eaten if allowed
	tiles = tiles.map((tile, id) => {
		if (id === selectedDraughtId)
			tile = tile.withMutations((mutatedTile) => mutatedTile.set('hasDraught', false).set('player', 0).set('highlighted', false).set('isQueen', false))
		if (id === selectedTileId)
			tile = tile.withMutations((mutatedTile) => mutatedTile.set('hasDraught', true).set('player', tiles.get(selectedDraughtId).get('player')).set('highlighted', false)
			.set('isQueen', tiles.get(selectedDraughtId).get('isQueen')))
		if (tile.get('isEnemy')) {
			canChangePlayerTurn = true
			tile = tile.withMutations((mutatedTile) => mutatedTile.set('hasDraught', false).set('player', 0).set('isEnemy', false))
		}
		return tile
	})

	tiles = toggleTileHighlights(tiles, selectedTileId, false, playerTurn)
	// check if you still can eat more if you eat a draught as the draught rules dictate that you can eat multiple times if allowed
	if (canChangePlayerTurn) {
		// check all possible draught moves for this selected tile, return true if it still can eat one or more draught
		tiles = toggleTileHighlights(tiles, selectedTileId, true, playerTurn)
		canChangePlayerTurn = tiles.reduce((initialTileEnemyHighlighted, tile) => {
			return initialTileEnemyHighlighted || tile.get('isEnemy')
		}, false)
	}

	// if it can't eat anymore; turn off all the toggles and change player turn
	if (!canChangePlayerTurn) {
		tiles = toggleTileHighlights(tiles, selectedDraughtId, false, playerTurn)
		tiles = toggleTileHighlights(tiles, selectedTileId, false, playerTurn)
		playerTurn = playerTurn === 1 ? 2 : 1
	}

	// the selected draught is now the current draught
	selectedDraughtId = selectedTileId

	// make this draught into a queen if it reaches the end of the board
	if (tiles.get(selectedDraughtId).get('y') === 10 || tiles.get(selectedDraughtId).get('y') === 0) {
		tiles = tiles.setIn([selectedDraughtId, 'isQueen'], true)
	}

	return {
		type: actionTypes.MOVE_DRAUGHT,
		tiles: tiles,
		selectedDraughtId: selectedDraughtId,
		playerTurn: playerTurn
	}
}
