import * as actionTypes from './tileActionTypes'

const initialState = {
	updatedTileId: 0
}

const move = (id) => {
	// remove previous component
	// add component
}

export default function moveCheckerPiece(state = initialState, payLoad) {
	switch (payLoad.type) {
		case actionTypes.MOVE_CHECKER_PIECE: {
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