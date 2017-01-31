import React from 'react'
import './tile.css'

export const Tile = (props) => {
	const { id, isEnemy, isHighlighted, isAbleToEat, allowDraught, draught, canMoveDraught, moveDraughtClick } = props

	let tileState = 'tile '
	if (isEnemy) tileState += 'enemyTile'
	else if (isHighlighted) tileState += 'highlightedTile'
	else if (isAbleToEat) tileState += 'ableToEatTile'
	else if (allowDraught) tileState += 'allowDraughtTile'
	else tileState += 'notAllowDraughtTile'

	return (
		<div className={tileState} onClick={ () => canMoveDraught ? moveDraughtClick(id) : undefined }>
			{draught}
		</div>
	)
}

Tile.proptypes = {
	id: React.PropTypes.number.isRequired,
	isEnemy: React.PropTypes.bool.isRequired,
	isHighlighted: React.PropTypes.bool.isRequired,
	isAbleToEat: React.PropTypes.bool.isRequired,
	allowDraught: React.PropTypes.bool.isRequired,
	draught: React.PropTypes.object,
	canMoveDraught: React.PropTypes.bool.isRequired,
	moveDraughtClick: React.PropTypes.func
}
