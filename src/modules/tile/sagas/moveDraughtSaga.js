import { put, select } from 'redux-saga/effects'
// find out how to do import * as actions
import * as module from '../ducks/tile'
import { updateBoard } from '../../board/ducks/board'
import { toggleTileHighlights } from '../containers/tileContainer'
import { NEIGHBOUR_TILES } from '../containers/tilesContainer'

export const getTiles = state => state.tilesReducer.tiles

const { highlightTile, removeDraught, selectDraught, moveDraught } = module

/**
 * Remove an enemy
 * @param  {Object}    selectedDraught The current selected draught
 * @param  {Object}    tile            The tile that the user click on
 * @return {Generator}                 Return true if an enemy has been removed, false otherwise
 */
export const removeEnemy = function*(selectedDraught, tile) {
	let enemyPosition = Object.keys(NEIGHBOUR_TILES).find((neighbour) => {
		return selectedDraught.getIn([neighbour, 'isEnemy']) && tile.get('id') === selectedDraught.getIn([neighbour, neighbour, 'id'])
	})

	if (enemyPosition !== undefined) {
		selectedDraught = selectedDraught.withMutations((mutatedTile) => mutatedTile.setIn([enemyPosition, 'isEnemy'], false)
		.setIn([enemyPosition, 'hasDraught'], false).setIn([enemyPosition, 'player'], undefined).setIn([enemyPosition, 'isQueen'], false))

		let selectedDraughtNeighbour = selectedDraught.get(enemyPosition)
		Object.keys(NEIGHBOUR_TILES).map((neighbour) => {
			selectedDraughtNeighbour = selectedDraughtNeighbour.setIn([neighbour, 'isAbleToEat'], false)
			return neighbour
		})
		yield put(highlightTile(selectedDraughtNeighbour))
		yield put(removeDraught(selectedDraught))
		return true
	}
  return false
}

/**
 * Remove a selected draught
 * @param  {Object}    selectedDraught The current selected draught
 * @param  {Object}    tile            The tile that the user click on
 * @return {Generator}                 Return the updated selected draught that is removed
 */
export const removeSelectedDraught = function*(selectedDraught, playerTurn) {
  selectedDraught = toggleTileHighlights(selectedDraught, playerTurn, false)
  selectedDraught = selectedDraught.withMutations((mutatedDraught) => mutatedDraught.set('isSelected', false).set('isQueen', false)
	.set('hasDraught', false).set('player', undefined).set('isAbleToEat', false))
  yield put(removeDraught(selectedDraught))
  return selectedDraught
}

/**
 * Check if the tile the user click on neighbours have any enemies
 * @param  {Object}  tile       The tile that the user click on
 * @param  {Boolean} isSelectedDraughtAQueen    Is the selected draught a queen
 * @param  {Number}  playerTurn The current players turn
 * @return {Boolean}             Return true if the tile neighbours have enemies
 */
export const checkIfTileNeighboursHaveEnemy = (tile, isSelectedDraughtAQueen, playerTurn) => {
	// this does not actually mutate the actual tiles, it only sets the necessary condition to see if this tile has enemies or not; this function will return a boolean not the tile itself
  tile = tile.set('isQueen', isSelectedDraughtAQueen)
  tile = toggleTileHighlights(tile, playerTurn, true)
	let hasEnemy = Object.keys(NEIGHBOUR_TILES).some((neighbour) => {
		return tile.getIn([neighbour, 'isEnemy'])
	})
  return hasEnemy
}

/**
 * Move the selected draught to the tile that the user click on
 * @param  {Object}  tile            The tile that the user click on
 * @param  {Object}  selectedDraught The current selected draught
 * @param  {Boolean} isAbleToEat     Return true if the tile is able to eat
 * @return {Object}                  Return the updated tile with its draught added
 */
export const moveSelectedDraughtToTile = (tile, selectedDraught, isAbleToEat) => {
  tile = tile.withMutations((mutatedTile) => mutatedTile.set('hasDraught', true).set('player', selectedDraught.get('player'))
  .set('isQueen', tile.get('y') === 0 || tile.get('y') === 10 || selectedDraught.get('isQueen')).set('isAbleToEat', isAbleToEat))

  return tile
}

/**
 * Set the selected draught neighbours to be able to eat if it can
 * @param  {Object}    selectedDraught The current selected draught
 * @param  {Number}    playerTurn      The current players turn
 * @return {Generator}                 Return true if the selected draught neighbours can eat
 */
export const setSelectedDraughtNeighboursToBeAbleToEatIfItCan = function*(selectedDraught, playerTurn) {
  const enemyPlayer = playerTurn === 1 ? 2 : 1
  let isAbleToEatAvailable = false

  Object.keys(NEIGHBOUR_TILES).map((neighbour) => {
    if (selectedDraught.get(neighbour) && selectedDraught.getIn([neighbour, 'player']) === playerTurn &&
    selectedDraught.getIn([neighbour, neighbour]) && selectedDraught.getIn([neighbour, neighbour, 'player']) === enemyPlayer) {
      selectedDraught = selectedDraught.setIn([neighbour, neighbour, 'isAbleToEat'], true)
      isAbleToEatAvailable = true
    }
    return neighbour
  })
	yield put(highlightTile(selectedDraught))
  return isAbleToEatAvailable
}

/**
 * Set the tile neighbours to be able to eat if it can
 * @param  {Object}    tile       The tile that the user clicks on
 * @param  {Number}    playerTurn The current players turn
 * @return {Generator}            Return the updated tile neighbours and true if it can eat
 */
export const setTileNeighboursToBeAbleToEatIfItCan = function*(tile, playerTurn) {
  const enemyPlayer = playerTurn === 1 ? 2 : 1
  let isAbleToEatAvailable = false

  Object.keys(NEIGHBOUR_TILES).map((neighbour) => {
    if (tile.get(neighbour) && tile.getIn([neighbour, 'player']) === enemyPlayer) {
      if ((NEIGHBOUR_TILES[neighbour].player === playerTurn || tile.getIn([neighbour, 'isQueen'])) && tile.get(NEIGHBOUR_TILES[neighbour].oppositeTile)
			&& !tile.getIn([NEIGHBOUR_TILES[neighbour].oppositeTile, 'hasDraught'])) {
        tile = tile.setIn([neighbour, 'isAbleToEat'], true)
        isAbleToEatAvailable = true
      }
    }

    if (tile.get(neighbour) && tile.getIn([neighbour, 'hasDraught']) && tile.getIn([neighbour, neighbour])
    && tile.getIn([neighbour, neighbour, 'hasDraught'])) {
    	tile = tile.setIn([neighbour, neighbour, 'isAbleToEat'], false)
    }
    return neighbour
  })

	yield put(highlightTile(tile))
  return { tile, isAbleToEatAvailable }
}

/**
 * Set the previous tile move to be able to eat if it can
 * @param  {Object}    previousMove The previous move
 * @param  {Object}    tile         The tile that the user clicks on
 * @param  {Number}    playerTurn   The current players turn
 * @return {Generator}              Return the updated previous move and true if it can eat
 */
export const setPreviousMoveToBeAbleToEatIfItCan = function*(previousMove, tile, playerTurn) {
	const enemyPlayer = playerTurn === 1 ? 2 : 1
	let isAbleToEatAvailable = false

	if (previousMove !== undefined && previousMove.get('hasDraught')) {
		let highlightedPreviousMove = toggleTileHighlights(previousMove, enemyPlayer, true)
		isAbleToEatAvailable = Object.keys(NEIGHBOUR_TILES).some((neighbour) => {
		  return highlightedPreviousMove.getIn([neighbour, 'isEnemy'])
		})

		if (!isAbleToEatAvailable) {
			previousMove = tile
		} else {
			previousMove = previousMove.set('isAbleToEat', true)
			yield put(highlightTile(previousMove))
		}
	} else {
	  previousMove = undefined
	}
  return { previousMove, isAbleToEatAvailable }
}

/**
 * Move the draught
 * @param  {Object}    dispatch A list of payloads
 * @return {Generator}          Return the updated tile and selected draught
 */
const moveDraughtSaga = function*(dispatch) {
  const enemyPlayer = dispatch.playerTurn === 1 ? 2 : 1
  let isEnemyRemoved = yield removeEnemy(dispatch.selectedDraught, dispatch.tile)

  let tiles = yield select(getTiles)
  let selectedDraught = tiles.get(dispatch.selectedDraught.get('id'))
  selectedDraught = yield removeSelectedDraught(selectedDraught, dispatch.playerTurn)

  tiles = yield select(getTiles)
  let tile = tiles.get(dispatch.tile.get('id'))

	// check if the player has eaten a piece and can eat more
  let canEatMore = isEnemyRemoved && checkIfTileNeighboursHaveEnemy(tile, dispatch.selectedDraught.get('isQueen'), dispatch.playerTurn)
  if (canEatMore) {
    tile = moveSelectedDraughtToTile(tile, dispatch.selectedDraught, true)
    yield put(moveDraught(tile))
    tile = tile.set('isSelected', true)
    tile = toggleTileHighlights(tile, dispatch.playerTurn, true)
		yield put(selectDraught(tile, tile))
  } else {
    tile = toggleTileHighlights(tile, dispatch.playerTurn, false)
    let isAbleToEatAvailable = yield setSelectedDraughtNeighboursToBeAbleToEatIfItCan(selectedDraught, dispatch.playerTurn)

    let updatedTile = yield setTileNeighboursToBeAbleToEatIfItCan(tile, dispatch.playerTurn)
		isAbleToEatAvailable = isAbleToEatAvailable || updatedTile.isAbleToEatAvailable

    tiles = yield select(getTiles)
    let previousMove = dispatch.previousMove !== undefined ? tiles.get(dispatch.previousMove.get('id')) : undefined
    let updatedPreviousMove = yield setPreviousMoveToBeAbleToEatIfItCan(previousMove, updatedTile.tile, dispatch.playerTurn)
		isAbleToEatAvailable = isAbleToEatAvailable || updatedPreviousMove.isAbleToEatAvailable

		updatedTile.tile = moveSelectedDraughtToTile(updatedTile.tile, dispatch.selectedDraught, false)
		yield put(moveDraught(updatedTile.tile))
		yield put(updateBoard(enemyPlayer, updatedPreviousMove.previousMove !== undefined ? updatedPreviousMove.previousMove : updatedTile.tile, isAbleToEatAvailable))
  }
}

export default moveDraughtSaga
