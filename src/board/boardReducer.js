export function boardReducer(state = [], payload) {
	switch (payload.type) {
		case 'MOVE_CHECKER_PIECE': {
			return Object.assign({}, state, payload.x)
		}
		default:
			return state
	}
}