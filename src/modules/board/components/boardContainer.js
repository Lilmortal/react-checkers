import Board from './board'
import tileModule from '../../tile'
import { createStructuredSelector } from 'reselect'
import * as selectors from '../selectors'
import { connect } from 'react-redux'

const { playerTurnSelector } = selectors
const { tileContainersSelector } = tileModule.selectors

const mapStateToProps = (state, props) => {
	return createStructuredSelector({
		tiles: tileContainersSelector,
		playerTurn: playerTurnSelector
	})
}

export default connect(mapStateToProps)(Board)
