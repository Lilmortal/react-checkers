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
	console.log(props)
	const checker = (props.updatedTileId === props.id || props.hasChecker === true) ? <Checker player={props.player} x={props.x} y={props.y} lift={false} id={props.id} /> : null

	return (
		<div className="tile" style={(props.allowCheckers === false) ? evenTileStyle : oddTileStyle} 
		 onClick={() => props.moveCheckerPiece(props.lift, props.allowCheckers, props.hasChecker, props.id)}>
			{checker}
		</div>
	)
}

const mapStateToProps = (state) => ({
	lift: state.checkerReducer.lift,
	
	updatedTileId: state.tileReducer.updatedTileId,
})

export default connect(mapStateToProps, { moveCheckerPiece })(Tile)