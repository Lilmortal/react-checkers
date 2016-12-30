import { takeLatest } from 'redux-saga'
import { put, call, select } from 'redux-saga/effects'
import * as actionTypes from './boardActionTypes'
import { toggleTileHighlights, NEIGHBOUR_TILES } from './boardActions'
export const getTiles = state => state.draughtReducer.tiles

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

  tile = toggleTileHighlights(tile, dispatch.playerTurn, !isSelectedDraughtUpdated && dispatch.selectedDraught != undefined ? false : !dispatch.tile.get('selected'))
  tile = tile.set('selected', !isSelectedDraughtUpdated && dispatch.selectedDraught != undefined ? false : !dispatch.tile.get('selected'))
  yield put({ type: actionTypes.SELECT_DRAUGHT, tile: tile, selectedDraught: tile })
}

export function* moveDraught(dispatch) {
  let hasEnemy = false
  const enemyPlayer = dispatch.playerTurn === 1 ? 2 : 1

  if (dispatch.selectedDraught.getIn(['topLeftTile', 'isEnemy']) && dispatch.tile.get('id') === dispatch.selectedDraught.getIn(['topLeftTile', 'topLeftTile', 'id'])) {
    dispatch.selectedDraught = dispatch.selectedDraught.withMutations((mutatedTile) => mutatedTile.setIn(['topLeftTile', 'isEnemy'], false)
    .setIn(['topLeftTile', 'hasDraught'], false).setIn(['topLeftTile', 'player'], undefined).setIn(['topLeftTile', 'isQueen'], false))

    // remove needToEat highlight
    let neighboursThatNeedsToEat = []
    Object.keys(NEIGHBOUR_TILES).map((neighbour) => {
      if (dispatch.selectedDraught.getIn(['topLeftTile', NEIGHBOUR_TILES[neighbour], 'needToEat'])) {
        neighboursThatNeedsToEat.push(neighbour)
      }
    })
    let neighbour = dispatch.selectedDraught.get('topLeftTile')
    for (let neighbourThatNeedsToEat of neighboursThatNeedsToEat) {
      neighbour = neighbour.setIn([NEIGHBOUR_TILES[neighbourThatNeedsToEat], 'needToEat'], false)
    }

    if (neighboursThatNeedsToEat.length > 0) {
      yield put ({ type: actionTypes.MOVE_DRAUGHT, tile: neighbour, selectedDraught: undefined,
      playerTurn: dispatch.playerTurn, compulsoryToEat: dispatch.compulsoryToEat })
    }
    hasEnemy = true
  } else if (dispatch.selectedDraught.getIn(['topRightTile', 'isEnemy']) && dispatch.tile.get('id') === dispatch.selectedDraught.getIn(['topRightTile', 'topRightTile', 'id'])) {
    dispatch.selectedDraught = dispatch.selectedDraught.withMutations((mutatedTile) => mutatedTile.setIn(['topRightTile', 'isEnemy'], false)
    .setIn(['topRightTile', 'hasDraught'], false).setIn(['topRightTile', 'player'], undefined).setIn(['topRightTile', 'isQueen'], false))

    // remove needToEat highlight
    let neighboursThatNeedsToEat = []
    Object.keys(NEIGHBOUR_TILES).map((neighbour) => {
      if (dispatch.selectedDraught.getIn(['topRightTile', NEIGHBOUR_TILES[neighbour], 'needToEat'])) {
        neighboursThatNeedsToEat.push(neighbour)
      }
    })
    let neighbour = dispatch.selectedDraught.get('topRightTile')
    for (let neighbourThatNeedsToEat of neighboursThatNeedsToEat) {
      neighbour = neighbour.setIn([NEIGHBOUR_TILES[neighbourThatNeedsToEat], 'needToEat'], false)
    }

    if (neighboursThatNeedsToEat.length > 0) {
      yield put ({ type: actionTypes.MOVE_DRAUGHT, tile: neighbour, selectedDraught: undefined,
      playerTurn: dispatch.playerTurn, compulsoryToEat: dispatch.compulsoryToEat, previousDraughtMove: undefined })
    }

    hasEnemy = true
  } else if (dispatch.selectedDraught.getIn(['bottomLeftTile', 'isEnemy']) && dispatch.tile.get('id') === dispatch.selectedDraught.getIn(['bottomLeftTile', 'bottomLeftTile', 'id'])) {
    dispatch.selectedDraught = dispatch.selectedDraught.withMutations((mutatedTile) => mutatedTile.setIn(['bottomLeftTile', 'isEnemy'], false)
    .setIn(['bottomLeftTile', 'hasDraught'], false).setIn(['bottomLeftTile', 'player'], undefined).setIn(['bottomLeftTile', 'isQueen'], false))

    // remove needToEat highlight
    let neighboursThatNeedsToEat = []
    Object.keys(NEIGHBOUR_TILES).map((neighbour) => {
      if (dispatch.selectedDraught.getIn(['bottomLeftTile', NEIGHBOUR_TILES[neighbour], 'needToEat'])) {
        neighboursThatNeedsToEat.push(neighbour)
      }
    })
    let neighbour = dispatch.selectedDraught.get('bottomLeftTile')
    for (let neighbourThatNeedsToEat of neighboursThatNeedsToEat) {
      neighbour = neighbour.setIn([NEIGHBOUR_TILES[neighbourThatNeedsToEat], 'needToEat'], false)
    }

    if (neighboursThatNeedsToEat.length > 0) {
      yield put ({ type: actionTypes.MOVE_DRAUGHT, tile: neighbour, selectedDraught: undefined,
      playerTurn: dispatch.playerTurn, compulsoryToEat: dispatch.compulsoryToEat, previousDraughtMove: undefined })
    }

    hasEnemy = true
  } else if (dispatch.selectedDraught.getIn(['bottomRightTile', 'isEnemy']) && dispatch.tile.get('id') === dispatch.selectedDraught.getIn(['bottomRightTile', 'bottomRightTile', 'id'])) {
    dispatch.selectedDraught = dispatch.selectedDraught.withMutations((mutatedTile) => mutatedTile.setIn(['bottomRightTile', 'isEnemy'], false)
    .setIn(['bottomRightTile', 'hasDraught'], false).setIn(['bottomRightTile', 'player'], undefined).setIn(['bottomRightTile', 'isQueen'], false))

    // remove needToEat highlight
    let neighboursThatNeedsToEat = []
    Object.keys(NEIGHBOUR_TILES).map((neighbour) => {
      if (dispatch.selectedDraught.getIn(['bottomRightTile', NEIGHBOUR_TILES[neighbour], 'needToEat'])) {
        neighboursThatNeedsToEat.push(neighbour)
      }
    })
    let neighbour = dispatch.selectedDraught.get('bottomRightTile')
    for (let neighbourThatNeedsToEat of neighboursThatNeedsToEat) {
      neighbour = neighbour.setIn([NEIGHBOUR_TILES[neighbourThatNeedsToEat], 'needToEat'], false)
    }

    if (neighboursThatNeedsToEat.length > 0) {
      yield put ({ type: actionTypes.MOVE_DRAUGHT, tile: neighbour, selectedDraught: undefined,
      playerTurn: dispatch.playerTurn, compulsoryToEat: dispatch.compulsoryToEat, previousDraughtMove: undefined })
    }

    hasEnemy = true
  }

  if (hasEnemy)
    yield put ({ type: actionTypes.MOVE_DRAUGHT, tile: dispatch.selectedDraught, selectedDraught: undefined, playerTurn: dispatch.playerTurn, compulsoryToEat: dispatch.compulsoryToEat,
      previousDraughtMove: undefined })

  let selectedDraught = toggleTileHighlights(dispatch.selectedDraught, dispatch.playerTurn, false)
  selectedDraught = selectedDraught.withMutations((mutatedDraught) => mutatedDraught.set('selected', false).set('isQueen', false).set('hasDraught', false).set('player', undefined).set('needToEat', false))
  yield put({ type: actionTypes.MOVE_DRAUGHT, tile: selectedDraught, selectedDraught: undefined, playerTurn: dispatch.playerTurn, compulsoryToEat: dispatch.compulsoryToEat, previousDraughtMove: undefined })

  let tiles = yield select(getTiles)
  let tile = tiles.get(dispatch.tile.get('id'))

  if (hasEnemy) {
    hasEnemy = false

    tile = tile.set('isQueen', dispatch.selectedDraught.get('isQueen'))
    tile = toggleTileHighlights(tile, dispatch.playerTurn, true)
    if (tile.getIn(['topLeftTile', 'isEnemy'])) {
      hasEnemy = true
    } else if (tile.getIn(['topRightTile', 'isEnemy'])) {
      hasEnemy = true
    } else if (tile.getIn(['bottomLeftTile', 'isEnemy'])) {
      hasEnemy = true
    } else if (tile.getIn(['bottomRightTile', 'isEnemy'])) {
      hasEnemy = true
    }
  }

  if (hasEnemy) {
    tile = tile.withMutations((mutatedTile) => mutatedTile.set('hasDraught', true).set('player', dispatch.playerTurn).set('isQueen', dispatch.selectedDraught.get('isQueen'))
    .set('needToEat', true))
    if (tile.get('y') === 0 || tile.get('y') === 10) {
      tile = tile.set('isQueen', true)
    }
    yield put({ type: actionTypes.MOVE_DRAUGHT, tile: tile, selectedDraught: undefined, playerTurn: dispatch.playerTurn, compulsoryToEat: true, previousDraughtMove: undefined })
    tile = tile.set('selected', true)
    yield put({ type: actionTypes.SELECT_DRAUGHT, tile: tile, selectedDraught: tile, playerTurn: dispatch.playerTurn, compulsoryToEat: true })
  } else {
    tile = toggleTileHighlights(tile, dispatch.playerTurn, false)
    tile = tile.withMutations((mutatedTile) => mutatedTile.set('hasDraught', true).set('player', dispatch.playerTurn).set('isQueen', dispatch.selectedDraught.get('isQueen')))
    if (tile.get('y') === 0 || tile.get('y') === 10) {
      tile = tile.set('isQueen', true)
    }
    let compulsoryToEat = false
    Object.keys(NEIGHBOUR_TILES).map((neighbour) => {
  		if (selectedDraught.get(NEIGHBOUR_TILES[neighbour]) && selectedDraught.getIn([NEIGHBOUR_TILES[neighbour], 'player']) === dispatch.playerTurn &&
      selectedDraught.getIn([NEIGHBOUR_TILES[neighbour], NEIGHBOUR_TILES[neighbour]]) && selectedDraught.getIn([NEIGHBOUR_TILES[neighbour], NEIGHBOUR_TILES[neighbour], 'player']) === enemyPlayer) {
  			selectedDraught = selectedDraught.setIn([NEIGHBOUR_TILES[neighbour], NEIGHBOUR_TILES[neighbour], 'needToEat'], true)
        compulsoryToEat = true
  		}
  	})

    if (compulsoryToEat)
      yield put({ type: actionTypes.MOVE_DRAUGHT, tile: selectedDraught, selectedDraught: undefined, playerTurn: enemyPlayer, compulsoryToEat: compulsoryToEat, previousDraughtMove: undefined })

    // check if have to eat
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
        if (oppositeNeighbour != undefined && tile.get(NEIGHBOUR_TILES[oppositeNeighbour]) && !tile.getIn([NEIGHBOUR_TILES[oppositeNeighbour], 'hasDraught'])) {
          tile = tile.setIn([NEIGHBOUR_TILES[neighbour], 'needToEat'], true)
          compulsoryToEat = true
        }
      }
    })

    yield put({ type: actionTypes.MOVE_DRAUGHT, tile: tile, selectedDraught: undefined, playerTurn: enemyPlayer, compulsoryToEat: compulsoryToEat, previousDraughtMove: tile })

    if (dispatch.previousDraughtMove != undefined) {
      let compulsoryToEat = false
      let tempPreviousDraughtMove = toggleTileHighlights(dispatch.previousDraughtMove, enemyPlayer, true)
      Object.keys(NEIGHBOUR_TILES).map((neighbour) => {
        if (tempPreviousDraughtMove.getIn([NEIGHBOUR_TILES[neighbour], 'hasEnemy'])) {
          compulsoryToEat = true
        }
      })

      if (compulsoryToEat) {
        dispatch.previousDraughtMove = dispatch.previousDraughtMove.set('needToEat', true)
        yield put({ type: actionTypes.MOVE_DRAUGHT, tile: dispatch.previousDraughtMove, selectedDraught: undefined, playerTurn: enemyPlayer, compulsoryToEat: compulsoryToEat, previousDraughtMove: tile })
      }
    }
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
