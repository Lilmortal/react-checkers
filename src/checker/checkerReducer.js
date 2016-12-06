import * as actionTypes from './checkerActionTypes'

const initialState = {
	updatedId: 0,
	lift: false,
}

export default function checkerReducer(state = initialState, payLoad) {
	switch (payLoad.type) {
		case actionTypes.LIFT_CHECKER_PIECE: {
			return Object.assign({}, state, { lift: payLoad.lift, updatedId: payLoad.updatedId })
		}
		default:
			return state
	}
}