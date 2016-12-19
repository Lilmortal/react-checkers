import React from 'react'
import { Tile } from '../tile/tile'
import { connect } from 'react-redux'
import { selectDraught, moveDraught } from './boardActions'
import './board.css'

const Board = (props) => {
	const tiles = props.tiles.valueSeq().map((tile, id) => (
				<Tile key={id}
				allowDraughts={tile.get('allowDraughts')}
				hasDraught={tile.get('hasDraught')}
				player={tile.get('player')}
				selected={tile.get('selected')}
				highlighted={tile.get('highlighted')}
				isEnemy={tile.get('isEnemy')}
				isQueen={tile.get('isQueen')}
				x={tile.get('x')}
				y={tile.get('y')}
				id={id}
				tiles={props.tiles}
				selectedDraughtId={props.selectedDraughtId}
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
	selectedDraughtId: React.PropTypes.number.isRequired,
	playerTurn: React.PropTypes.number.isRequired,
	selectDraught: React.PropTypes.func.isRequired,
	moveDraught: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
	tiles: state.draughtReducer.tiles,
	selectedDraughtId: state.draughtReducer.selectedDraughtId,
	playerTurn: state.draughtReducer.playerTurn,
})

export default connect(mapStateToProps, { selectDraught, moveDraught })(Board)
