 import { put, select } from 'redux-saga/effects'
import * as actions from '../actions'
import * as selectors from '../selectors'

const { SELECT_DRAUGHT, HIGHLIGHT_NEIGHBOUR_TILES } = actions
const { selectedDraughtIdSelector, tilesSelector } = selectors

export const toggleTileNeighboursIsHighlighted = (tiles, tile) => {
	const draught = tile.get('draught')
  let topLeftTileId = tile.get('topLeftTileId')
  let topRightTileId = tile.get('topRightTileId')
  let bottomLeftTileId = tile.get('bottomLeftTileId')
  let bottomRightTileId = tile.get('bottomRightTileId')
	let topLeftTile = tiles.get(topLeftTileId)
	let topRightTile = tiles.get(topRightTileId)
	let bottomLeftTile = tiles.get(bottomLeftTileId)
	let bottomRightTile = tiles.get(bottomRightTileId)

	let neighbourTilesToBeUpdated = []
	if (draught.get('player') === 1 || draught.get('isQueen')) {
		if (bottomLeftTile !== undefined && !bottomLeftTile.get('hasDraught')) {
			bottomLeftTile = bottomLeftTile.set('isHighlighted', !bottomLeftTile.get('isHighlighted'))
			neighbourTilesToBeUpdated.push({id: bottomLeftTileId, tile: bottomLeftTile})
		}

		if (bottomRightTile !== undefined && !bottomRightTile.get('hasDraught')) {
			bottomRightTile = bottomRightTile.set('isHighlighted', !bottomRightTile.get('isHighlighted'))
			neighbourTilesToBeUpdated.push({id: bottomRightTileId, tile: bottomRightTile})
		}
	}

	if (draught.get('player') === 2 || draught.get('isQueen')) {
		if (topLeftTile !== undefined && !topLeftTile.get('hasDraught')) {
			topLeftTile = topLeftTile.set('isHighlighted', !topLeftTile.get('isHighlighted'))
			neighbourTilesToBeUpdated.push({id: topLeftTileId, tile: topLeftTile})
		}

		if (topRightTile !== undefined && !topRightTile.get('hasDraught')) {
			topRightTile = topRightTile.set('isHighlighted', !topRightTile.get('isHighlighted'))
			neighbourTilesToBeUpdated.push({id: topRightTileId, tile: topRightTile})
		}
	}
	return neighbourTilesToBeUpdated
}

/**
 * Toggle select a draught
 * @param  {Object}    dispatch A list of payloads
 * @return {Generator}          Return the updated selected draught
 */
export const selectDraughtSaga = function*(dispatch) {
	let selectedDraughtId = yield select(selectedDraughtIdSelector)
	let tiles = yield select(tilesSelector)
	let tile = tiles.get(dispatch.id)
	let draught = tile.get('draught')

	if (selectedDraughtId !== undefined) {
		let selectedDraughtTile = tiles.get(selectedDraughtId)
    let selectedDraught = selectedDraughtTile.get('draught')

		const selectedDraughtNeighbourTilesToBeUpdated = toggleTileNeighboursIsHighlighted(tiles, selectedDraughtTile)
		yield put(HIGHLIGHT_NEIGHBOUR_TILES(selectedDraughtNeighbourTilesToBeUpdated))

		selectedDraught = selectedDraught.set('isSelected', false)
		selectedDraughtTile = selectedDraughtTile.set('draught', selectedDraught)

		yield put(SELECT_DRAUGHT(selectedDraughtId, selectedDraughtTile, undefined))

    // refresh the tiles state
    //tiles = yield select(tilesSelector)
    //tile = tiles.get(dispatch.id)
    //draught = tile.get('draught')
	}

	const neighbourTilesToBeUpdated = toggleTileNeighboursIsHighlighted(tiles, tile)
	yield put(HIGHLIGHT_NEIGHBOUR_TILES(neighbourTilesToBeUpdated))

	draught = draught.set('isSelected', !draught.get('isSelected'))
	tile = tile.set('draught', draught)

	yield put(SELECT_DRAUGHT(dispatch.id, tile, dispatch.id === selectedDraughtId ? undefined : dispatch.id))
}
