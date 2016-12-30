import { takeLatest } from 'redux-saga'
import { put, call, select } from 'redux-saga/effects'
import * as actionTypes from './boardActionTypes'
export const getTiles = state => state.draughtReducer.tiles

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
        return neighbourTile
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
    return neighbour
	})

	if (hasNeighbourEnemies) {
		Object.keys(NEIGHBOUR_TILES).map((neighbour) => {
			if (tile.get(NEIGHBOUR_TILES[neighbour]) && !tile.getIn([NEIGHBOUR_TILES[neighbour], 'isEnemy'])) {
				tile = tile.setIn([NEIGHBOUR_TILES[neighbour], 'highlighted'], false)
				if (tile.getIn([NEIGHBOUR_TILES[neighbour], NEIGHBOUR_TILES[neighbour]]))
				tile = tile.setIn([NEIGHBOUR_TILES[neighbour], NEIGHBOUR_TILES[neighbour], 'highlighted'], false)
			}
      return neighbour
		})
	}

	return tile
}

function* toggleSelectedDraught(dispatch) {
  if (dispatch.selectedDraught !== undefined) {
      let selectedDraught = toggleTileHighlights(dispatch.selectedDraught, dispatch.playerTurn, false)
      selectedDraught = selectedDraught.set('selected', false)
      yield put({ type: actionTypes.SELECT_DRAUGHT, tile: selectedDraught, selectedDraught: undefined })
      return true
  }
  return false
}

// UPDATE TILES, IT ONLY UPDATE THE SELECTED DRAUGHT, NOT THE ENTIRE BOARD
export function* selectDraught(dispatch) {
  const isSelectedDraughtUpdated = yield call(toggleSelectedDraught, dispatch)

  const tiles = yield select(getTiles)
  let tile = tiles.get(dispatch.tile.get('id'))

  tile = toggleTileHighlights(tile, dispatch.playerTurn, !isSelectedDraughtUpdated && dispatch.selectedDraught !== undefined ? false : !dispatch.tile.get('selected'))
  tile = tile.set('selected', !isSelectedDraughtUpdated && dispatch.selectedDraught !== undefined ? false : !dispatch.tile.get('selected'))
  yield put({ type: actionTypes.SELECT_DRAUGHT, tile: tile, selectedDraught: tile })
}

function* removeNeedToEat(selectedDraught, neighbourTile) {
  let neighboursThatNeedsToEat = []
  Object.keys(NEIGHBOUR_TILES).map((neighbour) => {
    if (selectedDraught.getIn([neighbourTile, NEIGHBOUR_TILES[neighbour], 'needToEat'])) {
      neighboursThatNeedsToEat.push(neighbour)
    }
    return neighbour
  })
  let neighbour = selectedDraught.get(neighbourTile)
  for (let neighbourThatNeedsToEat of neighboursThatNeedsToEat) {
    neighbour = neighbour.setIn([NEIGHBOUR_TILES[neighbourThatNeedsToEat], 'needToEat'], false)
  }

  if (neighboursThatNeedsToEat.length > 0) {
    yield put ({ type: actionTypes.HIGHLIGHT_TILE, tile: neighbour })
  }
}

function* removeEnemy(selectedDraught, tile) {
    let canEat = false
    if (selectedDraught.getIn(['topLeftTile', 'isEnemy']) && tile.get('id') === selectedDraught.getIn(['topLeftTile', 'topLeftTile', 'id'])) {
      selectedDraught = selectedDraught.withMutations((mutatedTile) => mutatedTile.setIn(['topLeftTile', 'isEnemy'], false)
      .setIn(['topLeftTile', 'hasDraught'], false).setIn(['topLeftTile', 'player'], undefined).setIn(['topLeftTile', 'isQueen'], false))
      yield removeNeedToEat(selectedDraught, 'topLeftTile')
      canEat = true
    } else if (selectedDraught.getIn(['topRightTile', 'isEnemy']) && tile.get('id') === selectedDraught.getIn(['topRightTile', 'topRightTile', 'id'])) {
      selectedDraught = selectedDraught.withMutations((mutatedTile) => mutatedTile.setIn(['topRightTile', 'isEnemy'], false)
      .setIn(['topRightTile', 'hasDraught'], false).setIn(['topRightTile', 'player'], undefined).setIn(['topRightTile', 'isQueen'], false))
      yield removeNeedToEat(selectedDraught, 'topRightTile')
      canEat = true
    } else if (selectedDraught.getIn(['bottomLeftTile', 'isEnemy']) && tile.get('id') === selectedDraught.getIn(['bottomLeftTile', 'bottomLeftTile', 'id'])) {
      selectedDraught = selectedDraught.withMutations((mutatedTile) => mutatedTile.setIn(['bottomLeftTile', 'isEnemy'], false)
      .setIn(['bottomLeftTile', 'hasDraught'], false).setIn(['bottomLeftTile', 'player'], undefined).setIn(['bottomLeftTile', 'isQueen'], false))
      yield removeNeedToEat(selectedDraught, 'bottomLeftTile')
      canEat = true
    } else if (selectedDraught.getIn(['bottomRightTile', 'isEnemy']) && tile.get('id') === selectedDraught.getIn(['bottomRightTile', 'bottomRightTile', 'id'])) {
      selectedDraught = selectedDraught.withMutations((mutatedTile) => mutatedTile.setIn(['bottomRightTile', 'isEnemy'], false)
      .setIn(['bottomRightTile', 'hasDraught'], false).setIn(['bottomRightTile', 'player'], undefined).setIn(['bottomRightTile', 'isQueen'], false))
      yield removeNeedToEat(selectedDraught, 'bottomRightTile')
      canEat = true
    }

    if (canEat) {
      yield put ({ type: actionTypes.REMOVE_DRAUGHT, tile: selectedDraught })
    }

    return selectedDraught
}

function* removeSelectedDraught(selectedDraught, playerTurn) {
  selectedDraught = toggleTileHighlights(selectedDraught, playerTurn, false)
  selectedDraught = selectedDraught.withMutations((mutatedDraught) => mutatedDraught.set('selected', false).set('isQueen', false).set('hasDraught', false).set('player', undefined).set('needToEat', false))
  yield put({ type: actionTypes.REMOVE_DRAUGHT, tile: selectedDraught })
  return selectedDraught
}

const checkIfTileHasEnemy = (tile, isQueen, playerTurn) => {
  let hasEnemy = false
  tile = tile.set('isQueen', isQueen)
  tile = toggleTileHighlights(tile, playerTurn, true)
  if (tile.getIn(['topLeftTile', 'isEnemy'])) {
    hasEnemy = true
  } else if (tile.getIn(['topRightTile', 'isEnemy'])) {
    hasEnemy = true
  } else if (tile.getIn(['bottomLeftTile', 'isEnemy'])) {
    hasEnemy = true
  } else if (tile.getIn(['bottomRightTile', 'isEnemy'])) {
    hasEnemy = true
  }
  return hasEnemy
}

function* moveSelectedDraughtToTile(tile, playerTurn, isQueen, previousDraughtMove, needToEat, compulsoryToEat) {
  tile = tile.withMutations((mutatedTile) => mutatedTile.set('hasDraught', true).set('player', playerTurn)
  .set('isQueen', tile.get('y') === 0 || tile.get('y') === 10 || isQueen).set('needToEat', needToEat))

  if (compulsoryToEat) {
    yield put({ type: actionTypes.MOVE_DRAUGHT, tile: tile, selectedDraught: undefined, playerTurn: playerTurn, compulsoryToEat: compulsoryToEat, previousDraughtMove: previousDraughtMove })
  }

  return tile
}

function* highlightFormerSelectedDraughtNeighboursNeedToEat(selectedDraught, playerTurn) {
  const enemyPlayer = playerTurn === 1 ? 2 : 1
  let compulsoryToEat = false
  Object.keys(NEIGHBOUR_TILES).map((neighbour) => {
    if (selectedDraught.get(NEIGHBOUR_TILES[neighbour]) && selectedDraught.getIn([NEIGHBOUR_TILES[neighbour], 'player']) === playerTurn &&
    selectedDraught.getIn([NEIGHBOUR_TILES[neighbour], NEIGHBOUR_TILES[neighbour]]) && selectedDraught.getIn([NEIGHBOUR_TILES[neighbour], NEIGHBOUR_TILES[neighbour], 'player']) === enemyPlayer) {
      selectedDraught = selectedDraught.setIn([NEIGHBOUR_TILES[neighbour], NEIGHBOUR_TILES[neighbour], 'needToEat'], true)
      compulsoryToEat = true
    }
    return neighbour
  })

  if (compulsoryToEat) {
    yield put({ type: actionTypes.SELECT_DRAUGHT, tile: selectedDraught, selectedDraught: undefined, playerTurn: playerTurn, compulsoryToEat: true })
  }

  return selectedDraught
}

function* highlightTileNeighboursNeedToEat(tile, playerTurn) {
  const enemyPlayer = playerTurn === 1 ? 2 : 1
  let compulsoryToEat = false
  Object.keys(NEIGHBOUR_TILES).map((neighbour) => {
    if (tile.get(NEIGHBOUR_TILES[neighbour]) && tile.getIn([NEIGHBOUR_TILES[neighbour], 'player']) === enemyPlayer) {
      //let tempHighlightedTile = toggleNeighbourTileHighlight(tile, NEIGHBOUR_TILES[neighbour], playerTurn === 1 ? 2 : 1, true)
      let oppositeNeighbour = undefined
      if ((enemyPlayer === 1 || tile.getIn([NEIGHBOUR_TILES[neighbour], 'isQueen'])) && neighbour === 'TOP_LEFT_TILE') {
        oppositeNeighbour = 'BOTTOM_RIGHT_TILE'
      } else if ((enemyPlayer === 1 || tile.getIn([NEIGHBOUR_TILES[neighbour], 'isQueen'])) && neighbour === 'TOP_RIGHT_TILE') {
        oppositeNeighbour = 'BOTTOM_LEFT_TILE'
      } else if ((enemyPlayer === 2 || tile.getIn([NEIGHBOUR_TILES[neighbour], 'isQueen'])) && neighbour === 'BOTTOM_LEFT_TILE') {
        oppositeNeighbour = 'TOP_RIGHT_TILE'
      } else if ((enemyPlayer === 2 || tile.getIn([NEIGHBOUR_TILES[neighbour], 'isQueen'])) && neighbour === 'BOTTOM_RIGHT_TILE') {
        oppositeNeighbour = 'TOP_LEFT_TILE'
      }

      // this applies only to queen
      if (oppositeNeighbour !== undefined && tile.get(NEIGHBOUR_TILES[oppositeNeighbour]) && !tile.getIn([NEIGHBOUR_TILES[oppositeNeighbour], 'hasDraught'])) {
        tile = tile.setIn([NEIGHBOUR_TILES[neighbour], 'needToEat'], true)
        compulsoryToEat = true
      }
    }
    return neighbour
  })

  if (compulsoryToEat) {
    yield put({ type: actionTypes.SELECT_DRAUGHT, tile: tile, selectedDraught: undefined, playerTurn: playerTurn, compulsoryToEat: true })
  }

  return tile
}

function* highlightPreviousDraughtMove(previousDraughtMove, playerTurn, compulsoryToEat, tile) {
  const enemyPlayer = playerTurn === 1 ? 2 : 1
  let canEat = false
  if (previousDraughtMove !== undefined && previousDraughtMove.get('hasDraught')) {
    let tempPreviousDraughtMove = toggleTileHighlights(previousDraughtMove, enemyPlayer, true)
    Object.keys(NEIGHBOUR_TILES).map((neighbour) => {
      if (tempPreviousDraughtMove.getIn([NEIGHBOUR_TILES[neighbour], 'isEnemy'])) {
        canEat = true
      }
      return neighbour
    })

    if (canEat) {
      previousDraughtMove = previousDraughtMove.set('needToEat', true)
      yield put({ type: actionTypes.MOVE_DRAUGHT, tile: previousDraughtMove, selectedDraught: undefined, playerTurn: enemyPlayer, compulsoryToEat: compulsoryToEat, previousDraughtMove: tile })
    } else {
      previousDraughtMove = tile
    }
  } else {
    previousDraughtMove = undefined
  }

  return previousDraughtMove
}

export function* moveDraught(dispatch) {
  const enemyPlayer = dispatch.playerTurn === 1 ? 2 : 1
  // now i return selectedDraught instead of undefined
  let selectedDraught = yield removeEnemy(dispatch.selectedDraught, dispatch.tile)
  let isSelectedDraughtModified = false
  if (selectedDraught !== dispatch.selectedDraught) {
    isSelectedDraughtModified = true
  }

  let tiles = yield select(getTiles)
  selectedDraught = tiles.get(dispatch.selectedDraught.get('id'))
  selectedDraught = yield removeSelectedDraught(selectedDraught, dispatch.playerTurn)

  tiles = yield select(getTiles)
  let tile = tiles.get(dispatch.tile.get('id'))

  let hasEnemy = isSelectedDraughtModified && checkIfTileHasEnemy(tile, selectedDraught.get('isQueen'), dispatch.playerTurn) ? true : false

  if (hasEnemy) {
    tile = yield moveSelectedDraughtToTile(tile, dispatch.playerTurn, selectedDraught.get('isQueen'), dispatch.previousDraughtMove, true, true)
    tile = tile.set('selected', true)
    tile = toggleTileHighlights(tile, dispatch.playerTurn, true)
    yield put({ type: actionTypes.SELECT_DRAUGHT, tile: tile, selectedDraught: tile })
  } else {
    tile = toggleTileHighlights(tile, dispatch.playerTurn, false)
    selectedDraught = yield highlightFormerSelectedDraughtNeighboursNeedToEat(selectedDraught, dispatch.playerTurn)
    tile = yield highlightTileNeighboursNeedToEat(tile, dispatch.playerTurn)
    tile = yield moveSelectedDraughtToTile(tile, dispatch.playerTurn, selectedDraught.get('isQueen'), dispatch.previousDraughtMove, false, dispatch.compulsoryToEat)

    tiles = yield select(getTiles)
    let previousDraughtMove = dispatch.previousDraughtMove !== undefined ? tiles.get(dispatch.previousDraughtMove.get('id')) : undefined
    previousDraughtMove = yield highlightPreviousDraughtMove(previousDraughtMove, dispatch.playerTurn, dispatch.compulsoryToEat, tile)

    yield put({ type: actionTypes.MOVE_DRAUGHT, tile: tile, selectedDraught: undefined, playerTurn: enemyPlayer, compulsoryToEat: dispatch.compulsoryToEat,
      previousDraughtMove: previousDraughtMove !== undefined ? previousDraughtMove : tile })
  }
}

export function* watchUpdateTiles() {
    yield takeLatest(actionTypes.SELECT_DRAUGHT_SYNC, selectDraught)
    yield takeLatest(actionTypes.MOVE_DRAUGHT_SYNC, moveDraught)
}

export default function* rootSaga() {
  yield [
    watchUpdateTiles()
  ]
}
