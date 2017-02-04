import draught from '../draught'
import * as actionTypes from './actionTypes'
import { populateTiles } from '../../shared/tileUtils'

const tileReducer = (tiles = populateTiles(), payLoad) => {
	switch (payLoad.type) {
		case draught.actionTypes.SELECT_DRAUGHT: {
			return tiles.map(tile => {
				if (tile.get('id') === payLoad.id) {
					return payLoad.tile
				}
				return tile
			})
		}
		case draught.actionTypes.HIGHLIGHT_NEIGHBOUR_TILES: {
			return tiles.map(tile => {
				const updatedTile = payLoad.neighbourTiles.find(neighbourTile => {
					if (tile.get('id') === neighbourTile.id) {
						return neighbourTile.tile
					}
					return false
				})
				return updatedTile !== undefined ? updatedTile.tile : tile
			})
		}
		case actionTypes.HIGHLIGHT_NEIGHBOUR_TILES: {
			return tiles.map(tile => {
				const updatedTile = payLoad.neighbourTiles.find(neighbourTile => {
					if (tile.get('id') === neighbourTile.id) {
						return neighbourTile.tile
					}
					return false
				})
				return updatedTile !== undefined ? updatedTile.tile : tile
			})
		}
		case actionTypes.MOVE_DRAUGHT: {
			return tiles.map(tile => {
				if (tile.get('id') === payLoad.id) {
					return payLoad.tile
				}
				return tile
			})
		}
		default: {
			return tiles
		}
	}
}

export default tileReducer
