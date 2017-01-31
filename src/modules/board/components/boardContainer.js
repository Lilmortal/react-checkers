import { Board } from './board'
import tile from '../../tile'
import { createStructuredSelector } from 'reselect'
import * as selectors from '../selectors'
import { connect } from 'react-redux'

const { getPlayerTurnSelector, getIsAbleToEatAvailableSelector, getSelectedDraughtSelector, getPreviousMoveSelector } = selectors
const { getTileContainersSelector } = tile.selectors

const mapStateToProps = (state, props) => {
	return createStructuredSelector({
		tiles: getTileContainersSelector(state, props),
		playerTurn: getPlayerTurnSelector,
		isAbleToEatAvailable: getIsAbleToEatAvailableSelector,
		selectedDraught: getSelectedDraughtSelector,
		previousMove: getPreviousMoveSelector
	})
}

export const BoardContainer = connect(mapStateToProps)(Board)
