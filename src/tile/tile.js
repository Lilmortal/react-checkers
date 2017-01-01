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
	backgroundColor: 'brown'
}

const highlightedTileStyle = {
	backgroundColor: 'orange'
}

const needToEatTileStyle = {
	backgroundColor: 'blue'
}

export const Tile = (props) => {
	const draught = props.tile !== undefined && props.tile.get('hasDraught') === true ?
	<Draught
	tile={props.tile}
	compulsoryToEat={props.compulsoryToEat}
	selectedDraught={props.selectedDraught}
	playerTurn={props.playerTurn}
	startSelectDraught={props.startSelectDraught} /> : undefined

	const style = () => {
		if (props.tile !== undefined && props.tile.get('isEnemy')) return isEnemyTileStyle
		if (props.tile !== undefined && props.tile.get('highlighted')) return highlightedTileStyle
		if (props.tile !== undefined && props.tile.get('needToEat')) return needToEatTileStyle
		if (props.tile !== undefined && props.tile.get('allowDraughts')) return oddTileStyle
		return evenTileStyle
	}
	return (
		<div className='tile' style={style()} onClick={() => {
			if (props.tile !== undefined && props.tile.get('highlighted') === true) {
				props.startMoveDraught(props.tile, props.selectedDraught, props.previousDraughtMove, props.playerTurn)
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
	selected: React.PropTypes.bool.isRequired,
	highlighted: React.PropTypes.bool.isRequired,
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
