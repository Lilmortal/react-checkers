import React from 'react'
import './draught.css'

const player1Style = {
	backgroundColor: 'white'
}

const player2Style = {
	backgroundColor: 'maroon'
}

const selectedDraughtStyle = {
	margin: '0 0 20px 20px',
	boxShadow: '-10px 5px grey'
}

const queenStyle = {
	backgroundColor: 'green'
}

export const Draught = (props) => {
	let styles = props.player === 1 ? player1Style : player2Style
	if (props.selected) styles = {...styles, selectedDraughtStyle}
	if (props.isQueen) styles = {...styles, queenStyle}
		
	return (
		<div className="draught" 
		onClick={() => {if (props.player === props.playerTurn) props.selectDraught(props.tiles, props.id, props.selectedId, props.playerTurn)}} style={styles}>
		</div>
	)
}