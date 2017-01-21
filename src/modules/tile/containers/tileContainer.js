import React from 'react'
import Tile from '../components/tile'
import Draught from '../../draught/components/draught'
import { connect } from 'react-redux'
import { startSelectDraught, startMoveDraught } from '../ducks/tile'
import { NEIGHBOUR_TILES } from './tilesContainer'

/**
 * Toggle one tile neighbour highlight
 * @param  {Object}  tile          The tile that the user selected
 * @param  {Object}  neighbourTile The tile neighbour that this function will be looking at
 * @param  {Number}  enemyPlayer   The enemy player
 * @param  {Boolean} isHighlighted Determine if the tile neighbours should be highlighted or not
 * @return {Object}                Return the updated tile neighbour
 */
const toggleNeighbourTileHighlight = (tile, neighbourTile, enemyPlayer, isHighlighted) => {
	if (tile.get(neighbourTile)) {
		// checks if it can eat
		if (tile.getIn([neighbourTile, 'player']) === enemyPlayer && tile.getIn([neighbourTile, neighbourTile]) && !tile.getIn([neighbourTile, neighbourTile, 'hasDraught'])) {
			tile = tile.withMutations((tile) => tile.setIn([neighbourTile, 'isEnemy'], isHighlighted).setIn([neighbourTile, neighbourTile, 'isHighlighted'], isHighlighted))
		} else if (!tile.getIn([neighbourTile, 'hasDraught'])) {
			tile = tile.setIn([neighbourTile, 'isHighlighted'], isHighlighted)
			if (tile.getIn([neighbourTile, neighbourTile]))
				tile = tile.setIn([neighbourTile, neighbourTile, 'isHighlighted'], false)
		} else if (tile.getIn([neighbourTile, 'hasDraught'])) {
			if (tile.getIn([neighbourTile, neighbourTile]))
				tile = tile.setIn([neighbourTile, neighbourTile, 'isHighlighted'], false)
		}
	}
	return tile
}

/**
 * Toggle the tile neighbour highlights
 * @param  {Object}  tile          The tile that the user selected
 * @param  {Number}  playerTurn    The current players turn
 * @param  {Boolean} isHighlighted Determine if the tile neighbours should be highlighted or not
 * @return {Object}                Return the updated tile neighbours
 */
export const toggleTileHighlights = (tile, playerTurn, isHighlighted) => {
	const enemyPlayer = playerTurn === 1 ? 2 : 1
	Object.keys(NEIGHBOUR_TILES).map((neighbour) => {
		if (NEIGHBOUR_TILES[neighbour].player === playerTurn || tile.get('isQueen')) {
			tile = toggleNeighbourTileHighlight(tile, neighbour, enemyPlayer, isHighlighted)
		}
		return neighbour
	})

	// all neighbours are diagonal
	const hasNeighbourEnemies = Object.keys(NEIGHBOUR_TILES).some((neighbour) => {
		return tile.getIn([neighbour, 'isEnemy']) ? true : false
	})

	if (hasNeighbourEnemies) {
		Object.keys(NEIGHBOUR_TILES).map((neighbour) => {
			if (tile.get(neighbour) && !tile.getIn([neighbour, 'isEnemy'])) {
				tile = tile.setIn([neighbour, 'isHighlighted'], false)
				if (tile.getIn([neighbour, neighbour]))
				tile = tile.setIn([neighbour, neighbour, 'isHighlighted'], false)
			}
			return neighbour
		})
	}
	return tile
}

export const canSelectDraught = (isAbleToEatAvailable, playerTurn, tile) => {
	if ((!isAbleToEatAvailable && tile.get('player') === playerTurn) || (isAbleToEatAvailable && tile.get('isAbleToEat'))) {
		return true
	}
	return false
}

export const canMoveDraught = (tile) => {
	if (tile.get('isHighlighted')) {
		return true
	}
	return false
}

export const TileContainer = (props) => {
	const { isAbleToEatAvailable, playerTurn, selectedDraught, previousMove, tile, startSelectDraught, startMoveDraught } = props

	const startSelectDraughtReference = canSelectDraught(isAbleToEatAvailable, playerTurn, tile) ?
	startSelectDraught.bind(this, tile, selectedDraught, previousMove, playerTurn, isAbleToEatAvailable) : undefined
	const startMoveDraughtReference = canMoveDraught(tile) ? startMoveDraught.bind(this, tile, selectedDraught, previousMove, playerTurn, isAbleToEatAvailable) : undefined

	const draught = tile.get('hasDraught') ?
	<Draught
	isSelected={tile.get('isSelected')}
	player={tile.get('player')}
	playerTurn={playerTurn}
	isQueen={tile.get('isQueen')}
	isAbleToEat={tile.get('isAbleToEat')}
	isAbleToEatAvailable={tile.get('isAbleToEatAvailable')}
	startSelectDraught={startSelectDraughtReference} /> : undefined

	return (
		<Tile isEnemy={tile.get('isEnemy')} isHighlighted={tile.get('isHighlighted')} isAbleToEat={tile.get('isAbleToEat')} allowDraught={tile.get('allowDraught')}
		startMoveDraught={startMoveDraughtReference} draught={draught} />
	)
}

export const mapStateToProps = (state) => ({
	isAbleToEatAvailable: state.boardReducer.isAbleToEatAvailable,
	playerTurn: state.boardReducer.playerTurn,
	selectedDraught: state.boardReducer.selectedDraught,
	previousMove: state.boardReducer.previousMove
})

export default connect(mapStateToProps, { startSelectDraught, startMoveDraught })(TileContainer)
