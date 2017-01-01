import React from 'react'
import './draught.css'

export const Draught = (props) => {
	const queen = props.tile.get('isQueen') ? '♛' : ''

	let className = props.tile.get('player') === 1 ? ' player1' : ' player2'
	if (props.tile.get('selected')) className += ' draughtSelected'

	let cursor = props.tile.get('player') === props.playerTurn ? 'pointer' : 'default'
	if (props.compulsoryToEat) {
		if (props.tile.get('needToEat')) {
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
			if ((!props.compulsoryToEat && props.tile.get('player') === props.playerTurn) || (props.compulsoryToEat && props.tile.get('needToEat')))
				props.startSelectDraught(props.tile, props.selectedDraught, props.playerTurn)}}>
			<div className='draughtQueen' style={draughtStyle}>{queen}</div>
		</div>
	)
}
