import * as actionTypes from './checkerActionTypes'

export const liftCheckerPiece = (lift, updatedId) => {
	return {
		type: actionTypes.LIFT_CHECKER_PIECE,
		lift: !lift,
		updatedId: updatedId
	}
}