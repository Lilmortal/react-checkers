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

export const Draught = (props) => {
	let styles = props.player === 1 ? player1Style : player2Style
	if (props.selected) {
		styles = Object.assign({}, styles, selectedDraughtStyle)
	}
	return (
		<div className="draught" onClick={() => props.selectDraught(props.tiles, props.selected, props.player, props.id)} style={styles}></div>
	)
}