import * as actionTypes from './boardActionTypes'

const toggleTileHighlight = (tiles, id, highlighted, playerTurn) => {
	const enemyPlayer = playerTurn === 1 ? 2 : 1
	const TOP_LEFT_TILE = -12
	const TOP_LEFT_TILE_OVER_ENEMY = -24
	const TOP_RIGHT_TILE = -10
	const TOP_RIGHT_TILE_OVER_ENEMY = -20
	const BOTTOM_LEFT_TILE = 10
	const BOTTOM_LEFT_TILE_OVER_ENEMY = 20
	const BOTTOM_RIGHT_TILE = 12
	const BOTTOM_RIGHT_TILE_OVER_ENEMY = 24

	if ((playerTurn === 1 || tiles[id].isQueen) && tiles[id + BOTTOM_LEFT_TILE] != undefined && tiles[id + BOTTOM_RIGHT_TILE] != undefined) {
		if (tiles[id].x !== 0) {
			if (tiles[id + BOTTOM_LEFT_TILE].hasDraught) {
				if (tiles[id + BOTTOM_LEFT_TILE_OVER_ENEMY] != undefined && !tiles[id + BOTTOM_LEFT_TILE_OVER_ENEMY].hasDraught 
				&& tiles[id + BOTTOM_LEFT_TILE].player === enemyPlayer) {
					tiles[id + BOTTOM_LEFT_TILE] = {...tiles[id + BOTTOM_LEFT_TILE], isEnemyHighlighted: highlighted}
					tiles[id + BOTTOM_LEFT_TILE_OVER_ENEMY] = {...tiles[id + BOTTOM_LEFT_TILE_OVER_ENEMY], highlighted: highlighted}
				}
			} else {
				tiles[id + BOTTOM_LEFT_TILE] = {...tiles[id + BOTTOM_LEFT_TILE], highlighted: highlighted}
			}
		}

		if (tiles[id].x !== 10) {
			if (tiles[id + BOTTOM_RIGHT_TILE].hasDraught) {
				if (tiles[id + BOTTOM_RIGHT_TILE_OVER_ENEMY] != undefined && !tiles[id + BOTTOM_RIGHT_TILE_OVER_ENEMY].hasDraught 
				&& tiles[id + BOTTOM_RIGHT_TILE].player === enemyPlayer) {
					tiles[id + BOTTOM_RIGHT_TILE] = {...tiles[id + BOTTOM_RIGHT_TILE], isEnemyHighlighted: highlighted}
					tiles[id + BOTTOM_RIGHT_TILE_OVER_ENEMY] = {...tiles[id + BOTTOM_RIGHT_TILE_OVER_ENEMY], highlighted: highlighted}
					// this is to make it so that it is compulsory to eat; find a better way to do this
					tiles[id + BOTTOM_LEFT_TILE] = {...tiles[id + BOTTOM_LEFT_TILE], highlighted: false}
					if (tiles[id].isQueen) {
						if (tiles[id + TOP_LEFT_TILE] != undefined) tiles[id + TOP_LEFT_TILE] = {...tiles[id + TOP_LEFT_TILE], highlighted: false}
						if (tiles[id + TOP_RIGHT_TILE] != undefined) tiles[id + TOP_RIGHT_TILE] = {...tiles[id + TOP_RIGHT_TILE], highlighted: false}
					}
				}
			} else {
				// this is to make it so that it is compulsory to eat; find a better way to do this
				if (!tiles[id + BOTTOM_LEFT_TILE].isEnemyHighlighted && 
				(tiles[id + TOP_RIGHT_TILE] != undefined ? !tiles[id + TOP_RIGHT_TILE].isEnemyHighlighted : true) && 
				(tiles[id + TOP_LEFT_TILE] != undefined ? !tiles[id + TOP_LEFT_TILE].isEnemyHighlighted : true)) {
					tiles[id + BOTTOM_RIGHT_TILE] = {...tiles[id + BOTTOM_RIGHT_TILE], highlighted: highlighted}
				}
			}
		}
	}

	if ((playerTurn === 2 || tiles[id].isQueen) && tiles[id + TOP_RIGHT_TILE] != undefined && tiles[id + TOP_LEFT_TILE] != undefined) {
		if (tiles[id].x !== 10) {
			if (tiles[id + TOP_RIGHT_TILE].hasDraught) {
				if (tiles[id + TOP_RIGHT_TILE_OVER_ENEMY] != undefined && !tiles[id + TOP_RIGHT_TILE_OVER_ENEMY].hasDraught 
					&& tiles[id + TOP_RIGHT_TILE].player === enemyPlayer) {
					tiles[id + TOP_RIGHT_TILE] = {...tiles[id + TOP_RIGHT_TILE], isEnemyHighlighted: highlighted}
					tiles[id + TOP_RIGHT_TILE_OVER_ENEMY] = {...tiles[id + TOP_RIGHT_TILE_OVER_ENEMY], highlighted: highlighted}
					// this is to make it so that it is compulsory to eat; find a better way to do this
					if (tiles[id].isQueen) {
						tiles[id + TOP_LEFT_TILE] = {...tiles[id + TOP_LEFT_TILE], highlighted: false}
						if (tiles[id + BOTTOM_LEFT_TILE] != undefined) tiles[id + BOTTOM_LEFT_TILE] = {...tiles[id + BOTTOM_LEFT_TILE], highlighted: false}
						if (tiles[id + BOTTOM_RIGHT_TILE] != undefined) tiles[id + BOTTOM_RIGHT_TILE] = {...tiles[id + BOTTOM_RIGHT_TILE], highlighted: false}
					}
				}
			} else {
				if (!tiles[id + TOP_LEFT_TILE].isEnemyHighlighted && 
				(tiles[id + BOTTOM_LEFT_TILE] != undefined ? !tiles[id + BOTTOM_LEFT_TILE].isEnemyHighlighted : true) && 
				(tiles[id + BOTTOM_RIGHT_TILE] != undefined ? !tiles[id + BOTTOM_RIGHT_TILE].isEnemyHighlighted : true)) {
					tiles[id + TOP_RIGHT_TILE] = {...tiles[id + TOP_RIGHT_TILE], highlighted: highlighted}
				}
			}
		}

		if (tiles[id].x !== 0) {
			if (tiles[id + TOP_LEFT_TILE].hasDraught) {
				if (tiles[id + TOP_LEFT_TILE_OVER_ENEMY] != undefined && !tiles[id + TOP_LEFT_TILE_OVER_ENEMY].hasDraught 
					&& tiles[id + TOP_LEFT_TILE].player === enemyPlayer) {
					tiles[id + TOP_LEFT_TILE] = {...tiles[id + TOP_LEFT_TILE], isEnemyHighlighted: highlighted}
					tiles[id + TOP_LEFT_TILE_OVER_ENEMY] = {...tiles[id + TOP_LEFT_TILE_OVER_ENEMY], highlighted: highlighted}
					// this is to make it so that it is compulsory to eat; find a better way to do this
					tiles[id + TOP_RIGHT_TILE] = {...tiles[id + TOP_RIGHT_TILE], highlighted: false}
					if (tiles[id].isQueen) {
						if (tiles[id + BOTTOM_LEFT_TILE] != undefined) tiles[id + BOTTOM_LEFT_TILE] = {...tiles[id + BOTTOM_LEFT_TILE], highlighted: false}
						if (tiles[id + BOTTOM_RIGHT_TILE] != undefined) tiles[id + BOTTOM_RIGHT_TILE] = {...tiles[id + BOTTOM_RIGHT_TILE], highlighted: false}
					}
				}
			} else {
				// this is to make it so that it is compulsory to eat; find a better way to do this
				if (!tiles[id + TOP_RIGHT_TILE].isEnemyHighlighted && 
				(tiles[id + BOTTOM_LEFT_TILE] != undefined ? !tiles[id + BOTTOM_LEFT_TILE].isEnemyHighlighted : true) && 
				(tiles[id + BOTTOM_RIGHT_TILE] != undefined ? !tiles[id + BOTTOM_RIGHT_TILE].isEnemyHighlighted : true)) {
					tiles[id + TOP_LEFT_TILE] = {...tiles[id + TOP_LEFT_TILE], highlighted: highlighted}
				}
			}
		}
	}

	return tiles
}

//VERY SLOW AND TIME TRAVEL DOESNT EVEN WORK PROPERLY
export const selectDraught = (tiles, id, selectedId, playerTurn) => {
	console.log(id, playerTurn)
	if (selectedId !== 0) tiles = toggleTileHighlight(tiles, selectedId, false, playerTurn)

	tiles = toggleTileHighlight(tiles, id, tiles[id].selected ? false : true, playerTurn, tiles[id].isQueen ? true : false)
	
	return {
		type: actionTypes.SELECT_DRAUGHT,
		tiles: tiles.map((tile, tileId) => tileId === id ? {...tile, selected: !tile.selected} : {...tile, selected: false}),
		selectedId: !tiles[id].selected ? id : 0,
	}
}

export const moveDraught = (tiles, id, selectedId, playerTurn) => {
	let canChangePlayerTurn = false
	tiles = tiles.map((tile, tileId) => {
		if (tileId === selectedId) return {...tile, hasDraught: false, player: 0, highlighted: false, isQueen: false}
		if (tileId === id) return {...tile, hasDraught: true, player: tiles[selectedId].player, highlighted: false, 
			isQueen:tiles[selectedId].isQueen ? true : false}
		if (tile.isEnemyHighlighted) {
			canChangePlayerTurn = true
			return {...tile, hasDraught: false, player: 0, isEnemyHighlighted: false}
		}
		return {...tile, highlighted: false}
	})

	// Check if still can eat more, but find a better way
	selectedId = id
	if (canChangePlayerTurn) {
		canChangePlayerTurn = false
		tiles = toggleTileHighlight(tiles, selectedId, true, playerTurn)
		canChangePlayerTurn = tiles.reduce((initialTile, tile) => {
			return initialTile || tile.isEnemyHighlighted
		}, false)
	}

	if (tiles[selectedId].id <= 9 || tiles[selectedId].id >= 110) {
		tiles[selectedId] = {...tiles[selectedId], isQueen: true}
	}

	if (!canChangePlayerTurn) {
		tiles = toggleTileHighlight(tiles, selectedId, false, playerTurn)
		playerTurn = playerTurn === 1 ? 2 : 1
	}

	return {
		type: actionTypes.MOVE_DRAUGHT,
		tiles: tiles,
		selectedId: selectedId,
		playerTurn: playerTurn
	}
}