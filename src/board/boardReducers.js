import * as actionTypes from './boardActionTypes'

const initialState = {
	selected: false,
}

export const selectDraughtReducer = (state = initialState, payLoad) => {
	switch (payLoad.type) {
		case actionTypes.SELECT_DRAUGHT: {
			return Object.assign({}, state, { selected: payLoad.selected })
		}
		default:
			return state
	}
}

export const moveDraughtReducer = (state = initialState, payLoad) => {
	switch (payLoad.type) {
		case actionTypes.MOVE_DRAUGHT: {
			if (payLoad.allowCheckers && !payLoad.hasChecker && payLoad.lift) {
				return Object.assign({}, state, { hasChecker: false, lift: false, updatedTileId: payLoad.id })
			}
			return state
		}
		default: {
			return state
		}
	}
}