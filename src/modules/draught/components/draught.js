import React from 'react'
import './draught.css'

export const Draught = (props) => {
	const { id, player, isSelected, selectDraughtClick, canBeSelected, isQueen } = props

	let className = 'draught ' + (player === 1 ? 'player1' : 'player2')
	if (isSelected) className += ' draughtSelected'
	if (canBeSelected) className += ' canBeSelected'

	let queenClassName = 'draughtQueen'
	if (canBeSelected) queenClassName += ' canBeSelected'

	const queen = isQueen ? '♛' : ''

	return (
		<div className={className} onClick={ () => canBeSelected ? selectDraughtClick(id) : undefined }>
			<div className={queenClassName}>{queen}</div>
		</div>
	)
}

Draught.proptypes = {
	id: React.PropTypes.number.isRequired,
	player: React.PropTypes.number.isRequired,
	isSelected: React.PropTypes.bool.isRequired,
	selectDraughtClick: React.PropTypes.func,
	canBeSelected: React.PropTypes.bool.isRequired,
	isQueen: React.PropTypes.bool.isRequired
}
