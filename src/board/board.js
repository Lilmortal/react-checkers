import React from 'react'
import { Tile } from '../tile/tile'
import { connect } from 'react-redux'
import { selectDraught, moveDraught } from './boardActions'
import './board.css'

const Board = (props) => {
	const tiles = props.tiles.map((tile, id) => (
				<Tile key={id} 
				allowDraughts={tile.allowDraughts}
				hasDraught={tile.hasDraught}
				player={tile.player}
				selected={tile.selected}
				highlighted={tile.highlighted}
				isEnemyHighlighted={tile.isEnemyHighlighted}
				isQueen={tile.isQueen}
				x={tile.x}
				y={tile.y}
				id={id}
				tiles={props.tiles}
				selectedId={props.selectedId}
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
	tiles: React.PropTypes.array.isRequired,
	selectedId: React.PropTypes.number.isRequired,
	playerTurn: React.PropTypes.number.isRequired,
	selectDraught: React.PropTypes.func.isRequired,
	moveDraught: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
	tiles: state.draughtReducer.tiles,
	selectedId: state.draughtReducer.selectedId,
	playerTurn: state.draughtReducer.playerTurn,
})

export default connect(mapStateToProps, { selectDraught, moveDraught })(Board)
