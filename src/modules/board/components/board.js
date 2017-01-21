import React from 'react'
import './board.css'

const Board = (props) => {
	const { playerTurn, tiles } = props
	return (
		<div className='board'>
			<h1>Player {playerTurn} turn</h1>
			{tiles}
		</div>
	)
}

export default Board
