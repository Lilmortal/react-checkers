import React from 'react'
import './board.css'

export const Board = (props) => {
	const { playerTurn, tiles } = props
	return (
		<div className='board'>
			<h1>Player {playerTurn} turn</h1>
			{tiles}
		</div>
	)
}

Board.proptypes = {
	playerTurn: React.PropTypes.number.isRequired,
	tiles: React.PropTypes.object.isRequired
}
