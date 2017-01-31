import { Tile } from './tile'
import draught from '../../draught'
import * as selectors from '../selectors'
import { startMoveDraught } from '../actions'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

const { isEnemySelector, isHighlightedSelector, isAbleToEatSelector, allowDraughtSelector, canBeMovedSelector } = selectors
const { draughtContainerSelector } = draught.selectors

const mapStateToProps = (state, props) => {
	return createStructuredSelector({
		isEnemy: isEnemySelector,
		isHighlighted: isHighlightedSelector,
		isAbleToEat: isAbleToEatSelector,
		allowDraught: allowDraughtSelector,
		draught: draughtContainerSelector,
		canBeMoved: canBeMovedSelector
	})
}

const mapDispatchToProps = (dispatch) => {
	return {
		moveDraughtClick: (id) => {
			dispatch(startMoveDraught(id))
		}
	}
}
export const TileContainer = connect(mapStateToProps, mapDispatchToProps)(Tile)
