import * as actionTypes from './actionTypes'

const initialState = {
  selectedDraughtId: undefined,
  previousMoveId: undefined,
  playerTurn: 2,
  isAbleToEatAvailable: false
}

const reducer = (state=initialState, payLoad) => {
  switch (payLoad.type) {
    case actionTypes.UPDATE_BOARD: {
      return {
        ...state,
        selectedDraughtId: payLoad.selectedDraughtId,
        previousMoveId: payLoad.previousMoveId,
        playerTurn: payLoad.playerTurn,
        isAbleToEatAvailable: payLoad.isAbleToEatAvailable
      }
    }
    default:
      return state
  }
}

export default reducer
