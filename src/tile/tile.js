import React from 'react'
import { Draught } from '../draught/draught'
import './tile.css'

const evenTileStyle = {
	backgroundColor: 'red'
}

const oddTileStyle = {
	backgroundColor: 'black'
}

const canMoveDraught = (props) => {
	if (props.selectedId !== 0 && props.selectedId !== props.id && !props.hasDraught) 
		return props.moveDraught(props.tiles, props.hasDraught, props.allowDraughts, props.selectedId, props.selectedPlayer, props.id)
}

export const Tile = (props) => {
	const draught = props.hasDraught === true ? 
	<Draught player={props.player} 
	selected={props.selected} 
	id={props.id}
	tiles={props.tiles}
	selectDraught={props.selectDraught} /> : undefined

	return (
		<div className="tile" style={(props.allowDraughts === false) ? evenTileStyle : oddTileStyle}
		onClick={() => canMoveDraught(props)}>
			{draught}
		</div>
	)
}