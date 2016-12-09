import * as actionTypes from './boardActionTypes'

export const selectDraught = (tiles, selected, player, id) => {
	return {
		type: actionTypes.SELECT_DRAUGHT,
		tiles: tiles.map((tile, tileId) => tileId === id ? {...tile, selected: !selected} : {...tile, selected: false}),
		selectedId: id,
		selectedPlayer: player
	}
}

const eatOtherPlayerDraught = (tiles, possibleEnemyDraughtId) => {
	tiles = tiles.map((tile, tileId) => {
		if (tileId === tiles[possibleEnemyDraughtId].id) return {...tile, hasDraught: false, player: 0}
		return tile
	})
	return tiles
}

const canEatOtherPlayerDraught = (tiles, selectedId, id, possibleEnemyDraughtId, enemyPlayer) => {
	if (selectedId === id && tiles[possibleEnemyDraughtId].hasDraught && tiles[possibleEnemyDraughtId].player === enemyPlayer) {
		return true
	}
	return false
}

export const moveDraught = (tiles, hasDraught, allowDraughts, selectedId, selectedPlayer, id) => {
	let isPlayerMoveValid = false
	if (selectedPlayer === 1) {
		isPlayerMoveValid = (selectedId + 12) === id || (selectedId + 10) === id
	} else if (selectedPlayer === 2) {
		isPlayerMoveValid = (selectedId - 12) === id || (selectedId - 10) === id
	}

	if (!hasDraught && allowDraughts && isPlayerMoveValid) {
		tiles = tiles.map((tile, tileId) => {
					if (tileId === selectedId) return {...tile, hasDraught: false, player: 0}
					if (tileId === id) return {...tile, hasDraught: true, player: selectedPlayer}
					return tile
				})
		selectedId = 0
		selectedPlayer = 0
	} else {
		if (selectedPlayer === 1) {
			while (true) {
				if (canEatOtherPlayerDraught(tiles, selectedId + 20, id, selectedId + 10, 2)) {
					tiles = eatOtherPlayerDraught(tiles, selectedId + 10)
					tiles = tiles.map((tile, tileId) => {
						if (tileId === selectedId) return {...tile, hasDraught: false, player: 0}
						if (tileId === id) return {...tile, hasDraught: true, player: selectedPlayer}
					return tile
				})
					continue
				} else if (canEatOtherPlayerDraught(tiles, selectedId + 24, id, selectedId + 12, 2)) {
					tiles = eatOtherPlayerDraught(tiles, selectedId + 12)
					tiles = tiles.map((tile, tileId) => {
						if (tileId === selectedId) return {...tile, hasDraught: false, player: 0}
						if (tileId === id) return {...tile, hasDraught: true, player: selectedPlayer}
					return tile
				})
					continue
				}
				break
			}
		} else if (selectedPlayer === 2) {
			while (true) {
				if (canEatOtherPlayerDraught(tiles, selectedId - 20, id, selectedId - 10, 1)) {
					tiles = eatOtherPlayerDraught(tiles, selectedId - 10)
					tiles = tiles.map((tile, tileId) => {
						if (tileId === selectedId) return {...tile, hasDraught: false, player: 0}
						if (tileId === id) return {...tile, hasDraught: true, player: selectedPlayer}
					return tile
				})
					continue
				} else if (canEatOtherPlayerDraught(tiles, selectedId - 24, id, selectedId - 12, 1)) {
					tiles = eatOtherPlayerDraught(tiles, selectedId - 12)
					tiles = tiles.map((tile, tileId) => {
						if (tileId === selectedId) return {...tile, hasDraught: false, player: 0}
						if (tileId === id) return {...tile, hasDraught: true, player: selectedPlayer}
					return tile
				})
					continue
				}
				break
			}
		}
	}

	return {
		type: actionTypes.MOVE_DRAUGHT,
		tiles: tiles,
		selectedId: selectedId,
		selectedPlayer: selectedPlayer
	}
}