import React from 'react'
import { Draught } from '../draught/draught'
import './tile.css'

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
		if (props.tile.get('allowDraughts')) return oddTileStyle
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
	allowDraughts: React.PropTypes.bool.isRequired,
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
