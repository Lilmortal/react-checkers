import { put, select } from 'redux-saga/effects'
// find out how to do import * as actions
import { selectDraught } from '../ducks/tileModule'
import { toggleTileHighlights } from '../containers/tileContainer'

export const getTiles = state => state.tilesReducer.tiles

/**
 * Toggle select a draught
 * @param  {Object}    dispatch A list of payloads
 * @return {Generator}          Return the updated selected draught
 */
const selectDraughtSaga = function*(dispatch) {
	let tile = dispatch.tile
	if (dispatch.selectedDraught !== undefined) {
		let selectedDraught = toggleTileHighlights(dispatch.selectedDraught, dispatch.playerTurn, false)
		selectedDraught = selectedDraught.set('isSelected', false)
		const tiles = yield select(getTiles)
		yield put(selectDraught(tiles, selectedDraught, undefined))
	}

	const tiles = yield select(getTiles)
	tile = tiles.get(tile.get('id'))
  tile = toggleTileHighlights(tile, dispatch.playerTurn, !dispatch.tile.get('isSelected'))
  tile = tile.set('isSelected', !dispatch.tile.get('isSelected'))
	yield put(selectDraught(tiles, tile, tile))
}

export default selectDraughtSaga
