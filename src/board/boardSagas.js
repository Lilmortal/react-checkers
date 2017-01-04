import { takeLatest } from 'redux-saga'
import { put, select } from 'redux-saga/effects'
import * as actions from './boardActions'
import { START_SELECT_DRAUGHT, START_MOVE_DRAUGHT } from './boardActionTypes'

export const getTiles = state => state.draughtReducer.tiles

export const NEIGHBOUR_TILES = {
	topLeftTile: {
		tile: 'topLeftTile',
		oppositeTile: 'bottomRightTile',
		player: 2
	},
	topRightTile: {
		tile: 'topRightTile',
		oppositeTile: 'bottomLeftTile',
		player: 2
	},
	bottomLeftTile: {
		tile: 'bottomLeftTile',
		oppositeTile: 'topRightTile',
		player: 1
	},
	bottomRightTile: {
		tile: 'bottomRightTile',
		oppositeTile: 'topLeftTile',
		player: 1
	}
}

const toggleNeighbourTileHighlight = (tile, neighbourTile, enemyPlayer, isHighlighted) => {
	if (tile.get(neighbourTile)) {
		// checks if it can eat
		if (tile.getIn([neighbourTile, 'player']) === enemyPlayer && tile.getIn([neighbourTile, neighbourTile]) && !tile.getIn([neighbourTile, neighbourTile, 'hasDraught'])) {
			tile = tile.withMutations((tile) => tile.setIn([neighbourTile, 'isEnemy'], isHighlighted).setIn([neighbourTile, neighbourTile, 'isHighlighted'], isHighlighted))
		} else if (!tile.getIn([neighbourTile, 'hasDraught'])) {
			tile = tile.setIn([neighbourTile, 'isHighlighted'], isHighlighted)
			if (tile.getIn([neighbourTile, neighbourTile]))
				tile = tile.setIn([neighbourTile, neighbourTile, 'isHighlighted'], false)
		} else if (tile.getIn([neighbourTile, 'hasDraught'])) {
			if (tile.getIn([neighbourTile, neighbourTile]))
				tile = tile.setIn([neighbourTile, neighbourTile, 'isHighlighted'], false)
		}
	}
	return tile
}

export const toggleTileHighlights = (tile, playerTurn, isHighlighted) => {
	const enemyPlayer = playerTurn === 1 ? 2 : 1

	if (playerTurn === 1 || tile.get('isQueen')) {
		tile = toggleNeighbourTileHighlight(tile, NEIGHBOUR_TILES.bottomLeftTile.tile, enemyPlayer, isHighlighted)
		tile = toggleNeighbourTileHighlight(tile, NEIGHBOUR_TILES.bottomRightTile.tile, enemyPlayer, isHighlighted)
	}

	if (playerTurn === 2 || tile.get('isQueen')) {
		tile = toggleNeighbourTileHighlight(tile, NEIGHBOUR_TILES.topLeftTile.tile, enemyPlayer, isHighlighted)
		tile = toggleNeighbourTileHighlight(tile, NEIGHBOUR_TILES.topRightTile.tile, enemyPlayer, isHighlighted)
	}

	// all neighbours are diagonal
	const hasNeighbourEnemies = Object.keys(NEIGHBOUR_TILES).some((neighbour) => {
		return tile.getIn([neighbour, 'isEnemy']) ? true : false
	})

	if (hasNeighbourEnemies) {
		Object.keys(NEIGHBOUR_TILES).map((neighbour) => {
			if (tile.get(neighbour) && !tile.getIn([neighbour, 'isEnemy'])) {
				tile = tile.setIn([neighbour, 'isHighlighted'], false)
				if (tile.getIn([neighbour, neighbour]))
				tile = tile.setIn([neighbour, neighbour, 'isHighlighted'], false)
			}
			return neighbour
		})
	}
	return tile
}

function* setIsAbleToEatFalse(selectedDraught, neighbourTile) {
	let selectedDraughtNeighbour = selectedDraught.get(neighbourTile)
	Object.keys(NEIGHBOUR_TILES).map((neighbour) => {
		selectedDraughtNeighbour = selectedDraughtNeighbour.setIn([neighbour, 'isAbleToEat'], false)
		return neighbour
  })
  yield put(actions.highlightTile(selectedDraughtNeighbour))
}

function* removeEnemy(selectedDraught, tile) {
		let enemyPosition = Object.keys(NEIGHBOUR_TILES).find((neighbour) => {
			return selectedDraught.getIn([neighbour, 'isEnemy']) && tile.get('id') === selectedDraught.getIn([neighbour, neighbour, 'id'])
		})

		if (enemyPosition !== undefined) {
			selectedDraught = selectedDraught.withMutations((mutatedTile) => mutatedTile.setIn([enemyPosition, 'isEnemy'], false)
			.setIn([enemyPosition, 'hasDraught'], false).setIn([enemyPosition, 'player'], undefined).setIn([enemyPosition, 'isQueen'], false))
			yield setIsAbleToEatFalse(selectedDraught, enemyPosition)
			yield put(actions.removeDraught(selectedDraught))
			return true
		}
    return false
}

function* removeSelectedDraught(selectedDraught, playerTurn) {
  selectedDraught = toggleTileHighlights(selectedDraught, playerTurn, false)
  selectedDraught = selectedDraught.withMutations((mutatedDraught) => mutatedDraught.set('isSelected', false).set('isQueen', false).set('hasDraught', false).set('player', undefined).set('isAbleToEat', false))
  yield put(actions.removeDraught(selectedDraught))
  return selectedDraught
}

const checkIfTileHasEnemy = (tile, isQueen, playerTurn) => {
  tile = tile.set('isQueen', isQueen)
  tile = toggleTileHighlights(tile, playerTurn, true)
	let hasEnemy = Object.keys(NEIGHBOUR_TILES).some((neighbour) => {
		return tile.getIn([neighbour, 'isEnemy'])
	})
  return hasEnemy
}

function* moveSelectedDraughtToTile(tile, selectedDraught, playerTurn, previousSelectedDraught, previousMove, isAbleToEat, isAbleToEatAvailable) {
  tile = tile.withMutations((mutatedTile) => mutatedTile.set('hasDraught', true).set('player', selectedDraught.get('player'))
  .set('isQueen', tile.get('y') === 0 || tile.get('y') === 10 || selectedDraught.get('isQueen')).set('isAbleToEat', isAbleToEat))

	yield put(actions.moveDraught(tile, playerTurn, previousSelectedDraught, previousMove, isAbleToEatAvailable))
  return tile
}

function* checkIfFormerSelectedDraughtNeighboursAreAbleToEat(selectedDraught, playerTurn) {
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

function* checkIfTileNeighboursAreAbleToEat(tile, playerTurn) {
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
    return neighbour
  })

	yield put(actions.highlightTile(tile))
  return { tile, isAbleToEatAvailable }
}

function* checkIfPreviousMoveNeighboursAreAbleToEat(previousMove, playerTurn, tile) {
  const enemyPlayer = playerTurn === 1 ? 2 : 1
  let isAbleToEatAvailable = false

	if (previousMove !== undefined && previousMove.get('hasDraught')) {
		let highlightedPreviousMove = toggleTileHighlights(previousMove, enemyPlayer, true)
		isAbleToEatAvailable = Object.keys(NEIGHBOUR_TILES).some((neighbour) => {
		  return highlightedPreviousMove.getIn([neighbour, 'isEnemy'])
		})

		if (isAbleToEatAvailable) {
		  previousMove = previousMove.set('isAbleToEat', true)
		} else {
		  previousMove = tile
		}
	} else {
	  previousMove = undefined
	}
	yield put(actions.highlightTile(previousMove))
  return { previousMove, isAbleToEatAvailable }
}

export function* selectDraught(dispatch) {
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

export function* moveDraught(dispatch) {
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
    tile = yield moveSelectedDraughtToTile(tile, dispatch.selectedDraught, dispatch.playerTurn, dispatch.previousSelectedDraught, true, true)
    tile = tile.set('isSelected', true)
    tile = toggleTileHighlights(tile, dispatch.playerTurn, true)
		yield put(actions.selectDraught(tile, tile))
  } else {
    tile = toggleTileHighlights(tile, dispatch.playerTurn, false)
    let isAbleToEatAvailable = yield checkIfFormerSelectedDraughtNeighboursAreAbleToEat(selectedDraught, dispatch.playerTurn)

    let updatedTile = yield checkIfTileNeighboursAreAbleToEat(tile, dispatch.playerTurn)
		isAbleToEatAvailable = isAbleToEatAvailable || updatedTile.isAbleToEatAvailable

		Object.keys(NEIGHBOUR_TILES).map((neighbour) => {
			if (updatedTile.tile.getIn([neighbour, 'player']) === enemyPlayer && updatedTile.tile.getIn([neighbour, neighbour, 'player']) === dispatch.playerTurn) {
				updatedTile.tile = updatedTile.tile.setIn([neighbour, neighbour, 'isAbleToEat'], false)
			}
			return neighbour
		})
		yield put(actions.highlightTile(updatedTile.tile))

		tiles = yield select(getTiles)
		let previousSelectedDraught = dispatch.previousSelectedDraught !== undefined ? tiles.get(dispatch.previousSelectedDraught.get('id')) : undefined
		let updatedpreviousSelectedDraught = yield checkIfPreviousMoveNeighboursAreAbleToEat(previousSelectedDraught, dispatch.playerTurn, selectedDraught)
		isAbleToEatAvailable = isAbleToEatAvailable || updatedpreviousSelectedDraught.previousMove

    tiles = yield select(getTiles)
    let previousMove = dispatch.previousMove !== undefined ? tiles.get(dispatch.previousMove.get('id')) : undefined
    let updatedPreviousMove = yield checkIfPreviousMoveNeighboursAreAbleToEat(previousMove, dispatch.playerTurn, updatedTile.tile)
		isAbleToEatAvailable = isAbleToEatAvailable || updatedPreviousMove.isAbleToEatAvailable

		tile = yield moveSelectedDraughtToTile(updatedTile.tile, dispatch.selectedDraught, enemyPlayer,
			updatedpreviousSelectedDraught.previousMove !== undefined ? updatedpreviousSelectedDraught.previousMove : selectedDraught,
			updatedPreviousMove.previousMove !== undefined ? updatedPreviousMove.previousMove : updatedTile.tile, false, isAbleToEatAvailable)
  }
}

export function* watchUpdateTiles() {
    yield takeLatest(START_SELECT_DRAUGHT, selectDraught)
    yield takeLatest(START_MOVE_DRAUGHT, moveDraught)
}

export default function* rootSaga() {
  yield [
    watchUpdateTiles()
  ]
}
