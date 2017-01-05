import React from 'react'
import { Draught } from '../draught/draught'
import { NEIGHBOUR_TILES } from '../tiles/tiles'
import './tile.css'

// ignore the horrible color choices; im just testing the libraries etc; I will fix design later
const evenTileStyle = {
	backgroundColor: 'red'
}

const oddTileStyle = {
	backgroundColor: 'black'
}

const isEnemyTileStyle = {
	backgroundColor: 'brown',
}

const highlightedTileStyle = {
	backgroundColor: 'orange',
	cursor: 'pointer'
}

const needToEatTileStyle = {
	backgroundColor: 'blue',
	cursor: 'pointer'
}

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

export const Tile = (props) => {
	const draught = props.tile.get('hasDraught') ?
	<Draught
	tile={props.tile}
	isAbleToEatAvailable={props.isAbleToEatAvailable}
	selectedDraught={props.selectedDraught}
	playerTurn={props.playerTurn}
	startSelectDraught={props.startSelectDraught} /> : undefined

	const style = () => {
		if (props.tile.get('isEnemy')) return isEnemyTileStyle
		if (props.tile.get('isHighlighted')) return highlightedTileStyle
		if (props.tile.get('isAbleToEat')) return needToEatTileStyle
		if (props.tile.get('allowDraught')) return oddTileStyle
		return evenTileStyle
	}
	return (
		<div className='tile' style={style()} onClick={() => {
			if (props.tile.get('isHighlighted')) {
				props.startMoveDraught(props.tile, props.selectedDraught, props.previousSelectedDraught, props.previousMove, props.playerTurn)
			}
		}}>
			{draught}
		</div>
	)
}

Tile.proptypes = {
	allowDraught: React.PropTypes.bool.isRequired,
	hasDraught: React.PropTypes.bool.isRequired,
	player: React.PropTypes.number.isRequired,
	isSelected: React.PropTypes.bool.isRequired,
	isHighlighted: React.PropTypes.bool.isRequired,
	isEnemy: React.PropTypes.bool.isRequired,
	isQueen: React.PropTypes.bool.isRequired,
	needToEat: React.PropTypes.bool.isRequired,
	topLeftTile: React.PropTypes.object,
	topRightTile: React.PropTypes.object,
	bottomLeftTile: React.PropTypes.object,
	bottomRightTile: React.PropTypes.object,
	x: React.PropTypes.number.isRequired,
	y: React.PropTypes.number.isRequired,
	id: React.PropTypes.number.isRequired,
}
