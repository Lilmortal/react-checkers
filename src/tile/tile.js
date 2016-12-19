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
	const draught = props.hasDraught === true ?
	<Draught player={props.player}
	selected={props.selected}
	id={props.id}
	tiles={props.tiles}
	selectedDraughtId={props.selectedDraughtId}
	playerTurn={props.playerTurn}
	isQueen={props.isQueen}
	x={props.x}
	y={props.y}
	selectDraught={props.selectDraught} /> : undefined

	const style = () => {
		if (props.isEnemy) return isEnemyTileStyle
		if (props.highlighted) return highlightedTileStyle
		if (props.allowDraughts) return oddTileStyle
		return evenTileStyle
	}
	return (
		<div className='tile' style={style()}
		onClick={() => {if (props.highlighted === true) props.moveDraught(props.tiles, props.id, props.selectedDraughtId, props.playerTurn)}}>
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
