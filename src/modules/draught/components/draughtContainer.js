import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import * as selectors from '../selectors'
import { START_SELECT_DRAUGHT } from '../actions'
import Draught from './draught'

const { isSelectedSelector, playerSelector, isQueenSelector, canBeSelectedSelector } = selectors

const mapStateToProps = (state, props) => {
  return createStructuredSelector({
    isSelected: isSelectedSelector,
    player: playerSelector,
    isQueen: isQueenSelector,
    canBeSelected: canBeSelectedSelector
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectDraughtClick: (id) => {
      dispatch(START_SELECT_DRAUGHT(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Draught)
