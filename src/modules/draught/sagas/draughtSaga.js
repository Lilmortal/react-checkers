import { getTileNeighboursHighlightsToggled } from '../../../shared/tileUtils'
import * as actions from '../actions'
import * as selectors from '../selectors'
import { put, select } from 'redux-saga/effects'

const { selectedDraughtIdSelector, tilesSelector, playerTurnSelector, isAbleToEatAvailableSelector, previousMoveIdSelector } = selectors

/**
 * Toggle select a draught
 * @param  {Object}    dispatch A list of payloads
 * @return {Generator}          Return the updated selected draught
 */
export const selectDraughtSaga = function*(dispatch) {
  const playerTurn = yield select(playerTurnSelector)
	let selectedDraughtId = yield select(selectedDraughtIdSelector)
  let isAbleToEatAvailable = yield select(isAbleToEatAvailableSelector)
  let previousMoveId = yield select(previousMoveIdSelector)

  let tiles = yield select(tilesSelector)
	let tile = tiles.get(dispatch.id)
	let draught = tile.get('draught')

	if (selectedDraughtId !== undefined && dispatch.id !== selectedDraughtId) {
		let selectedDraughtTile = tiles.get(selectedDraughtId)
    let selectedDraught = selectedDraughtTile.get('draught')

		const selectedDraughtNeighbourTilesToBeUpdated = getTileNeighboursHighlightsToggled(tiles, selectedDraughtTile, playerTurn)
		yield put(actions.HIGHLIGHT_NEIGHBOUR_TILES(selectedDraughtNeighbourTilesToBeUpdated))

		selectedDraught = selectedDraught.set('isSelected', false)
		selectedDraughtTile = selectedDraughtTile.set('draught', selectedDraught)

		yield put(actions.SELECT_DRAUGHT(selectedDraughtId, selectedDraughtTile))
    yield put(actions.UPDATE_BOARD(selectedDraughtId, previousMoveId, playerTurn, isAbleToEatAvailable))

    // refresh the tiles state
    tiles = yield select(tilesSelector)
    tile = tiles.get(dispatch.id)
    draught = tile.get('draught')
	}

	const neighbourTilesToBeUpdated = getTileNeighboursHighlightsToggled(tiles, tile, playerTurn)
	yield put(actions.HIGHLIGHT_NEIGHBOUR_TILES(neighbourTilesToBeUpdated))

	draught = draught.set('isSelected', !draught.get('isSelected'))
	tile = tile.set('draught', draught)

	yield put(actions.SELECT_DRAUGHT(dispatch.id, tile))
  yield put(actions.UPDATE_BOARD(dispatch.id === selectedDraughtId ? undefined : dispatch.id, previousMoveId, playerTurn, isAbleToEatAvailable))
}
