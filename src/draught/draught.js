import React from 'react'
import './draught.css'

export const Draught = (props) => {
	const queen = props.tile.get('isQueen') ? '♛' : ''

	let className = props.tile.get('player') === 1 ? ' player1' : ' player2'
	if (props.tile.get('isSelected')) className += ' draughtSelected'

	let cursor = props.tile.get('player') === props.playerTurn ? 'pointer' : 'default'
	if (props.isAbleToEatAvailable) {
		if (props.tile.get('isAbleToEat')) {
			cursor = 'pointer'
		} else {
			cursor = 'default'
		}
	}

	let draughtStyle = {
		cursor: cursor
	}

	return (
		<div className={'draught' + className} style={draughtStyle}
		onClick={() => {
			if ((!props.isAbleToEatAvailable && props.tile.get('player') === props.playerTurn) || (props.isAbleToEatAvailable && props.tile.get('isAbleToEat')))
				props.startSelectDraught(props.tile, props.selectedDraught, props.playerTurn)}}>
			<div className='draughtQueen' style={draughtStyle}>{queen}</div>
		</div>
	)
}
