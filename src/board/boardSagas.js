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

const toggleNeighbourTileHighlight = (tile, highlightedTile, enemyPlayer, highlighted) => {
	if (tile.get(highlightedTile)) {
		// checks if it can eat
		if (tile.getIn([highlightedTile, 'player']) === enemyPlayer && tile.getIn([highlightedTile, highlightedTile]) && !tile.getIn([highlightedTile, highlightedTile, 'hasDraught'])) {
			tile = tile.withMutations((tile) => tile.setIn([highlightedTile, 'isEnemy'], highlighted).setIn([highlightedTile, highlightedTile, 'highlighted'], highlighted))
		} else if (!tile.getIn([highlightedTile, 'hasDraught'])) {
			tile = tile.setIn([highlightedTile, 'highlighted'], highlighted)
			if (tile.getIn([highlightedTile, highlightedTile]))
				tile = tile.setIn([highlightedTile, highlightedTile, 'highlighted'], false)
		} else if (tile.getIn([highlightedTile, 'hasDraught'])) {
			if (tile.getIn([highlightedTile, highlightedTile]))
				tile = tile.setIn([highlightedTile, highlightedTile, 'highlighted'], false)
		}
	}
	return tile
}

export const toggleTileHighlights = (tile, playerTurn, highlighted) => {
	const enemyPlayer = playerTurn === 1 ? 2 : 1

	if (playerTurn === 1 || tile.get('isQueen')) {
		tile = toggleNeighbourTileHighlight(tile, NEIGHBOUR_TILES.bottomLeftTile.tile, enemyPlayer, highlighted)
		tile = toggleNeighbourTileHighlight(tile, NEIGHBOUR_TILES.bottomRightTile.tile, enemyPlayer, highlighted)
	}

	if (playerTurn === 2 || tile.get('isQueen')) {
		tile = toggleNeighbourTileHighlight(tile, NEIGHBOUR_TILES.topLeftTile.tile, enemyPlayer, highlighted)
		tile = toggleNeighbourTileHighlight(tile, NEIGHBOUR_TILES.topRightTile.tile, enemyPlayer, highlighted)
	}

	const hasNeighbourEnemies = Object.keys(NEIGHBOUR_TILES).some((neighbour) => {
    return tile.getIn([neighbour, 'isEnemy']) ? true : false
	})

	if (hasNeighbourEnemies) {
		Object.keys(NEIGHBOUR_TILES).map((neighbour) => {
			if (tile.get(neighbour) && !tile.getIn([neighbour, 'isEnemy'])) {
				tile = tile.setIn([neighbour, 'highlighted'], false)
				if (tile.getIn([neighbour, neighbour]))
				tile = tile.setIn([neighbour, neighbour, 'highlighted'], false)
			}
      return neighbour
		})
	}
	return tile
}

function* removeNeedToEat(selectedDraught, neighbourTile) {
  let neighboursThatNeedsToEat = []
  Object.keys(NEIGHBOUR_TILES).map((neighbour) => {
    if (selectedDraught.getIn([neighbourTile, neighbour, 'needToEat'])) {
      neighboursThatNeedsToEat.push(neighbour)
    }
    return neighbour
  })
  let selectedDraughtNeighbour = selectedDraught.get(neighbourTile)
  for (let neighbourThatNeedsToEat of neighboursThatNeedsToEat) {
    selectedDraughtNeighbour = selectedDraughtNeighbour.setIn([neighbourThatNeedsToEat, 'needToEat'], false)
  }

  if (neighboursThatNeedsToEat.length > 0) {
    yield put(actions.highlightTile(selectedDraughtNeighbour))
  }
}

function* removeEnemy(selectedDraught, tile) {
		let enemyPosition = Object.keys(NEIGHBOUR_TILES).find((neighbour) => {
			return selectedDraught.getIn([neighbour, 'isEnemy']) && tile.get('id') === selectedDraught.getIn([neighbour, neighbour, 'id'])
		})

    if (enemyPosition !== undefined) {
			selectedDraught = selectedDraught.withMutations((mutatedTile) => mutatedTile.setIn([enemyPosition, 'isEnemy'], false)
			.setIn([enemyPosition, 'hasDraught'], false).setIn([enemyPosition, 'player'], undefined).setIn([enemyPosition, 'isQueen'], false))
			yield removeNeedToEat(selectedDraught, enemyPosition)
			yield put(actions.removeDraught(selectedDraught))
			return true
    }
    return false
}

function* removeSelectedDraught(selectedDraught, playerTurn) {
  selectedDraught = toggleTileHighlights(selectedDraught, playerTurn, false)
  selectedDraught = selectedDraught.withMutations((mutatedDraught) => mutatedDraught.set('selected', false).set('isQueen', false).set('hasDraught', false).set('player', undefined).set('needToEat', false))
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

function* moveSelectedDraughtToTile(tile, selectedDraught, playerTurn, previousDraughtMove, needToEat, compulsoryToEat) {
  tile = tile.withMutations((mutatedTile) => mutatedTile.set('hasDraught', true).set('player', selectedDraught.get('player'))
  .set('isQueen', tile.get('y') === 0 || tile.get('y') === 10 || selectedDraught.get('isQueen')).set('needToEat', needToEat))

	yield put(actions.moveDraught(tile, playerTurn, previousDraughtMove, compulsoryToEat))
  return tile
}

function* highlightFormerSelectedDraughtNeighboursNeedToEat(selectedDraught, playerTurn) {
  const enemyPlayer = playerTurn === 1 ? 2 : 1
  let compulsoryToEat = false

  Object.keys(NEIGHBOUR_TILES).map((neighbour) => {
    if (selectedDraught.get(neighbour) && selectedDraught.getIn([neighbour, 'player']) === playerTurn &&
    selectedDraught.getIn([neighbour, neighbour]) && selectedDraught.getIn([neighbour, neighbour, 'player']) === enemyPlayer) {
      selectedDraught = selectedDraught.setIn([neighbour, neighbour, 'needToEat'], true)
      compulsoryToEat = true
    }
    return neighbour
  })
	yield put(actions.highlightTile(selectedDraught))
  return compulsoryToEat
}

function* highlightTileNeighboursNeedToEat(tile, playerTurn) {
  const enemyPlayer = playerTurn === 1 ? 2 : 1
  let compulsoryToEat = false

  Object.keys(NEIGHBOUR_TILES).map((neighbour) => {
    if (tile.get(neighbour) && tile.getIn([neighbour, 'player']) === enemyPlayer) {
      if ((NEIGHBOUR_TILES[neighbour].player === playerTurn || tile.getIn([neighbour, 'isQueen'])) && tile.get(NEIGHBOUR_TILES[neighbour].oppositeTile)
			&& !tile.getIn([NEIGHBOUR_TILES[neighbour].oppositeTile, 'hasDraught'])) {
        tile = tile.setIn([neighbour, 'needToEat'], true)
        compulsoryToEat = true
      }
    }
    return neighbour
  })

	yield put(actions.highlightTile(tile))
  return { tile, compulsoryToEat }
}

function* highlightPreviousDraughtMove(previousDraughtMove, playerTurn, tile) {
  const enemyPlayer = playerTurn === 1 ? 2 : 1
  let compulsoryToEat = false

	if (previousDraughtMove !== undefined && previousDraughtMove.get('hasDraught')) {
		let tempPreviousDraughtMove = toggleTileHighlights(previousDraughtMove, enemyPlayer, true)
		compulsoryToEat = Object.keys(NEIGHBOUR_TILES).some((neighbour) => {
		  return tempPreviousDraughtMove.getIn([neighbour, 'isEnemy'])
		})

		if (compulsoryToEat) {
		  previousDraughtMove = previousDraughtMove.set('needToEat', true)
		} else {
		  previousDraughtMove = tile
		}
	} else {
	  previousDraughtMove = undefined
	}
	yield put(actions.highlightTile(previousDraughtMove))
  return { previousDraughtMove, compulsoryToEat }
}

export function* selectDraught(dispatch) {
	if (dispatch.selectedDraught !== undefined) {
		let selectedDraught = toggleTileHighlights(dispatch.selectedDraught, dispatch.playerTurn, false)
		selectedDraught = selectedDraught.set('selected', false)
		yield put(actions.selectDraught(undefined, selectedDraught))
	}

  const tiles = yield select(getTiles)
  let tile = tiles.get(dispatch.tile.get('id'))

  tile = toggleTileHighlights(tile, dispatch.playerTurn, !dispatch.tile.get('selected'))
  tile = tile.set('selected', !dispatch.tile.get('selected'))
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
    tile = yield moveSelectedDraughtToTile(tile, dispatch.selectedDraught, dispatch.playerTurn, dispatch.previousDraughtMove, true, true)
    tile = tile.set('selected', true)
    tile = toggleTileHighlights(tile, dispatch.playerTurn, true)
		yield put(actions.selectDraught(tile, tile))
  } else {
    tile = toggleTileHighlights(tile, dispatch.playerTurn, false)
    let compulsoryToEat = yield highlightFormerSelectedDraughtNeighboursNeedToEat(selectedDraught, dispatch.playerTurn)

    let updatedTile = yield highlightTileNeighboursNeedToEat(tile, dispatch.playerTurn)
		compulsoryToEat = compulsoryToEat || updatedTile.compulsoryToEat

    tiles = yield select(getTiles)
    let previousDraughtMove = dispatch.previousDraughtMove !== undefined ? tiles.get(dispatch.previousDraughtMove.get('id')) : undefined
    let updatedPreviousDraughtMove = yield highlightPreviousDraughtMove(previousDraughtMove, dispatch.playerTurn, updatedTile.tile)
		compulsoryToEat = compulsoryToEat || updatedPreviousDraughtMove.compulsoryToEat

		tile = yield moveSelectedDraughtToTile(updatedTile.tile, dispatch.selectedDraught, enemyPlayer,
			updatedPreviousDraughtMove.previousDraughtMove !== undefined ? updatedPreviousDraughtMove.previousDraughtMove : updatedTile.tile, false, compulsoryToEat)
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
