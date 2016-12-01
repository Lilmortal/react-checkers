import * as actionTypes from './boardActions'

export function moveCheckerPiece(x, y) {
	return {
		type: actionTypes.MOVE_CHECKER_PIECE,
		payload: {
			x: x,
			y: y
		}
	}
}