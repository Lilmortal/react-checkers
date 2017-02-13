import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import draughtModule from '../../draught'
import * as selectors from '../selectors'
import { START_MOVE_DRAUGHT } from '../actions'
import Tile from './tile'

const { isEnemySelector, isHighlightedSelector, isAbleToEatSelector, allowDraughtSelector, canBeMovedSelector } = selectors
const { draughtContainerSelector } = draughtModule.selectors

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
			dispatch(START_MOVE_DRAUGHT(id))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Tile)
