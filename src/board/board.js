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
				id={id}
				tiles={props.tiles}
				selectedId={props.selectedId}
				selectedPlayer={props.selectedPlayer}
				selectDraught={props.selectDraught}
				moveDraught={props.moveDraught} />))

	return (
		<div className='board'>
			{tiles}
		</div>
	)
}

const mapStateToProps = (state) => ({
	tiles: state.draughtReducer.tiles,
	selectedId: state.draughtReducer.selectedId,
	selectedPlayer: state.draughtReducer.selectedPlayer
})

export default connect(mapStateToProps, { selectDraught, moveDraught })(Board)
