import Board from './board'
import tile from '../../tile'
import { createStructuredSelector } from 'reselect'
import * as selectors from '../selectors'
import { connect } from 'react-redux'

const { playerTurnSelector } = selectors
const { tileContainersSelector } = tile.selectors

const mapStateToProps = (state, props) => {
	return createStructuredSelector({
		tiles: tileContainersSelector,
		playerTurn: playerTurnSelector
	})
}

export { mapStateToProps } // export unconnected components for testing purposes
export default connect(mapStateToProps)(Board)
