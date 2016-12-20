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

export const Tile = (props) => {
	const draught = props.tile.get('hasDraught') === true ?
	<Draught
	tile={props.tile}
	selectedDraught={props.selectedDraught}
	playerTurn={props.playerTurn}
	selectDraught={props.selectDraught} /> : undefined

	const style = () => {
		if (props.tile.get('isEnemy')) return isEnemyTileStyle
		if (props.tile.get('highlighted')) return highlightedTileStyle
		if (props.tile.get('allowDraughts')) return oddTileStyle
		return evenTileStyle
	}
	return (
		<div className='tile' style={style()}
		onClick={() => {if (props.tile.get('highlighted') === true) props.moveDraught(props.tile, props.selectedDraught, props.playerTurn)}}>
			{draught}
		</div>
	)
}

Tile.proptypes = {
	hasDraught: React.PropTypes.bool.isRequired,
	player: React.PropTypes.number.isRequired,
	selected: React.PropTypes.bool.isRequired,
	id: React.PropTypes.number.isRequired,
	isQueen: React.PropTypes.bool.isRequired,
	x: React.PropTypes.number.isRequired,
	y: React.PropTypes.number.isRequired
}
