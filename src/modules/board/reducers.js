import * as actionTypes from './actionTypes'
import draught from '../draught'

const initialState = {
  selectedDraughtId: undefined,
  playerTurn: 2,
  isAbleToEatAvailable: false,
  previousMoveId: undefined
}

const reducer = (state=initialState, payLoad) => {
  switch (payLoad.type) {
    case draught.actionTypes.SELECT_DRAUGHT: {
      return {
        ...state,
        selectedDraughtId: payLoad.selectedDraughtId
      }
    }
    case actionTypes.UPDATE_BOARD: {
      return {
        ...state,
        selectedDraughtId: payLoad.selectedDraughtId,
        playerTurn: payLoad.playerTurn,
        isAbleToEatAvailable: payLoad.isAbleToEatAvailable,
        previousMoveId: payLoad.previousMoveId
      }
    }
    default:
      return state
  }
}

export default reducer
