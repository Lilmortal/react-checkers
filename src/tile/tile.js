import React from 'react'
import { Draught } from '../draught/draught'
import './tile.css'

const evenTileStyle = {
	backgroundColor: 'red'
}

const oddTileStyle = {
	backgroundColor: 'black'
}

export const Tile = (props) => {
	const draught = props.hasDraught === true ? 
	<Draught player={props.player} 
	selected={props.selected} 
	x={props.x} 
	y={props.y}
	selectDraught={props.selectDraught} /> : null

	return (
		<div className="tile" style={(props.allowDraughts === false) ? evenTileStyle : oddTileStyle} onClick={() => props.moveDraught()}>
			{draught}
		</div>
	)
}



