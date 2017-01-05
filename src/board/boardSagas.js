import { takeLatest } from 'redux-saga'
import { put, select } from 'redux-saga/effects'
import * as actions from './boardActions'
import { START_SELECT_DRAUGHT, START_MOVE_DRAUGHT } from './boardActionTypes'
import { toggleTileHighlights } from '../tile/tile'
import { NEIGHBOUR_TILES } from '../tiles/tiles'

export const getTiles = state => state.boardReducer.tiles

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
		yield put(actions.highlightTile(selectedDraughtNeighbour))
		yield put(actions.removeDraught(selectedDraught))
		return true
	}
  return false
}

export const removeSelectedDraught = function*(selectedDraught, playerTurn) {
  selectedDraught = toggleTileHighlights(selectedDraught, playerTurn, false)
  selectedDraught = selectedDraught.withMutations((mutatedDraught) => mutatedDraught.set('isSelected', false).set('isQueen', false)
	.set('hasDraught', false).set('player', undefined).set('isAbleToEat', false))
  yield put(actions.removeDraught(selectedDraught))
  return selectedDraught
}

export const checkIfTileHasEnemy = (tile, isQueen, playerTurn) => {
	// this does not actually mutate the actual tiles, it only sets the necessary condition to see if this tile has enemies or not; this function will return a boolean not the tile itself
  tile = tile.set('isQueen', isQueen)
  tile = toggleTileHighlights(tile, playerTurn, true)
	let hasEnemy = Object.keys(NEIGHBOUR_TILES).some((neighbour) => {
		return tile.getIn([neighbour, 'isEnemy'])
	})
  return hasEnemy
}

export const moveSelectedDraughtToTile = (tile, selectedDraught, isAbleToEat) => {
  tile = tile.withMutations((mutatedTile) => mutatedTile.set('hasDraught', true).set('player', selectedDraught.get('player'))
  .set('isQueen', tile.get('y') === 0 || tile.get('y') === 10 || selectedDraught.get('isQueen')).set('isAbleToEat', isAbleToEat))

  return tile
}

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
	yield put(actions.highlightTile(selectedDraught))
  return isAbleToEatAvailable
}

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

	yield put(actions.highlightTile(tile))
  return { tile, isAbleToEatAvailable }
}

export const setPreviousMove = function*(previousMove, tile, playerTurn) {
	const enemyPlayer = playerTurn === 1 ? 2 : 1
	let isAbleToEatAvailable = false

	if (previousMove !== undefined && previousMove.get('hasDraught')) {
		let highlightedPreviousMove = toggleTileHighlights(previousMove, enemyPlayer, true)
		isAbleToEatAvailable = Object.keys(NEIGHBOUR_TILES).some((neighbour) => {
		  return highlightedPreviousMove.getIn([neighbour, 'isEnemy'])
		})

		if (!isAbleToEatAvailable) {
			previousMove = tile
		}
	} else {
	  previousMove = undefined
	}
	yield put(actions.highlightTile(previousMove))
  return { previousMove, isAbleToEatAvailable }
}

export const selectDraught = function*(dispatch) {
	if (dispatch.selectedDraught !== undefined) {
		let selectedDraught = toggleTileHighlights(dispatch.selectedDraught, dispatch.playerTurn, false)
		selectedDraught = selectedDraught.set('isSelected', false)
		yield put(actions.selectDraught(undefined, selectedDraught))
	}

  const tiles = yield select(getTiles)
  let tile = tiles.get(dispatch.tile.get('id'))

  tile = toggleTileHighlights(tile, dispatch.playerTurn, !dispatch.tile.get('isSelected'))
  tile = tile.set('isSelected', !dispatch.tile.get('isSelected'))
	yield put(actions.selectDraught(tile, tile))
}

export const moveDraught = function*(dispatch) {
  const enemyPlayer = dispatch.playerTurn === 1 ? 2 : 1
  let isEnemyRemoved = yield removeEnemy(dispatch.selectedDraught, dispatch.tile)

  let tiles = yield select(getTiles)
  let selectedDraught = tiles.get(dispatch.selectedDraught.get('id'))
  selectedDraught = yield removeSelectedDraught(selectedDraught, dispatch.playerTurn)

  tiles = yield select(getTiles)
  let tile = tiles.get(dispatch.tile.get('id'))

	// check if the player has eaten a piece and can eat more
  let canEatMore = isEnemyRemoved && checkIfTileHasEnemy(tile, dispatch.selectedDraught.get('isQueen'), dispatch.playerTurn)
  if (canEatMore) {
    tile = moveSelectedDraughtToTile(tile, dispatch.selectedDraught, true)
    yield put(actions.moveDraught(tile, dispatch.playerTurn, dispatch.previousMove, dispatch.isAbleToEatAvailable))
    tile = tile.set('isSelected', true)
    tile = toggleTileHighlights(tile, dispatch.playerTurn, true)
	yield put(actions.selectDraught(tile, tile))
  } else {
    tile = toggleTileHighlights(tile, dispatch.playerTurn, false)
    let isAbleToEatAvailable = yield setSelectedDraughtNeighboursToBeAbleToEatIfItCan(selectedDraught, dispatch.playerTurn)

    let updatedTile = yield setTileNeighboursToBeAbleToEatIfItCan(tile, dispatch.playerTurn)
	isAbleToEatAvailable = isAbleToEatAvailable || updatedTile.isAbleToEatAvailable

    tiles = yield select(getTiles)
    let previousMove = dispatch.previousMove !== undefined ? tiles.get(dispatch.previousMove.get('id')) : undefined
    let updatedPreviousMove = yield setPreviousMove(previousMove, updatedTile.tile, dispatch.playerTurn)
    if (updatedPreviousMove.isAbleToEatAvailable) {
    	updatedPreviousMove.previousMove = updatedPreviousMove.previousMove.set('isAbleToEat', true)
    }
	isAbleToEatAvailable = isAbleToEatAvailable || updatedPreviousMove.isAbleToEatAvailable

	updatedTile.tile = moveSelectedDraughtToTile(updatedTile.tile, dispatch.selectedDraught, false)
	yield put(actions.moveDraught(updatedTile.tile, enemyPlayer,
	updatedPreviousMove.previousMove !== undefined ? updatedPreviousMove.previousMove : updatedTile.tile, isAbleToEatAvailable))
  }
}

function* watchUpdateTiles() {
	// I dont know about putting fork in here... what if move draught run faster and select draught overwrites the state of move draught (e.g. )
  yield takeLatest(START_SELECT_DRAUGHT, selectDraught)
  yield takeLatest(START_MOVE_DRAUGHT, moveDraught)
}

// in future think about how to structure the folders such that this can be seperated into draughtSaga and tileSaga and put this rootSaga outside
export default function* rootSaga() {
  yield [
    watchUpdateTiles()
  ]
}
