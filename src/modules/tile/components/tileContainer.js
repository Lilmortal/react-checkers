import { Tile } from './tile'
import draught from '../../draught'
import * as selectors from '../selectors'
import { startMoveDraught } from '../actions'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

const { getIsEnemySelector, getIsHighlightedSelector, getIsAbleToEatSelector, getAllowDraughtSelector, canMoveDraughtSelector } = selectors
const { getDraughtContainerSelector } = draught.selectors

const mapStateToProps = (state, props) => {
	return createStructuredSelector({
		isEnemy: getIsEnemySelector,
		isHighlighted: getIsHighlightedSelector,
		isAbleToEat: getIsAbleToEatSelector,
		allowDraught: getAllowDraughtSelector,
		draught: getDraughtContainerSelector(state, props),
		canMoveDraught: canMoveDraughtSelector
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
