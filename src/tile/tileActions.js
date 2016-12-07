import * as actionTypes from './tileActionTypes'

export const moveCheckerPiece = (lift, allowCheckers, hasChecker, id) => {
	return {
		type: actionTypes.MOVE_CHECKER_PIECE,
		lift: lift,
		allowCheckers: allowCheckers,
		hasChecker: hasChecker,
		id: id
	}
}