import { takeLatest } from 'redux-saga'
import { put, call, select } from 'redux-saga/effects'
import * as actionTypes from './boardActionTypes'
import { toggleTileHighlights } from './boardActions'
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
  debugger;
  // its eating both available pieces
  if (dispatch.selectedDraught.getIn(['topLeftTile', 'isEnemy']) && dispatch.tile.get('id') === dispatch.selectedDraught.getIn(['topLeftTile', 'topLeftTile', 'id'])) {
    dispatch.selectedDraught = dispatch.selectedDraught.withMutations((mutatedTile) => mutatedTile.setIn(['topLeftTile', 'isEnemy'], false)
    .setIn(['topLeftTile', 'hasDraught'], false).setIn(['topLeftTile', 'player'], undefined).setIn(['topLeftTile', 'isQueen'], false))
    hasEnemy = true
  } else if (dispatch.selectedDraught.getIn(['topRightTile', 'isEnemy']) && dispatch.tile.get('id') === dispatch.selectedDraught.getIn(['topRightTile', 'topRightTile', 'id'])) {
    dispatch.selectedDraught = dispatch.selectedDraught.withMutations((mutatedTile) => mutatedTile.setIn(['topRightTile', 'isEnemy'], false)
    .setIn(['topRightTile', 'hasDraught'], false).setIn(['topRightTile', 'player'], undefined).setIn(['topRightTile', 'isQueen'], false))
    hasEnemy = true
  } else if (dispatch.selectedDraught.getIn(['bottomLeftTile', 'isEnemy']) && dispatch.tile.get('id') === dispatch.selectedDraught.getIn(['bottomLeftTile', 'bottomLeftTile', 'id'])) {
    dispatch.selectedDraught = dispatch.selectedDraught.withMutations((mutatedTile) => mutatedTile.setIn(['bottomLeftTile', 'isEnemy'], false)
    .setIn(['bottomLeftTile', 'hasDraught'], false).setIn(['bottomLeftTile', 'player'], undefined).setIn(['bottomLeftTile', 'isQueen'], false))
    hasEnemy = true
  } else if (dispatch.selectedDraught.getIn(['bottomRightTile', 'isEnemy']) && dispatch.tile.get('id') === dispatch.selectedDraught.getIn(['bottomRightTile', 'bottomRightTile', 'id'])) {
    dispatch.selectedDraught = dispatch.selectedDraught.withMutations((mutatedTile) => mutatedTile.setIn(['bottomRightTile', 'isEnemy'], false)
    .setIn(['bottomRightTile', 'hasDraught'], false).setIn(['bottomRightTile', 'player'], undefined).setIn(['bottomRightTile', 'isQueen'], false))
    hasEnemy = true
  }
  if (hasEnemy)
    yield put ({ type: actionTypes.MOVE_DRAUGHT, tile: dispatch.selectedDraught, selectedDraught: undefined, playerTurn: dispatch.playerTurn })

  let selectedDraught = toggleTileHighlights(dispatch.selectedDraught, dispatch.playerTurn, false)
  selectedDraught = selectedDraught.withMutations((mutatedDraught) => mutatedDraught.set('selected', false).set('isQueen', false).set('hasDraught', false).set('player', undefined))
  yield put({ type: actionTypes.MOVE_DRAUGHT, tile: selectedDraught, selectedDraught: undefined, playerTurn: dispatch.playerTurn })

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
    tile = tile.withMutations((mutatedTile) => mutatedTile.set('hasDraught', true).set('player', dispatch.playerTurn).set('isQueen', dispatch.selectedDraught.get('isQueen')))
    yield put({ type: actionTypes.MOVE_DRAUGHT, tile: tile, selectedDraught: undefined, playerTurn: dispatch.playerTurn })
    tile = tile.set('selected', true)
    if (tile.get('y') === 0 || tile.get('y') === 10) {
      tile = tile.set('isQueen', true)
    }
    yield put({ type: actionTypes.SELECT_DRAUGHT, tile: tile, selectedDraught: tile, playerTurn: dispatch.playerTurn })
  } else {
    tile = toggleTileHighlights(tile, dispatch.playerTurn, false)
    tile = tile.withMutations((mutatedTile) => mutatedTile.set('hasDraught', true).set('player', dispatch.playerTurn).set('isQueen', dispatch.selectedDraught.get('isQueen')))
    if (tile.get('y') === 0 || tile.get('y') === 10) {
      tile = tile.set('isQueen', true)
    }
    yield put({ type: actionTypes.MOVE_DRAUGHT, tile: tile, selectedDraught: undefined, playerTurn: dispatch.playerTurn === 1 ? 2 : 1 })
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
