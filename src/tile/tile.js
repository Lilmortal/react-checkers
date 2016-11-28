import React from 'react'
import Checker from '../checker/checker'
import './tile.css'

const evenTileStyle = {
	backgroundColor: 'red'
}

const oddTileStyle = {
	backgroundColor: 'black'
}

const Tile = (props) => {
	const checker = props.hasChecker === true ? <Checker player={props.player} /> : null
	return (
		<div className="tile" style={(props.allowCheckers === 'false') ? evenTileStyle : oddTileStyle}>
			{checker}
		</div>
	)
}

export default Tile