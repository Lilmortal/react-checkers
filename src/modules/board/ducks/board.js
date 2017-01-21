import { SELECT_DRAUGHT, MOVE_DRAUGHT } from '../../tile/ducks/tile'

export const UPDATE_SELECTED_DRAUGHT = 'board/UPDATE_SELECTED_DRAUGHT'
export const UPDATE_BOARD = 'board/UPDATE_BOARD'

export const updateSelectedDraught = (selectedDraught) => {
	return {
		type: UPDATE_SELECTED_DRAUGHT,
    selectedDraught
	}
}

export const updateBoard = (playerTurn, previousMove, isAbleToEatAvailable) => {
	return {
		type: UPDATE_BOARD,
    playerTurn,
    previousMove,
    isAbleToEatAvailable
	}
}

const initialState = {
  selectedDraught: undefined,
  playerTurn: 2,
  isAbleToEatAvailable: false,
  previousMove: undefined
}

const boardReducer = (state=initialState, payLoad) => {
  switch (payLoad.type) {
		case SELECT_DRAUGHT: {
			return {
				...state,
				selectedDraught: payLoad.selectedDraught
			}
		}
		case MOVE_DRAUGHT: {
			return {
				...state,
				selectedDraught: undefined
			}
		}
		case UPDATE_SELECTED_DRAUGHT: {
			return {
				...state,
				selectedDraught: payLoad.selectedDraught
			}
		}
    case UPDATE_BOARD: {
      return {
        ...state,
        selectedDraught: payLoad.selectedDraught,
        playerTurn: payLoad.playerTurn,
        isAbleToEatAvailable: payLoad.isAbleToEatAvailable,
        previousMove: payLoad.previousMove
      }
    }
    default:
      return state
  }
}

export default boardReducer
