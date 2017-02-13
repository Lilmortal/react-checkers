import Board from './board'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import tileModule from '../../tile'
import * as selectors from '../selectors'

const { playerTurnSelector } = selectors
const { tileContainersSelector } = tileModule.selectors

const mapStateToProps = (state, props) => {
	return createStructuredSelector({
		tiles: tileContainersSelector,
		playerTurn: playerTurnSelector
	})
}

export default connect(mapStateToProps)(Board)
