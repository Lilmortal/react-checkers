import React from 'react'
import Tile from '../tile/tile'
import './board.css'

const Board = () => {
	const tiles = []
	let even = false, hasChecker, player

	for (let i = 0; i < 11; i++) {
		even = !even
		if (i < 3) {
			hasChecker = true
			player = 1
		} else if (i > 7) {
			hasChecker = true
			player = 2
		} else {
			hasChecker = false
			player = 0
		}

		for (let j = 0; j < 11; j++) {
			// eslint-disable-next-line
			if (j % 2 == even) {
					tiles.push(<Tile allowCheckers='false' key={'' + i + j} />)
			} else {
					tiles.push(<Tile allowCheckers='true' key={'' + i + j} hasChecker={hasChecker} player={player} />)
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