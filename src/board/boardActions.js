import * as actionTypes from './boardActionTypes'

const toggleTileHighlight = (tiles, id, highlighted, isEnemyHighlighted, playerTurn) => {
	const enemyPlayer = playerTurn === 1 ? 2 : 1

	if (playerTurn === 1) {
		if (tiles[id + 10] != undefined && tiles[id + 10].hasDraught) {
			if (tiles[id + 20] != undefined && !tiles[id + 20].hasDraught && tiles[id + 10].player === enemyPlayer) {
				tiles[id + 10] = {...tiles[id + 10], isEnemyHighlighted: isEnemyHighlighted}
				tiles[id + 20] = {...tiles[id + 20], highlighted: highlighted}
			}
		} else {
			tiles[id + 10] = {...tiles[id + 10], highlighted: highlighted}	
		}

		if (tiles[id + 12] != undefined && tiles[id + 12].hasDraught) {
			if (tiles[id + 24] != undefined && !tiles[id + 24].hasDraught && tiles[id + 12].player === enemyPlayer) {
				tiles[id + 12] = {...tiles[id + 12], isEnemyHighlighted: isEnemyHighlighted}
				tiles[id + 24] = {...tiles[id + 24], highlighted: highlighted}
				// this is to make it so that it is compulsory to eat; find a better way to do this
				tiles[id + 10] = {...tiles[id + 10], highlighted: false}
			}
		} else {
			// this is to make it so that it is compulsory to eat; find a better way to do this
			if (!tiles[id + 10].isEnemyHighlighted) {
				tiles[id + 12] = {...tiles[id + 12], highlighted: highlighted}
			}
		}
	} else if (playerTurn === 2) {
		if (tiles[id - 10] != undefined && tiles[id - 10].hasDraught) {
			if (tiles[id - 20] != undefined && !tiles[id - 20].hasDraught && tiles[id - 10].player === enemyPlayer) {
				tiles[id - 10] = {...tiles[id - 10], isEnemyHighlighted: isEnemyHighlighted}
				tiles[id - 20] = {...tiles[id - 20], highlighted: highlighted}
			}
		} else {
			tiles[id - 10] = {...tiles[id - 10], highlighted: highlighted}
		}

		if (tiles[id - 12] != undefined && tiles[id - 12].hasDraught) {
			if (tiles[id - 24] != undefined && !tiles[id - 24].hasDraught && tiles[id - 12].player === enemyPlayer) {
				tiles[id - 12] = {...tiles[id - 12], isEnemyHighlighted: isEnemyHighlighted}
				tiles[id - 24] = {...tiles[id - 24], highlighted: highlighted}
				// this is to make it so that it is compulsory to eat; find a better way to do this
				tiles[id - 10] = {...tiles[id - 10], highlighted: false}
			}
		} else {
			// this is to make it so that it is compulsory to eat; find a better way to do this
			if (!tiles[id - 10].isEnemyHighlighted) {
				tiles[id - 12] = {...tiles[id - 12], highlighted: highlighted}
			}
		}
	}
	return tiles
}

//VERY SLOW AND TIME TRAVEL DOESNT EVEN WORK PROPERLY
export const selectDraught = (tiles, id, selectedId, playerTurn) => {
	if (selectedId !== 0) tiles = toggleTileHighlight(tiles, selectedId, false, false, playerTurn)
	tiles = toggleTileHighlight(tiles, id, tiles[id].selected ? false : true, tiles[id].selected ? false : true, playerTurn)

	return {
		type: actionTypes.SELECT_DRAUGHT,
		tiles: tiles.map((tile, tileId) => tileId === id ? {...tile, selected: !tile.selected} : {...tile, selected: false}),
		selectedId: !tiles[id].selected ? id : 0,
	}
}

export const moveDraught = (tiles, id, selectedId, playerTurn) => {
	let canChangePlayerTurn = true
	tiles = tiles.map((tile, tileId) => {
		if (tileId === selectedId) return {...tile, hasDraught: false, player: 0, highlighted: false}
		if (tileId === id) return {...tile, hasDraught: true, player: tiles[selectedId].player, highlighted: false}
		if (tile.isEnemyHighlighted) {
			canChangePlayerTurn = false
			return {...tile, hasDraught: false, player: 0, isEnemyHighlighted: false}
		}
		return {...tile, highlighted: false}
	})

	// Check if still can eat more, but find a better way
	selectedId = id
	if (!canChangePlayerTurn) {
		canChangePlayerTurn = true
		tiles = toggleTileHighlight(tiles, selectedId, true, true, playerTurn)
		for (let tile of tiles) {
			if (tile.isEnemyHighlighted) {
				tiles[selectedId] = {...tiles[selectedId], selected: true}
				canChangePlayerTurn = false
				break
			}
		}

	}

	if (canChangePlayerTurn) {
		tiles = toggleTileHighlight(tiles, selectedId, false, false, playerTurn)
		playerTurn = playerTurn === 1 ? 2 : 1
	}

	return {
		type: actionTypes.MOVE_DRAUGHT,
		tiles: tiles,
		selectedId: selectedId,
		playerTurn: playerTurn
	}
}