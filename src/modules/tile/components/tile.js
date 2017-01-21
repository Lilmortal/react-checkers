import React from 'react'
import './tile.css'

// ignore the horrible color choices; im just testing the libraries etc; I will fix design later
const evenTileStyle = {
	backgroundColor: 'red'
}

const oddTileStyle = {
	backgroundColor: 'black'
}

const isEnemyTileStyle = {
	backgroundColor: 'brown',
}

const highlightedTileStyle = {
	backgroundColor: 'orange',
	cursor: 'pointer'
}

const needToEatTileStyle = {
	backgroundColor: 'blue',
	cursor: 'pointer'
}

const Tile = (props) => {
	const { isEnemy, isHighlighted, isAbleToEat, allowDraught, draught, startMoveDraught } = props

	const style = () => {
		if (isEnemy) return isEnemyTileStyle
		if (isHighlighted) return highlightedTileStyle
		if (isAbleToEat) return needToEatTileStyle
		if (allowDraught) return oddTileStyle
		return evenTileStyle
	}
	return (
		<div className='tile' style={ style() } onClick={ () => typeof(startMoveDraught) === 'function' ? startMoveDraught() : undefined }>
			{draught}
		</div>
	)
}

Tile.proptypes = {
	isEnemy: React.PropTypes.bool.isRequired,
	isHighlighted: React.PropTypes.bool.isRequired,
	isAbleToEat: React.PropTypes.bool.isRequired,
	allowDraught: React.PropTypes.bool.isRequired,
	startMoveDraught: React.PropTypes.func
}

export default Tile
