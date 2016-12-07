import React from 'react'
import Tile from '../tile/tile'
import './board.css'

const Board = () => {
	const tiles = []
	let even = false, hasChecker, player, id = 0

	for (let y = 0; y < 11; y++) {
		even = !even
		if (y < 3) {
			hasChecker = true
			player = 1
		} else if (y > 7) {
			hasChecker = true
			player = 2
		} else {
			hasChecker = false
			player = 0
		}

		for (let x = 0; x < 11; x++) {
			// eslint-disable-next-line
			if (x % 2 == even) {
					tiles.push(<Tile allowCheckers={false} key={id++} id={id} />)
			} else {
					tiles.push(<Tile allowCheckers={true} key={id++} hasChecker={hasChecker} player={player} x={x} y={y} id={id} />)
			}
		}
	}

	return (
		<div className='board'>
			{tiles}
		</div>
	)
}

export default Board