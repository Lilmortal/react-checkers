import React from 'react'
import { Tile } from '../tile/tile'
import { connect } from 'react-redux'
import { startSelectDraught, startMoveDraught } from './boardActions'
import './board.css'

const Board = (props) => {
	const tiles = props.tiles.valueSeq().map((tile, id) => (
				<Tile key={id}
				tile={tile}
				id={id}
				selectedDraught={props.selectedDraught}
				playerTurn={props.playerTurn}
				compulsoryToEat={props.compulsoryToEat}
				previousDraughtMove={props.previousDraughtMove}
				startSelectDraught={props.startSelectDraught}
				startMoveDraught={props.startMoveDraught} />))

	return (
		<div className='board'>
			<h1>Player {props.playerTurn} turn</h1>
			{tiles}
		</div>
	)
}

const mapStateToProps = (state) => ({
	tiles: state.draughtReducer.tiles,
	selectedDraught: state.draughtReducer.selectedDraught,
	playerTurn: state.draughtReducer.playerTurn,
	compulsoryToEat: state.draughtReducer.compulsoryToEat,
	previousDraughtMove: state.draughtReducer.previousDraughtMove
})

Board.propTypes = {
	tiles: React.PropTypes.object.isRequired,
	selectedDraught: React.PropTypes.object,
	playerTurn: React.PropTypes.number.isRequired,
	compulsoryToEat: React.PropTypes.bool.isRequired,
	previousDraughtMove: React.PropTypes.object,
	startSelectDraught: React.PropTypes.func.isRequired,
	startMoveDraught: React.PropTypes.func.isRequired
}

export default connect(mapStateToProps, { startSelectDraught, startMoveDraught })(Board)
