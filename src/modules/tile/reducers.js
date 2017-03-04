import utils from '../../shared/utils'
import draughtModule from '../draught'
import * as actionTypes from './actionTypes'

const { tileUtils } = utils
const { populateTiles } = tileUtils

const tileReducer = (tiles = populateTiles(), payLoad) => {
	switch (payLoad.type) {
		case draughtModule.actionTypes.SELECT_DRAUGHT: {
			return tiles.map(tile => {
				if (tile.get('id') === payLoad.id) {
					return payLoad.tile
				}
				return tile
			})
		}
		case draughtModule.actionTypes.HIGHLIGHT_NEIGHBOUR_TILES: {
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
		case actionTypes.REMOVE_DRAUGHT: {
			return tiles.map(tile => {
				if (tile.get('id') === payLoad.id) {
					return payLoad.tile
				}
				return tile
			})
		}
		case actionTypes.ADD_DRAUGHT: {
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
