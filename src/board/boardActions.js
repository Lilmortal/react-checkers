import * as actionTypes from './boardActionTypes'

/**
 * Toggle the selected draught top left tile
 * @param  {[array]} tiles      [list of tiles on the board]
 * @param  {[number]} selectedTileId         [selected tile id]
 * @param  {[bool]} highlighted [true to highlight the tiles, false to remove the highlights]
 * @param  {[number]} enemyPlayer [enemy player]
 * @return {[object]}            [updated tiles with the the selected draught top left tile highlight toggled]
 */
const toggleTopLeftTileHighlight = (tile, enemyPlayer, highlighted) => {
	// check if the selected draught is not at the edge of the board
	if (tile.get('topLeftTile')) {
		// check if the selected tile is an enemy draught and there is a free tile above it
		//see if getIn returns undefined as thats 0 no need for has
		if (tile.getIn(['topLeftTile', 'player']) === enemyPlayer && !tile.getIn(['topLeftTile', 'topLeftTile', 'hasDraught'])) {
			tile = tile.withMutations((tile) => tile.setIn(['topLeftTile', 'isEnemy'], highlighted).setIn(['topLeftTile', 'topLeftTile', 'highlighted'], highlighted))
			// if you can eat a draught, remove all other tile highlights because it is compulsory to eat a draught
			if (tile.has('topRightTile')) tile = tile.setIn(['topRightTile', 'highlighted'], false)
			if (tile.get('isQueen')) {
				if (tile.has('bottomLeftTile'))
					tile = tile.setIn(['bottomLeftTile', 'highlighted'], false)
				if (tile.has('bottomRightTile'))
					tile = tile.setIn(['bottomRightTile', 'highlighted'], false)
			}
		// if it does not find any enemy draught, highlight this selected tile
		} else if (!tile.getIn(['topLeftTile', 'hasDraught']) && !tile.getIn(['topRightTile', 'isEnemy']) &&
		!tile.getIn(['bottomLeftTile', 'isEnemy']) && !tile.getIn(['bottomRightTile', 'isEnemy'])) {
			tile = tile.setIn(['topLeftTile', 'highlighted'], highlighted)
		}
	}

	return tile
}

/**
 * Toggle the selected draught top right tile
 * @param  {[array]} tile      [list of tiles on the board]
 * @param  {[number]} selectedTileId         [selected tile id]
 * @param  {[bool]} highlighted [true to highlight the tiles, false to remove the highlights]
 * @param  {[number]} enemyPlayer [enemy player]
 * @return {[object]}            [updated tiles with the the selected draught top right tile highlight toggled]
 */
const toggleTopRightTileHighlight = (tile, enemyPlayer, highlighted) => {
	// check if the selected tile is not at the edge of the board
	if (tile.get('topRightTile')) {
		// check if the selected tile is an enemy draught and there is a free tile above it
		//see if getIn returns undefined as thats 0 no need for has
		if (tile.getIn(['topRightTile', 'player']) === enemyPlayer && !tile.getIn(['topRightTile', 'topRightTile', 'hasDraught'])) {
			tile = tile.withMutations((tile) => tile.setIn(['topRightTile', 'isEnemy'], highlighted).setIn(['topRightTile', 'topRightTile', 'highlighted'], highlighted))
			// if you can eat a draught, remove all other tile highlights because it is compulsory to eat a draught
			if (tile.has('topLeftTile')) tile = tile.setIn(['topLeftTile', 'highlighted'], false)
			if (tile.get('isQueen')) {
				if (tile.has('bottomLeftTile'))
					tile = tile.setIn(['bottomLeftTile', 'highlighted'], false)
				if (tile.has('bottomRightTile'))
					tile = tile.setIn(['bottomRightTile', 'highlighted'], false)
			}
		// if it does not find any enemy draught, highlight this selected tile
	} else if (!tile.getIn(['topRightTile', 'hasDraught']) && !tile.getIn(['topLeftTile', 'isEnemy']) &&
		!tile.getIn(['bottomLeftTile', 'isEnemy']) && !tile.getIn(['bottomRightTile', 'isEnemy'])) {
			tile = tile.setIn(['topRightTile', 'highlighted'], highlighted)
		}
	}

	return tile
}

/**
 * Toggle the selected draught bottom left tile
 * @param  {[array]} tiles      [list of tiles on the board]
 * @param  {[number]}          [selected tile id]
 * @param  {[bool]} highlighted [true to highlight the tiles, false to remove the highlights]
 * @param  {[number]} enemyPlayer [enemy player]
 * @return {[object]}            [updated tiles with the the selected draught bottom left tile highlight toggled]
 */
const toggleBottomLeftTileHighlight = (tile, enemyPlayer, highlighted) => {
	// check if the selected tile is not at the edge of the board
	if (tile.get('bottomLeftTile')) {
		// check if the selected tile is an enemy draught and there is a free tile above it
		//see if getIn returns undefined as thats 0 no need for has
		if (tile.getIn(['bottomLeftTile', 'player']) === enemyPlayer && !tile.getIn(['bottomLeftTile', 'bottomLeftTile', 'hasDraught'])) {
			tile = tile.withMutations((tile) => tile.setIn(['bottomLeftTile', 'isEnemy'], highlighted).setIn(['bottomLeftTile', 'bottomLeftTile', 'highlighted'], highlighted))
			// if you can eat a draught, remove all other tile highlights because it is compulsory to eat a draught
			if (tile.has('bottomRightTile')) tile = tile.setIn(['bottomRightTile', 'highlighted'], false)
			if (tile.get('isQueen')) {
				if (tile.has('topLeftTile'))
					tile = tile.setIn(['topLeftTile', 'highlighted'], false)
				if (tile.has('topRightTile'))
					tile = tile.setIn(['topRightTile', 'highlighted'], false)
			}
		// if it does not find any enemy draught, highlight this selected tile
	} else if (!tile.getIn(['bottomRightTile', 'hasDraught']) && !tile.getIn(['topLeftTile', 'isEnemy']) &&
		!tile.getIn(['topLeftTile', 'isEnemy']) && !tile.getIn(['topRightTile', 'isEnemy'])) {
			tile = tile.setIn(['bottomLeftTile', 'highlighted'], highlighted)
		}
	}

	return tile
}

/**
 * Toggle the selected draught bottom right tile
 * @param  {[array]} tiles      [list of tiles on the board]
 * @param  {[number]}          [selected tile id]
 * @param  {[bool]} highlighted [true to highlight the tiles, false to remove the highlights]
 * @param  {[number]} enemyPlayer [enemy player]
 * @return {[object]}            [updated tiles with the the selected draught bottom right tile highlight toggled]
 */
const toggleBottomRightTileHighlight = (tile, enemyPlayer, highlighted) => {
	// check if the selected tile is not at the edge of the board
	if (tile.get('bottomRightTile')) {
		// check if the selected tile is an enemy draught and there is a free tile above it
		//see if getIn returns undefined as thats 0 no need for has
		if (tile.getIn(['bottomRightTile', 'player']) === enemyPlayer && !tile.getIn(['bottomRightTile', 'bottomRightTile', 'hasDraught'])) {
			tile = tile.withMutations((tile) => tile.setIn(['bottomRightTile', 'isEnemy'], highlighted).setIn(['bottomRightTile', 'bottomRightTile', 'highlighted'], highlighted))
			// if you can eat a draught, remove all other tile highlights because it is compulsory to eat a draught
			if (tile.has('bottomLeftTile')) tile = tile.setIn(['bottomLeftTile', 'highlighted'], false)
			if (tile.get('isQueen')) {
				if (tile.has('topLeftTile'))
					tile = tile.setIn(['topLeftTile', 'highlighted'], false)
				if (tile.has('topRightTile'))
					tile = tile.setIn(['topRightTile', 'highlighted'], false)
			}
		// if it does not find any enemy draught, highlight this selected tile
	} else if (!tile.getIn(['bottomLeftTile', 'hasDraught']) && !tile.getIn(['topLeftTile', 'isEnemy']) &&
		!tile.getIn(['topLeftTile', 'isEnemy']) && !tile.getIn(['topRightTile', 'isEnemy'])) {
			tile = tile.setIn(['bottomRightTile', 'highlighted'], highlighted)
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
const toggleTileHighlights = (tile, playerTurn, highlighted) => {
	const enemyPlayer = playerTurn === 1 ? 2 : 1
	//can just pass tiles[selectedTileId], then up there go tile.get('x') + 4 (NVM U CANT)
	if (playerTurn === 1 || tile.get('isQueen')) {
		tile = toggleBottomLeftTileHighlight(tile, enemyPlayer, highlighted)
		tile = toggleBottomRightTileHighlight(tile, enemyPlayer, highlighted)
	}

	if (playerTurn === 2 || tile.get('isQueen')) {
		tile = toggleTopLeftTileHighlight(tile, enemyPlayer, highlighted)
		tile = toggleTopRightTileHighlight(tile, enemyPlayer, highlighted)
	}

	return tile
}

/**
 * Select the draught
 * @param  {[array]} tiles      [list of tiles on the board]
 * @param  {[number]} selectedTileId         [selected tile id]
 * @param  {[number]} selectedDraught [selected draught id]
 * @param  {[number]} playerTurn [player turn]
 * @return {[object]}            [updated tiles with the the draught selected/unselected]
 */
export const selectDraught = (tile, selectedDraught, playerTurn) => {
	// remove previous selected draught highlighted tiles
	if (selectedDraught !== undefined) {
		selectedDraught = toggleTileHighlights(selectedDraught, playerTurn, false)
		selectedDraught = selectedDraught.set('selected', false)
	}
	// toggle tile highlights that the draught is allow to move to
	tile = toggleTileHighlights(tile, playerTurn, tile.get('selected') ? false : true)
	tile = tile.set('selected', !tile.get('selected'))
	/*tiles = tiles.map((tile, id) =>
		id === selectedTileId ? tile.set('selected', !tile.get('selected')) : tile.set('selected', false)
	)
	tile = tile.set('highlighted', !tile.get('highlighted'))*/

	return {
		type: actionTypes.SELECT_DRAUGHT,
		// toggle whether the draught is being selected or not
		tile: tile,
		formerSelectedDraught: selectedDraught,
		selectedDraught: tile.get('selected') ? tile : undefined
	}
}

const hasEnemy = (tile, canChangePlayerTurn, playerTurn) => {
	tile = toggleTileHighlights(tile, playerTurn, true)
	if (canChangePlayerTurn === 'topLeftTile')
		canChangePlayerTurn = 'bottomRightTile'
	else if (canChangePlayerTurn === 'topRightTile')
		canChangePlayerTurn = 'bottomLeftTile'
	else if (canChangePlayerTurn === 'bottomLeftTile')
		canChangePlayerTurn = 'topRightTile'
	else if (canChangePlayerTurn === 'bottomRightTile')
		canChangePlayerTurn = 'topLeftTile'

		if (canChangePlayerTurn !== 'topLeftTile' && tile.getIn(['topLeftTile', 'isEnemy'])) {
			return true
		}
		if (canChangePlayerTurn !== 'topRightTile' && tile.getIn(['topRightTile', 'isEnemy'])) {
			return true
		}
		if (canChangePlayerTurn !== 'bottomLeftTile' && tile.getIn(['bottomLeftTile', 'isEnemy'])) {
			return true
		}
		if (canChangePlayerTurn !== 'bottomRightTile' && tile.getIn(['bottomRightTile', 'isEnemy'])) {
			return true
		}
		return false
}

/**
 * Move the draught
 * @param  {[array]} tiles      [list of tiles on the board]
 * @param  {[number]} selectedTileId         [selected tile id]
 * @param  {[number]} selectedDraught [selected draught id]
 * @param  {[number]} playerTurn [player turn]
 * @return {[object]}            [updated tiles with the selected draught moved to the selected tile]
 */
export const moveDraught = (tile, selectedDraught, playerTurn) => {
	let canChangePlayerTurn = undefined
	// remove previous draught and add a new draught in the selected tile, as well as remove draught that has been eaten if allowed
	tile = tile.withMutations((mutatedTile) =>
	mutatedTile.set('hasDraught', true).set('selected', false).set('player', playerTurn).set('highlighted', false).set('isQueen', selectedDraught.get('isQueen')))

	selectedDraught = selectedDraught.withMutations((mutatedTile) => mutatedTile.set('hasDraught', false).set('player', 0).set('isQueen', false))

	if (selectedDraught.getIn(['topLeftTile', 'isEnemy']) && selectedDraught.getIn(['topLeftTile', 'topLeftTile']) != undefined &&
	selectedDraught.getIn(['topLeftTile', 'topLeftTile', 'id']) === tile.get('id')) {
		canChangePlayerTurn = 'topLeftTile'
		selectedDraught = selectedDraught.withMutations((mutatedTile) => mutatedTile.setIn(['topLeftTile', 'isEnemy'], false).setIn(['topLeftTile', 'hasDraught'], false)
		.setIn(['topLeftTile', 'player'], 0))
	}

	if (selectedDraught.getIn(['topRightTile', 'isEnemy']) && selectedDraught.getIn(['topRightTile', 'topRightTile']) != undefined &&
	selectedDraught.getIn(['topRightTile', 'topRightTile', 'id']) === tile.get('id')) {
		canChangePlayerTurn = 'topRightTile'
		selectedDraught = selectedDraught.withMutations((mutatedTile) => mutatedTile.setIn(['topRightTile', 'isEnemy'], false).setIn(['topRightTile', 'hasDraught'], false)
		.setIn(['topRightTile', 'player'], 0))
	}

	if (selectedDraught.getIn(['bottomLeftTile', 'isEnemy']) && selectedDraught.getIn(['bottomLeftTile', 'bottomLeftTile']) != undefined &&
	selectedDraught.getIn(['bottomLeftTile', 'bottomLeftTile', 'id']) === tile.get('id')) {
		canChangePlayerTurn = 'bottomLeftTile'
		selectedDraught = selectedDraught.withMutations((mutatedTile) => mutatedTile.setIn(['bottomLeftTile', 'isEnemy'], false).setIn(['bottomLeftTile', 'hasDraught'], false)
		.setIn(['bottomLeftTile', 'player'], 0))
	}

	if (selectedDraught.getIn(['bottomRightTile', 'isEnemy']) && selectedDraught.getIn(['bottomRightTile', 'bottomRightTile']) != undefined &&
	 selectedDraught.getIn(['bottomRightTile', 'bottomRightTile', 'id']) === tile.get('id')) {
		canChangePlayerTurn = 'bottomRightTile'
		selectedDraught = selectedDraught.withMutations((mutatedTile) => mutatedTile.setIn(['bottomRightTile', 'isEnemy'], false).setIn(['bottomRightTile', 'hasDraught'], false)
		.setIn(['bottomRightTile', 'player'], 0))
	}

	/*if (selectedDraught.get('topLeftTile') && tile.get('isEnemy')) {
		canChangePlayerTurn = true
		tile = tile.withMutations((mutatedTile) => mutatedTile.set('hasDraught', false).set('player', 0).set('isEnemy', false))
	}*/

	selectedDraught = toggleTileHighlights(selectedDraught, playerTurn, false)



	// check if you still can eat more if you eat a draught as the draught rules dictate that you can eat multiple times if allowed
	if (canChangePlayerTurn && hasEnemy(tile, canChangePlayerTurn, playerTurn)) {
		// check all possible draught moves for this selected tile, return true if it still can eat one or more draught
		tile = toggleTileHighlights(tile, playerTurn, true)
		tile = tile.set('selected', true)
		//selectedDraught = tile
		// TODO: NEED TO UPDATE TILES
		//canChangePlayerTurn = tile.getIn(['topLeftTile', 'isEnemy']) || tile.getIn(['topRightTile', 'isEnemy']) || tile.getIn(['bottomLeftTile', 'isEnemy']) || tile.getIn(['bottomRightTile', 'isEnemy'])
		// the selected draught is now the current draught
		//selectedDraught = tile
	} else {
		tile = toggleTileHighlights(tile, playerTurn, false)
		tile = tile.set('selected', false)

		playerTurn = playerTurn === 1 ? 2 : 1
	}

	if (canChangePlayerTurn != undefined) {


		if (canChangePlayerTurn === 'topLeftTile')
			canChangePlayerTurn = 'bottomRightTile'
		else if (canChangePlayerTurn === 'topRightTile')
			canChangePlayerTurn = 'bottomLeftTile'
		else if (canChangePlayerTurn === 'bottomLeftTile')
			canChangePlayerTurn = 'topRightTile'
		else if (canChangePlayerTurn === 'bottomRightTile')
			canChangePlayerTurn = 'topLeftTile'
			tile = tile.withMutations((mutatedTile) =>
			mutatedTile.setIn([canChangePlayerTurn, 'hasDraught'], false).setIn([canChangePlayerTurn, 'selected'], false).setIn([canChangePlayerTurn, 'player'], 0).setIn([canChangePlayerTurn, 'highlighted'], false)
			.setIn([canChangePlayerTurn, 'isQueen'], false).setIn([canChangePlayerTurn, 'isEnemy'], false).setIn([canChangePlayerTurn, canChangePlayerTurn, 'hasDraught'], false)
			.setIn([canChangePlayerTurn, canChangePlayerTurn, 'selected'], false).setIn([canChangePlayerTurn, canChangePlayerTurn, 'player'], 0).setIn([canChangePlayerTurn, canChangePlayerTurn, 'highlighted'], false)
			.setIn([canChangePlayerTurn, canChangePlayerTurn, 'isQueen'], false).setIn([canChangePlayerTurn, canChangePlayerTurn, 'isEnemy'], false))
	}

	// if it can't eat anymore; turn off all the toggles and change player turn
	if (!canChangePlayerTurn) {

	}
	//selectedDraught = toggleTileHighlights(selectedDraught, playerTurn, false)

	// make this draught into a queen if it reaches the end of the board
	if (tile.get('y') === 10 || tile.get('y') === 0) {
		tile = tile.set('isQueen', true)
	}

	return {
		type: actionTypes.MOVE_DRAUGHT,
		tile: tile,
		formerSelectedDraught: selectedDraught,
		selectedDraught: tile.get('selected') ? tile : undefined,
		playerTurn: playerTurn
	}
}
