import * as actionTypes from './boardActionTypes'

export const selectDraught = (selected) => {
	return {
		type: actionTypes.SELECT_DRAUGHT,
		selected: !selected,
	}
}

export const moveDraught = (lift, allowCheckers, hasChecker, id) => {
	return {
		type: actionTypes.MOVE_DRAUGHT,
		lift: lift,
		allowCheckers: allowCheckers,
		hasChecker: hasChecker,
		id: id
	}
}