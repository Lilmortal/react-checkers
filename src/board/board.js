import React from 'react'
import { Tile } from '../tile/tile'
import { connect } from 'react-redux'
import { selectDraught, moveDraught } from './boardActions'
import './board.css'

const Board = (props) => {
	const tilesProperties = []
	let evenTile = false, id = 0, hasDraught, player
	
	const populateTiles = () => {
		for (let y = 0; y < 11; y++) {
			evenTile = !evenTile
			if (y < 3) {
				hasDraught = true
				player = 1
			} else if (y > 7) {
				hasDraught = true
				player = 2
			} else {
				hasDraught = false
				player = 0
			}

			for (let x = 0; x < 11; x++) {
				let tileProperty = {}
				if (x % 2 == evenTile) {
					Object.assign(tileProperty, {allowDraughts: false, hasDraught: false, player: undefined, selected: false, x: x, y: y})
				} else {
					Object.assign(tileProperty, {allowDraughts: true, hasDraught: hasDraught, player: player, selected: props.selected, x: x, y: y})
				}
				tilesProperties.push(tileProperty)
			}
		}

		const tiles = []
		tilesProperties.map((tileProperty, id) => {
			tiles.push(
				<Tile key={id} 
				allowDraughts={tileProperty.allowDraughts}
				hasDraught={tileProperty.hasDraught}
				player={tileProperty.player}
				selected={tileProperty.selected}
				x={tileProperty.x} 
				y={tileProperty.y}
				selectDraught={props.selectDraught}
				moveDraught={props.moveDraught} />
			)
		})
		return tiles
	}
	
	const tiles = populateTiles()

	return (
		<div className='board'>
			{tiles}
		</div>
	)
}

const mapStateToProps = (state) => ({
	selected: state.selectDraughtReducer.selected,
})

export default connect(mapStateToProps, { selectDraught, moveDraught })(Board)
