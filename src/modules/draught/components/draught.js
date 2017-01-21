import React from 'react'
import './draught.css'

const Draught = (props) => {
	const { isQueen, player, isSelected, playerTurn, isAbleToEat, isAbleToEatAvailable, startSelectDraught } = props

	const queen = isQueen ? '♛' : ''

	let className = player === 1 ? ' player1' : ' player2'
	if (isSelected) className += ' draughtSelected'

	let cursor = player === playerTurn ? 'pointer' : 'default'
	if (isAbleToEatAvailable) {
		if (isAbleToEat) {
			cursor = 'pointer'
		} else {
			cursor = 'default'
		}
	}

	let draughtStyle = {
		cursor: cursor
	}

	return (
		<div className={'draught' + className} style={draughtStyle} onClick={ () => typeof(startSelectDraught) === 'function' ? startSelectDraught() : undefined }>
			<div className='draughtQueen' style={draughtStyle}>{queen}</div>
		</div>
	)
}

export default Draught
