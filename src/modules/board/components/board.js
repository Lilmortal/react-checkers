import React from 'react'
import './board.css'

const Board = ({ playerTurn, tiles }) => {
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

export default Board
