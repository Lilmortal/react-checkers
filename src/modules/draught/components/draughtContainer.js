import { connect } from 'react-redux'
import { Draught } from './draught'
import { START_SELECT_DRAUGHT } from '../actions'
import * as selectors from '../selectors'
import { createStructuredSelector } from 'reselect'

const { getDraughtIsSelectedSelector, getDraughtPlayerSelector, getDraughtIsQueenSelector, getCanSelectDraughtSelector } = selectors

const mapStateToProps = (state, props) => {
  return createStructuredSelector({
    isSelected: getDraughtIsSelectedSelector,
    player: getDraughtPlayerSelector,
    isQueen: getDraughtIsQueenSelector,
    canSelectDraught: getCanSelectDraughtSelector(state, props)
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectDraughtClick: (id) => {
      dispatch(START_SELECT_DRAUGHT(id))
    }
  }
}

export const DraughtContainer = connect(mapStateToProps, mapDispatchToProps)(Draught)
