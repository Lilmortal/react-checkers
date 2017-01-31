import React from 'react'
import './draught.css'

export const Draught = (props) => {
	const { id, player, isSelected, selectDraughtClick, canSelectDraught, isQueen } = props

	let className = 'draught ' + (player === 1 ? 'player1' : 'player2')
	if (isSelected) className += ' draughtSelected'

	const draughtStyle = {
		cursor: canSelectDraught ? 'pointer' : 'default'
	}

	const queen = isQueen ? '♛' : ''

	return (
		<div className={className} style={draughtStyle} onClick={ () => canSelectDraught ? selectDraughtClick(id) : undefined }>
			<div className='draughtQueen' style={draughtStyle}>{queen}</div>
		</div>
	)
}

Draught.proptypes = {
	id: React.PropTypes.number.isRequired,
	player: React.PropTypes.number.isRequired,
	isSelected: React.PropTypes.bool.isRequired,
	selectDraughtClick: React.PropTypes.func,
	canSelectDraught: React.PropTypes.bool.isRequired,
	isQueen: React.PropTypes.bool.isRequired
}
