import * as actionTypes from './actionTypes'

const initialState = {
  selectedDraughtId: undefined,
  playerTurn: 2,
  isAbleToEatAvailable: false,
  previousMoveId: undefined
}

const reducer = (state=initialState, payLoad) => {
  switch (payLoad.type) {
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
