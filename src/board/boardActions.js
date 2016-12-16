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
	if (tiles[selectedTileId].x !== 0 && tiles[selectedTileId + TOP_LEFT_TILE] != undefined) {
		// check if the selected tile is an enemy draught and there is a free tile above it
		if (tiles[selectedTileId + TOP_LEFT_TILE].hasDraught && tiles[selectedTileId + TOP_LEFT_TILE_OVER_ENEMY] != undefined && 
		!tiles[selectedTileId + TOP_LEFT_TILE_OVER_ENEMY].hasDraught && tiles[selectedTileId + TOP_LEFT_TILE].player === enemyPlayer) {
			tiles[selectedTileId + TOP_LEFT_TILE] = {...tiles[selectedTileId + TOP_LEFT_TILE], isEnemy: highlighted}
			tiles[selectedTileId + TOP_LEFT_TILE_OVER_ENEMY] = {...tiles[selectedTileId + TOP_LEFT_TILE_OVER_ENEMY], highlighted: highlighted}
			// if you can eat a draught, remove all other tile highlights because it is compulsory to eat a draught
			if (tiles[selectedTileId + TOP_RIGHT_TILE] != undefined) 
				tiles[selectedTileId + TOP_RIGHT_TILE] = {...tiles[selectedTileId + TOP_RIGHT_TILE], highlighted: false}
			if (tiles[selectedTileId].isQueen) {
				if (tiles[selectedTileId + BOTTOM_LEFT_TILE] != undefined) 
					tiles[selectedTileId + BOTTOM_LEFT_TILE] = {...tiles[selectedTileId + BOTTOM_LEFT_TILE], highlighted: false}
				if (tiles[selectedTileId + BOTTOM_RIGHT_TILE] != undefined) 
					tiles[selectedTileId + BOTTOM_RIGHT_TILE] = {...tiles[selectedTileId + BOTTOM_RIGHT_TILE], highlighted: false}
			}
		// if it does not find any enemy draught, highlight this selected tile
		} else if (!tiles[selectedTileId + TOP_LEFT_TILE].hasDraught && 
		(tiles[selectedTileId + TOP_RIGHT_TILE] != undefined ? !tiles[selectedTileId + TOP_RIGHT_TILE].isEnemy : true) && 
		(tiles[selectedTileId + BOTTOM_LEFT_TILE] != undefined ? !tiles[selectedTileId + BOTTOM_LEFT_TILE].isEnemy : true) && 
		(tiles[selectedTileId + BOTTOM_RIGHT_TILE] != undefined ? !tiles[selectedTileId + BOTTOM_RIGHT_TILE].isEnemy : true)) {
			tiles[selectedTileId + TOP_LEFT_TILE] = {...tiles[selectedTileId + TOP_LEFT_TILE], highlighted: highlighted}
		}
	}
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
	if (tiles[selectedTileId].x !== 10 && tiles[selectedTileId + TOP_RIGHT_TILE] != undefined) {
		// check if the selected tile is an enemy draught and there is a free tile above it
		if (tiles[selectedTileId + TOP_RIGHT_TILE].hasDraught && tiles[selectedTileId + TOP_RIGHT_TILE_OVER_ENEMY] != undefined && 
		!tiles[selectedTileId + TOP_RIGHT_TILE_OVER_ENEMY].hasDraught && tiles[selectedTileId + TOP_RIGHT_TILE].player === enemyPlayer) {
			tiles[selectedTileId + TOP_RIGHT_TILE] = {...tiles[selectedTileId + TOP_RIGHT_TILE], isEnemy: highlighted}
			tiles[selectedTileId + TOP_RIGHT_TILE_OVER_ENEMY] = {...tiles[selectedTileId + TOP_RIGHT_TILE_OVER_ENEMY], highlighted: highlighted}
			// if you can eat a draught, remove all other tile highlights because it is compulsory to eat a draught
			if (tiles[selectedTileId + TOP_LEFT_TILE] != undefined) 
				tiles[selectedTileId + TOP_LEFT_TILE] = {...tiles[selectedTileId + TOP_LEFT_TILE], highlighted: false}
			if (tiles[selectedTileId].isQueen) {
				if (tiles[selectedTileId + BOTTOM_LEFT_TILE] != undefined) 
					tiles[selectedTileId + BOTTOM_LEFT_TILE] = {...tiles[selectedTileId + BOTTOM_LEFT_TILE], highlighted: false}
				if (tiles[selectedTileId + BOTTOM_RIGHT_TILE] != undefined) 
					tiles[selectedTileId + BOTTOM_RIGHT_TILE] = {...tiles[selectedTileId + BOTTOM_RIGHT_TILE], highlighted: false}
			}
		// if it does not find any enemy draught, highlight this selected tile
		} else if (!tiles[selectedTileId + TOP_RIGHT_TILE].hasDraught && 
		(tiles[selectedTileId + TOP_LEFT_TILE] != undefined ? !tiles[selectedTileId + TOP_LEFT_TILE].isEnemy : true) && 
		(tiles[selectedTileId + BOTTOM_LEFT_TILE] != undefined ? !tiles[selectedTileId + BOTTOM_LEFT_TILE].isEnemy : true) && 
		(tiles[selectedTileId + BOTTOM_RIGHT_TILE] != undefined ? !tiles[selectedTileId + BOTTOM_RIGHT_TILE].isEnemy : true)) {
			tiles[selectedTileId + TOP_RIGHT_TILE] = {...tiles[selectedTileId + TOP_RIGHT_TILE], highlighted: highlighted}
		}
	}
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
	if (tiles[selectedTileId].x !== 0 && tiles[selectedTileId + BOTTOM_LEFT_TILE] != undefined) {
		// check if the selected tile is an enemy draught and there is a free tile above it
		if (tiles[selectedTileId + BOTTOM_LEFT_TILE].hasDraught && tiles[selectedTileId + BOTTOM_LEFT_TILE_OVER_ENEMY] != undefined && 
		!tiles[selectedTileId + BOTTOM_LEFT_TILE_OVER_ENEMY].hasDraught && tiles[selectedTileId + BOTTOM_LEFT_TILE].player === enemyPlayer) {
			tiles[selectedTileId + BOTTOM_LEFT_TILE] = {...tiles[selectedTileId + BOTTOM_LEFT_TILE], isEnemy: highlighted}
			tiles[selectedTileId + BOTTOM_LEFT_TILE_OVER_ENEMY] = {...tiles[selectedTileId + BOTTOM_LEFT_TILE_OVER_ENEMY], highlighted: highlighted}
			// if you can eat a draught, remove all other tile highlights because it is compulsory to eat a draught
			if (tiles[selectedTileId + BOTTOM_RIGHT_TILE] != undefined) 
				tiles[selectedTileId + BOTTOM_RIGHT_TILE] = {...tiles[selectedTileId + BOTTOM_RIGHT_TILE], highlighted: false}
			if (tiles[selectedTileId].isQueen) {
				if (tiles[selectedTileId + TOP_LEFT_TILE] != undefined) 
					tiles[selectedTileId + TOP_LEFT_TILE] = {...tiles[selectedTileId + TOP_LEFT_TILE], highlighted: false}
				if (tiles[selectedTileId + TOP_RIGHT_TILE] != undefined) 
					tiles[selectedTileId + TOP_RIGHT_TILE] = {...tiles[selectedTileId + TOP_RIGHT_TILE], highlighted: false}
			}
		// if it does not find any enemy draught, highlight this selected tile
		} else if (!tiles[selectedTileId + BOTTOM_LEFT_TILE].hasDraught && 
		(tiles[selectedTileId + BOTTOM_RIGHT_TILE] != undefined ? !tiles[selectedTileId + BOTTOM_RIGHT_TILE].isEnemy : true) && 
		(tiles[selectedTileId + TOP_RIGHT_TILE] != undefined ? !tiles[selectedTileId + TOP_RIGHT_TILE].isEnemy : true) && 
		(tiles[selectedTileId + TOP_LEFT_TILE] != undefined ? !tiles[selectedTileId + TOP_LEFT_TILE].isEnemy : true)) {
			tiles[selectedTileId + BOTTOM_LEFT_TILE] = {...tiles[selectedTileId + BOTTOM_LEFT_TILE], highlighted: highlighted}
		}
	}
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
	if (tiles[selectedTileId].x !== 10 && tiles[selectedTileId + BOTTOM_RIGHT_TILE] != undefined) {
		// check if the selected tile is an enemy draught and there is a free tile above it
		if (tiles[selectedTileId + BOTTOM_RIGHT_TILE].hasDraught && tiles[selectedTileId + BOTTOM_RIGHT_TILE_OVER_ENEMY] != undefined && 
		!tiles[selectedTileId + BOTTOM_RIGHT_TILE_OVER_ENEMY].hasDraught && tiles[selectedTileId + BOTTOM_RIGHT_TILE].player === enemyPlayer) {
			tiles[selectedTileId + BOTTOM_RIGHT_TILE] = {...tiles[selectedTileId + BOTTOM_RIGHT_TILE], isEnemy: highlighted}
			tiles[selectedTileId + BOTTOM_RIGHT_TILE_OVER_ENEMY] = {...tiles[selectedTileId + BOTTOM_RIGHT_TILE_OVER_ENEMY], highlighted: highlighted}
			// if you can eat a draught, remove all other tile highlights because it is compulsory to eat a draught
			if (tiles[selectedTileId + BOTTOM_LEFT_TILE] != undefined) 
				tiles[selectedTileId + BOTTOM_LEFT_TILE] = {...tiles[selectedTileId + BOTTOM_LEFT_TILE], highlighted: false}
			if (tiles[selectedTileId].isQueen) {
				if (tiles[selectedTileId + TOP_LEFT_TILE] != undefined) 
					tiles[selectedTileId + TOP_LEFT_TILE] = {...tiles[selectedTileId + TOP_LEFT_TILE], highlighted: false}
				if (tiles[selectedTileId + TOP_RIGHT_TILE] != undefined) 
					tiles[selectedTileId + TOP_RIGHT_TILE] = {...tiles[selectedTileId + TOP_RIGHT_TILE], highlighted: false}
			}
		// if it does not find any enemy draught, highlight this selected tile
		} else if (!tiles[selectedTileId + BOTTOM_RIGHT_TILE].hasDraught && 
		(tiles[selectedTileId + BOTTOM_LEFT_TILE] != undefined ? !tiles[selectedTileId + BOTTOM_LEFT_TILE].isEnemy : true) && 
		(tiles[selectedTileId + TOP_RIGHT_TILE] != undefined ? !tiles[selectedTileId + TOP_RIGHT_TILE].isEnemy : true) && 
		(tiles[selectedTileId + TOP_LEFT_TILE] != undefined ? !tiles[selectedTileId + TOP_LEFT_TILE].isEnemy : true)) {
			tiles[selectedTileId + BOTTOM_RIGHT_TILE] = {...tiles[selectedTileId + BOTTOM_RIGHT_TILE], highlighted: highlighted}
		}
	}
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

	if (playerTurn === 1 || tiles[selectedTileId].isQueen) {
		toggleBottomLeftTileHighlight(tiles, selectedTileId, highlighted, enemyPlayer)
		toggleBottomRightTileHighlight(tiles, selectedTileId, highlighted, enemyPlayer)
	}

	if (playerTurn === 2 || tiles[selectedTileId].isQueen) {
		toggleTopLeftTileHighlight(tiles, selectedTileId, highlighted, enemyPlayer)
		toggleTopRightTileHighlight(tiles, selectedTileId, highlighted, enemyPlayer)
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
	tiles = toggleTileHighlights(tiles, selectedTileId, tiles[selectedTileId].selected ? false : true, playerTurn, tiles[selectedTileId].isQueen ? true : false)

	return {
		type: actionTypes.SELECT_DRAUGHT,
		// Toggle whether the draught is being selected or not
		tiles: tiles.map((tile, tileId) => tileId === selectedTileId ? {...tile, selected: !tile.selected} : {...tile, selected: false}),
		selectedDraughtId: !tiles[selectedTileId].selected ? selectedTileId : 0,
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
	tiles = tiles.map((tile, tileId) => {
		if (tileId === selectedDraughtId) return {...tile, hasDraught: false, player: 0, highlighted: false, isQueen: false}
		if (tileId === selectedTileId) return {...tile, hasDraught: true, player: tiles[selectedDraughtId].player, highlighted: false, 
			isQueen:tiles[selectedDraughtId].isQueen ? true : false}
		if (tile.isEnemy) {
			canChangePlayerTurn = true
			return {...tile, hasDraught: false, player: 0, isEnemy: false}
		}
		return {...tile, highlighted: false}
	})

	// the selected draught is now the current draught
	selectedDraughtId = selectedTileId

	// check if you still can eat more if you eat a draught as the draught rules dictate that you can eat multiple times if allowed
	if (canChangePlayerTurn) {
		// check all possible draught moves for this selected tile, return true if it still can eat one or more draught
		tiles = toggleTileHighlights(tiles, selectedDraughtId, true, playerTurn)
		canChangePlayerTurn = tiles.reduce((initialTileEnemyHighlighted, tile) => {
			return initialTileEnemyHighlighted || tile.isEnemy
		}, false)
	}

	// if it can't eat anymore; turn off all the toggles and change player turn
	if (!canChangePlayerTurn) {
		tiles = toggleTileHighlights(tiles, selectedDraughtId, false, playerTurn)
		playerTurn = playerTurn === 1 ? 2 : 1
	}

	// make this draught into a queen if it reaches the end of the board
	if (tiles[selectedDraughtId].id <= 9 || tiles[selectedDraughtId].id >= 110) {
		tiles[selectedDraughtId] = {...tiles[selectedDraughtId], isQueen: true}
	}

	return {
		type: actionTypes.MOVE_DRAUGHT,
		tiles: tiles,
		selectedDraughtId: selectedDraughtId,
		playerTurn: playerTurn
	}
}