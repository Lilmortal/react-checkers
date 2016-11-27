import React from 'react'
import './checker.css'

const player1 = {
	backgroundColor: 'white'
}

const player2 = {
	backgroundColor: 'maroon'
}

const Checker = (props) => {
	return (
		<div className="board__checker" style={props.player == 1 ? player1 : player2}></div>
	)
}

export default Checker