import React from 'react'
import './draught.css'

const Draught = ({ id, player, isSelected, selectDraughtClick, canBeSelected, isQueen }) => {
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

export default Draught
