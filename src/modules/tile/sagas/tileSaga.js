import { fromJS } from 'immutable'
import { put, select } from 'redux-saga/effects'

import { getTileNeighboursHighlightsToggled } from '../../../shared/tileUtils'
import draughtModule from '../../draught'
import * as actions from '../actions'
import * as selectors from '../selectors'

const { tilesSelector, selectedDraughtIdSelector, playerTurnSelector, previousMoveIdSelector } = selectors

const NEIGHBOUR_TILES = [
  {id: 'topLeftTileId', player: 2},
  {id: 'topRightTileId', player: 2},
  {id: 'bottomLeftTileId', player: 1},
  {id: 'bottomRightTileId', player: 1}
]

const OPPOSITE_TILE = {topLeftTileId: 'bottomRightTileId', topRightTileId: 'bottomLeftTileId', bottomLeftTileId: 'topRightTileId', bottomRightTileId: 'topLeftTileId'}

/**
 * Move the selected draught to the tile that the user click on
 * @param  {Object}  tile            The tile that the user click on
 * @param  {Object}  selectedTile    The current selected tile
 * @param  {Boolean} isAbleToEat     Return true if the tile is able to eat
 * @param  {Object}  enemy           The enemy
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
 * Set the selected tile neighbours to be able to eat if it can
 * @param  {Object}    selectedTile    The current selected tile
 * @param  {Number}    playerTurn      The current player's turn
 * @return {Generator}                 Return true if the selected tile neighbours can eat
 */
export const highlightSelectedTileNeighboursToBeAbleToEatIfItCan = function*(selectedTile, playerTurn) {
  const tiles = yield select(tilesSelector)
  const enemyPlayer = playerTurn === 1 ? 2 : 1
  let neighbourTilesToBeUpdated = []

  for (let neighbourTileObj of NEIGHBOUR_TILES) {
    if (neighbourTileObj.player !== playerTurn && !selectedTile.get('isQueen')) {
      continue
    }
    let neighbourTileId = neighbourTileObj.id
    let neighbourTile = tiles.get(selectedTile.get(neighbourTileId))
    if (neighbourTile && neighbourTile.get('hasDraught')) {
      let neighbourDraught = neighbourTile.get('draught')
      let neighbourNeighbourTile = tiles.get(neighbourTile.get(neighbourTileId))
      if (neighbourNeighbourTile && neighbourNeighbourTile.get('hasDraught')) {
        let neighbourNeighbourDraught = neighbourNeighbourTile.get('draught')
        if (neighbourDraught.get('player') === playerTurn && neighbourNeighbourDraught.get('player') === enemyPlayer) {
          neighbourNeighbourTile = neighbourNeighbourTile.set('isAbleToEat', true)
          neighbourTilesToBeUpdated.push({id: neighbourNeighbourTile.get('id'), tile: neighbourNeighbourTile})
        }
      }
    }
  }

  if (neighbourTilesToBeUpdated.length > 0) {
    yield put(actions.HIGHLIGHT_NEIGHBOUR_TILES(neighbourTilesToBeUpdated))
    return true
  }
  return false
}

/**
 * Set the tile neighbours to be able to eat if it can
 * @param  {Object}    tile       The tile that the user clicks on
 * @param  {Number}    playerTurn The current players turn
 * @return {Generator}            Return true if the tile neighbours can eat
 */
export const setTileNeighboursToBeAbleToEatIfItCan = function*(tile, playerTurn) {
  const enemyPlayer = playerTurn === 1 ? 2 : 1
  const tiles = yield select(tilesSelector)
  let neighbourTilesToBeUpdated = []

  for (let neighbourTileObj of NEIGHBOUR_TILES) {
    if (neighbourTileObj.player !== playerTurn && !tile.get('isQueen')) {
      continue
    }
    let neighbourTileId = neighbourTileObj.id
    let neighbourTile = tiles.get(tile.get(neighbourTileId))
    if (neighbourTile && neighbourTile.get('hasDraught')) {
      let neighbourDraught = neighbourTile.get('draught')
      let oppositeTile = tiles.get(tile.get(OPPOSITE_TILE[neighbourTileId]))
      if (neighbourDraught.get('player') === enemyPlayer && oppositeTile && !oppositeTile.get('hasDraught')) {
        neighbourTile = neighbourTile.set('isAbleToEat', true)
        neighbourTilesToBeUpdated.push({id: neighbourTile.get('id'), tile: neighbourTile})
      }
    }
  }

  if (neighbourTilesToBeUpdated.length > 0) {
    yield put(actions.HIGHLIGHT_NEIGHBOUR_TILES(neighbourTilesToBeUpdated))
    return true
  }
  return false
}

/**
 * Set the previous tile move to be able to eat if it can
 * @param  {Object}    previousMoveId The previous move id
 * @param  {Number}    playerTurn     The current players turn
 * @return {Generator}                Return true if previous tile can eat
 */
export const setPreviousMoveToBeAbleToEatIfItCan = function*(previousMoveId, playerTurn) {
  const tiles = yield select(tilesSelector)
  let previousMove = tiles.get(previousMoveId)
  let previousTileToBeUpdated = []
	if (previousMove !== undefined && previousMove.get('hasDraught') && !previousMove.get('isAbleToEat')) {
    const previousDraught = previousMove.get('draught')
    for (let neighbourTileObj of NEIGHBOUR_TILES) {
      if (neighbourTileObj.player === playerTurn && !previousDraught.get('isQueen')) {
        continue
      }
      let neighbourTileId = neighbourTileObj.id
      let neighbourTile = tiles.get(previousMove.get(neighbourTileId))
      if (neighbourTile && neighbourTile.get('hasDraught')) {
        const neighbourDraught = neighbourTile.get('draught')
        if (neighbourDraught.get('player') === playerTurn) {
          const neighbourNeighbourTile = tiles.get(neighbourTile.get(neighbourTileId))
          if (!neighbourNeighbourTile.get('hasDraught')) {
            previousMove = previousMove.set('isAbleToEat', true)
            previousTileToBeUpdated.push({id: previousMoveId, tile: previousMove})
            break
          }
        }
      }
    }

		if (previousTileToBeUpdated.length > 0) {
			yield put(actions.HIGHLIGHT_NEIGHBOUR_TILES(previousTileToBeUpdated))
      return true
		}
	}
  return false
}

/**
 * Remove all isAbleToEat highlights that the enemy toggled.
 * @param  {Object}    enemy The enemy.
 */
export const removeEnemyNeighbourHighlights = function*(enemy) {
  const tiles = yield select(tilesSelector)
  let enemyNeighbourTilesToBeUpdated = []
  for (let neighbourTileObj of NEIGHBOUR_TILES) {
    let neighbourTileId = neighbourTileObj.id
    let enemyNeighbourTile = tiles.get(enemy.get(neighbourTileId))
    if (enemyNeighbourTile && enemyNeighbourTile.get('isAbleToEat')) {
      enemyNeighbourTile = enemyNeighbourTile.set('isAbleToEat', false)
      enemyNeighbourTilesToBeUpdated.push({id: enemyNeighbourTile.get('id'), tile: enemyNeighbourTile})
    }
  }
  if (enemyNeighbourTilesToBeUpdated.length > 0) {
    yield put(actions.HIGHLIGHT_NEIGHBOUR_TILES(enemyNeighbourTilesToBeUpdated))
  }
}

/**
 * Move the draught by removing the selected draught, adding the draught to the tile and toggle highlights all relevant tiles.
 * @param  {Object}    dispatch A list of payloads
 */
export const moveDraughtSaga = function*(dispatch) {
  let playerTurn = yield select(playerTurnSelector)
  const selectedDraughtId = yield select(selectedDraughtIdSelector)
  let previousMoveId = yield select(previousMoveIdSelector)
  let tiles = yield select(tilesSelector)

  let selectedTile = tiles.get(selectedDraughtId)

  let tile = tiles.get(dispatch.id)
  let canEatMore = false

  let enemy = undefined

  // check if can eat more
  for (let neighbourTileObj of NEIGHBOUR_TILES) {
    let neighbourTileId = neighbourTileObj.id
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
    yield put(actions.UPDATE_BOARD(dispatch.id, previousMoveId, playerTurn, true))
  } else {
    const enemyTurn = playerTurn === 1 ? 2 : 1
    let selectedTileNeighbourIsAbleToEat = yield highlightSelectedTileNeighboursToBeAbleToEatIfItCan(selectedTile, playerTurn)
    let tileNeighbourIsAbleToEat = yield setTileNeighboursToBeAbleToEatIfItCan(tile, playerTurn)
    let previousMoveNeighbourIsAbleToEat = yield setPreviousMoveToBeAbleToEatIfItCan(previousMoveId, playerTurn)
    let isAbleToEatAvailable = selectedTileNeighbourIsAbleToEat || tileNeighbourIsAbleToEat || previousMoveNeighbourIsAbleToEat

    if (enemy !== undefined) {
      yield removeEnemyNeighbourHighlights(enemy)
    }
    if (previousMoveId && tiles.get(previousMoveId) && !tiles.get(previousMoveId).get('hasDraught')) {
      previousMoveId = undefined
    } else {
      previousMoveId = tile.get('id')
    }

    yield put(actions.UPDATE_BOARD(undefined, previousMoveId, enemyTurn, isAbleToEatAvailable))
  }
}
