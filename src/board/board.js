import React from 'react'
import { Tile } from '../tile/tile'
import { connect } from 'react-redux'
import { selectDraught, moveDraught } from './boardActions'
import './board.css'

const Board = (props) => {
	const tiles = props.tiles.valueSeq().map((tile, id) => (
				<Tile key={id}
				tile={tile}
				selectedDraught={props.selectedDraught}
				playerTurn={props.playerTurn}
				selectDraught={props.selectDraught}
				moveDraught={props.moveDraught} />))

	return (
		<div className='board'>
			<h1>Player {props.playerTurn} turn</h1>
			{tiles}
		</div>
	)
}

Board.propTypes = {
	tiles: React.PropTypes.object.isRequired,
	selectedDraught: React.PropTypes.object,
	playerTurn: React.PropTypes.number.isRequired,
	selectDraught: React.PropTypes.func.isRequired,
	moveDraught: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
	tiles: state.draughtReducer.tiles,
	selectedDraught: state.draughtReducer.selectedDraught,
	playerTurn: state.draughtReducer.playerTurn,
})

export default connect(mapStateToProps, { selectDraught, moveDraught })(Board)
