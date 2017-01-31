/**
 * A list of neighbours that this tile have; it also includes what the opposite tile of this neighbour is and the player that is allowed to work with this neighbour
 * @type {Object}
 */
export const NEIGHBOUR_TILES = {
	topLeftTile: {
		oppositeTile: 'bottomRightTile',
		player: 2
	},
	topRightTile: {
		oppositeTile: 'bottomLeftTile',
		player: 2
	},
	bottomLeftTile: {
		oppositeTile: 'topRightTile',
		player: 1
	},
	bottomRightTile: {
		oppositeTile: 'topLeftTile',
		player: 1
	}
}
