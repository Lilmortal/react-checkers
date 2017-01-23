import React from 'react'
import Board from '../components/board'
import TileContainer from '../../tile/containers/tileContainer'
import { connect } from 'react-redux'

const getTileContainers = (tiles) => {
	return tiles.valueSeq().map((tile, id) => {
		return (
			<TileContainer key={id}
			id={id}
			tile={tile} />
		)
	})
}

export const BoardContainer = (props) => {
	const { tiles, playerTurn } = props
	return (
		<Board tiles={getTileContainers(tiles)} playerTurn={playerTurn} />
	)
}

export const mapStateToProps = (state) => ({
	tiles: state.tilesReducer.tiles,
	playerTurn: state.boardReducer.playerTurn
})

export default connect(mapStateToProps)(BoardContainer)
