import React from 'react'
import './draught.css'

export const Draught = (props) => {
	const queen = props.isQueen ? '♛' : ''

	let className = props.player === 1 ? ' player1' : ' player2'
	if (props.selected) className += ' draughtSelected'

	return (
		<div className={'draught' + className}
		onClick={() => {if (props.player === props.playerTurn) props.selectDraught(props.tiles, props.id, props.selectedDraughtId, props.playerTurn)}}>
			<div className='draughtQueen'>{queen}</div>
		</div>
	)
}
