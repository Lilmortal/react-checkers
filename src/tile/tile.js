import React from 'react'
import { connect } from 'react-redux'
import Checker from '../checker/checker'
import { moveCheckerPiece } from './tileActions'
import './tile.css'

const evenTileStyle = {
	backgroundColor: 'red'
}

const oddTileStyle = {
	backgroundColor: 'black'
}

const Tile = (props) => {
	const checker = props.hasChecker === true ? <Checker player={props.player} x={props.x} y={props.y} lift='false' id={props.id} /> : null

		console.log(props)
	return (
		<div className="tile" style={(props.allowCheckers === 'false') ? evenTileStyle : oddTileStyle} onClick={() => props.moveCheckerPiece()}>
			{checker}
		</div>
	)
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, { moveCheckerPiece })(Tile)