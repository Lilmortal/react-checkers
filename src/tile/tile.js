import React from 'react'
import { Draught } from '../draught/draught'
import './tile.css'

const evenTileStyle = {
	backgroundColor: 'red'
}

const oddTileStyle = {
	backgroundColor: 'black'
}

const isEnemyHighlightedTileStyle = {
	backgroundColor: 'blue'
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
	selectedId={props.selectedId}
	playerTurn={props.playerTurn}
	selectDraught={props.selectDraught} /> : undefined

	const style = () => {
		if (props.isEnemyHighlighted) return isEnemyHighlightedTileStyle
		if (props.highlighted) return highlightedTileStyle
		if (props.allowDraughts) return oddTileStyle
		return evenTileStyle
	}
	return (
		<div className="tile" style={style()}
		onClick={() => {if (props.highlighted === true) props.moveDraught(props.tiles, props.id, props.selectedId, props.playerTurn)}}>
			{draught}
		</div>
	)
}