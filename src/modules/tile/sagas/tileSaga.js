import * as actions from '../actions'
import * as selectors from '../selectors'
import draughtModule from '../../draught'
import { getTileNeighboursHighlightsToggled } from '../../../shared/tileUtils'
import { fromJS } from 'immutable'
import { put, select } from 'redux-saga/effects'

const { tilesSelector, selectedDraughtIdSelector, playerTurnSelector, isAbleToEatAvailableSelector, previousMoveIdSelector } = selectors

/**
 * Move the selected draught to the tile that the user click on
 * @param  {Object}  tile            The tile that the user click on
 * @param  {Object}  selectedDraught The current selected draught
 * @param  {Boolean} isAbleToEat     Return true if the tile is able to eat
 * @return {Object}                  Return the updated tile with its draught added
 */
export const moveSelectedDraughtToTile = function*(tile, selectedTile, isAbleToEat, enemy = undefined) {
  const selectedDraught = selectedTile.get('draught')
  const draught = fromJS({
    id: selectedTile.get('id'),
    isSelected: false,
    player: selectedDraught.get('player'),
    isQueen: selectedDraught.get('isQueen')
    || (tile.get('y') === 0 && selectedDraught.get('player') === 2)
    || (tile.get('y') === 10 && selectedDraught.get('player') === 1),
    canSelectDraught: false
  })
  tile = tile.withMutations(mutatedTile => mutatedTile.set('hasDraught', true).set('isAbleToEat', isAbleToEat).set('draught', draught))

  selectedTile = selectedTile.withMutations(mutatedSelectedDraught => mutatedSelectedDraught.set('hasDraught', false).set('player', undefined)
  .set('isQueen', false).set('isAbleToEat', false).set('draught', undefined))

  if (enemy !== undefined) {
    enemy = enemy.withMutations(mutatedEnemy => mutatedEnemy.set('hasDraught', false).set('player', undefined).set('isQueen', false).set('isEnemy', false).set('draught', undefined))
    yield put(actions.REMOVE_DRAUGHT(enemy.get('id'), enemy))
  }
  yield put(actions.REMOVE_DRAUGHT(selectedTile.get('id'), selectedTile))
  yield put(actions.ADD_DRAUGHT(tile.get('id'), tile))
}

/**
 * Set the selected draught neighbours to be able to eat if it can
 * @param  {Object}    selectedDraught The current selected draught
 * @param  {Number}    playerTurn      The current players turn
 * @return {Generator}                 Return true if the selected draught neighbours can eat
 */
/*export const setSelectedDraughtNeighboursToBeAbleToEatIfItCan = function*(selectedDraught, playerTurn) {
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

	if (isAbleToEatAvailable) {
		const tiles = yield select(getTiles)
		yield put(actions.highlightTile(tiles, selectedDraught))
	}
  return selectedDraught
}*/

/**
 * Set the tile neighbours to be able to eat if it can
 * @param  {Object}    tile       The tile that the user clicks on
 * @param  {Number}    playerTurn The current players turn
 * @return {Generator}            Return the updated tile neighbours and true if it can eat
 */
/*export const setTileNeighboursToBeAbleToEatIfItCan = function*(tile, playerTurn) {
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

	if (isAbleToEatAvailable) {
		const tiles = yield select(getTiles)
		yield put(actions.highlightTile(tiles, tile))
	}

	return tile
}*/

/**
 * Set the previous tile move to be able to eat if it can
 * @param  {Object}    previousMove The previous move
 * @param  {Object}    tile         The tile that the user clicks on
 * @param  {Number}    playerTurn   The current players turn
 * @return {Generator}              Return the updated previous move and true if it can eat
 */
/*export const setPreviousMoveToBeAbleToEatIfItCan = function*(previousMove, tile, playerTurn) {
	const enemyPlayer = playerTurn === 1 ? 2 : 1
	let isAbleToEatAvailable = false

	if (previousMove !== undefined && previousMove.get('hasDraught')) {
		let highlightedPreviousMove = toggleTileHighlights(previousMove, enemyPlayer, true)
		isAbleToEatAvailable = Object.keys(NEIGHBOUR_TILES).some((neighbour) => {
		  return highlightedPreviousMove.getIn([neighbour, 'isEnemy'])
		})

		if (isAbleToEatAvailable) {
			previousMove = previousMove.set('isAbleToEat', true)
			const tiles = yield select(getTiles)
			yield put(actions.highlightTile(tiles, previousMove))
		}
	}

  return previousMove
}*/

const NEIGHBOUR_TILES = ['topLeftTileId', 'topRightTileId', 'bottomLeftTileId', 'bottomRightTileId']
/**
 * Move the draught
 * @param  {Object}    dispatch A list of payloads
 * @return {Generator}          Return the updated tile and selected draught
 */
export const moveDraughtSaga = function*(dispatch) {
  let tiles = yield select(tilesSelector)
  let playerTurn = yield select(playerTurnSelector)
  let isAbleToEatAvailable = yield select(isAbleToEatAvailableSelector)
  let previousMoveId = yield select(previousMoveIdSelector)

  const selectedDraughtId = yield select(selectedDraughtIdSelector)
  let selectedTile = tiles.get(selectedDraughtId)

  let tile = tiles.get(dispatch.id)
  let canEatMore = false

  let enemy = undefined

  // check if can eat more
  for (let neighbourTileId of NEIGHBOUR_TILES) {
    const selectedTileNeighbour = tiles.get(selectedTile.get(neighbourTileId))
    if (selectedTileNeighbour && selectedTileNeighbour.get('isEnemy') && selectedTileNeighbour.get(neighbourTileId) === dispatch.id) {
      enemy = selectedTileNeighbour
      // here you are passing tile, but tile does not have a draught; so we fake add a draught and remove it later
      const draught = fromJS({
        player: selectedTile.get('draught').get('player'),
        isQueen: selectedTile.get('draught').get('isQueen')
      })
      tile = tile.set('draught', draught)
      const tileToBeUpdated = getTileNeighboursHighlightsToggled(tiles, tile, playerTurn)
      tile = tile.set('draught', undefined)
      for (let tileNeighbour of tileToBeUpdated) {
        if (tileNeighbour.tile.get('isEnemy')) {
          canEatMore = true
          yield put(actions.HIGHLIGHT_NEIGHBOUR_TILES(tileToBeUpdated))
          // update tiles state
          tiles = yield select(tilesSelector)
          tile = tiles.get(dispatch.id)
          selectedTile = tiles.get(selectedDraughtId)
          break
        }
      }
    }
  }

  // toggle selected draught neighbour highlights
  const selectedDraughtNeighbourTilesToBeUpdated = getTileNeighboursHighlightsToggled(tiles, selectedTile, playerTurn)
  yield put(actions.HIGHLIGHT_NEIGHBOUR_TILES(selectedDraughtNeighbourTilesToBeUpdated))
  // update tiles state
  tiles = yield select(tilesSelector)
  tile = tiles.get(dispatch.id)
  selectedTile = tiles.get(selectedDraughtId)

  // move selected draught to tile
  yield moveSelectedDraughtToTile(tile, selectedTile, canEatMore, enemy)
  // update tiles state
  tiles = yield select(tilesSelector)
  tile = tiles.get(dispatch.id)
  selectedTile = tiles.get(selectedDraughtId)

  if (canEatMore) {
    // select the draught if can eat more
    tile = tile.set('draught', tile.get('draught').set('isSelected', true))
    yield put(draughtModule.actions.SELECT_DRAUGHT(dispatch.id, tile))
    yield put(actions.UPDATE_BOARD(dispatch.id, previousMoveId, playerTurn, isAbleToEatAvailable))
  } else {
    const enemyTurn = playerTurn === 1 ? 2 : 1
    yield put(actions.UPDATE_BOARD(undefined, previousMoveId, enemyTurn, isAbleToEatAvailable))
  }
  /*const enemyPlayer = dispatch.playerTurn === 1 ? 2 : 1
	let selectedDraughtEnemyPosition = Object.keys(NEIGHBOUR_TILES).find((neighbour) => {
		if (dispatch.selectedDraught.getIn([neighbour, 'isEnemy']) && dispatch.tile.get('id') === dispatch.selectedDraught.getIn([neighbour, neighbour, 'id'])) {
			return neighbour
		}
		return undefined
	})

	if (selectedDraughtEnemyPosition !== undefined) {
		yield removeEnemy(dispatch.selectedDraught, selectedDraughtEnemyPosition)
	}

  let tiles = yield select(getTiles)
  yield removeSelectedDraught(tiles.get(dispatch.selectedDraught.get('id')), dispatch.playerTurn)

  tiles = yield select(getTiles)
  let tile = tiles.get(dispatch.tile.get('id'))

	// check if the player has eaten a piece and can eat more
  let canEatMore = selectedDraughtEnemyPosition !== undefined && checkIfTileNeighboursHaveEnemy(tile, dispatch.selectedDraught.get('isQueen'), dispatch.playerTurn)
  if (canEatMore) {
    tile = yield moveSelectedDraughtToTile(tile, dispatch.selectedDraught, true)
    tile = tile.set('isSelected', true)
    tile = toggleTileHighlights(tile, dispatch.playerTurn, true)
		yield put(actions.selectDraught(tile, tile))
  } else {
    tile = toggleTileHighlights(tile, dispatch.playerTurn, false)
    const updatedSelectedDraught = yield setSelectedDraughtNeighboursToBeAbleToEatIfItCan(dispatch.selectedDraught, dispatch.playerTurn)
		let isAbleToEatAvailable = dispatch.selectedDraught !== updatedSelectedDraught

    let updatedTile = yield setTileNeighboursToBeAbleToEatIfItCan(tile, dispatch.playerTurn)
		isAbleToEatAvailable = isAbleToEatAvailable || tile !== updatedTile

    tiles = yield select(getTiles)
    const previousMove = dispatch.previousMove !== undefined ? tiles.get(dispatch.previousMove.get('id')) : undefined
    const updatedPreviousMove = yield setPreviousMoveToBeAbleToEatIfItCan(previousMove, updatedTile, dispatch.playerTurn)
		isAbleToEatAvailable = isAbleToEatAvailable || previousMove !== updatedPreviousMove

		updatedTile = yield moveSelectedDraughtToTile(updatedTile, dispatch.selectedDraught, false)
		yield put(board.actions.updateBoard(enemyPlayer, updatedTile, isAbleToEatAvailable))
  }*/
}
