import * as actions from '../actions'
import * as actionTypes from '../actionTypes'

describe('Tile actions', () => {
  it('should create a START_MOVE_DRAUGHT action', () => {
    const id = 40
    const expectedAction = {
      type: actionTypes.START_MOVE_DRAUGHT,
      id
    }

    expect(actions.START_MOVE_DRAUGHT(id)).toEqual(expectedAction)
  })

  it('should create a HIGHLIGHT_NEIGHBOUR_TILES action', () => {
    const neighbourTiles =
    [
      {
        id: 28,
        tile:
        {
          id: 28,
          allowDraught: true,
          hasDraught: false,
          isHighlighted: true,
          isEnemy: false,
          isAbleToEat: false,
          topLeftTileId: 16,
          topRightTileId: 18,
          bottomLeftTileId: 38,
          bottomRightTileId: 40,
          x: 6,
          y: 2,
          draught: undefined
        }
      },
      {
        id: 30,
        tile:
        {
          id: 30,
          allowDraught: true,
          hasDraught: false,
          isHighlighted: true,
          isEnemy: false,
          isAbleToEat: false,
          topLeftTileId: 18,
          topRightTileId: 20,
          bottomLeftTileId: 40,
          bottomRightTileId: 42,
          x: 8,
          y: 2,
          draught: undefined
        }
      }
    ]

    const expectedAction = {
      type: actionTypes.HIGHLIGHT_NEIGHBOUR_TILES,
      neighbourTiles
    }

    expect(actions.HIGHLIGHT_NEIGHBOUR_TILES(neighbourTiles)).toEqual(expectedAction)
  })

  it('should create a REMOVE_DRAUGHT action', () => {
    const id = 28
    const tile =
    {
      id: 28,
      allowDraught: true,
      hasDraught: false,
      isHighlighted: true,
      isEnemy: false,
      isAbleToEat: false,
      topLeftTileId: 16,
      topRightTileId: 18,
      bottomLeftTileId: 38,
      bottomRightTileId: 40,
      x: 6,
      y: 2,
      draught: undefined
    }

    const expectedAction = {
      type: actionTypes.REMOVE_DRAUGHT,
      id,
      tile
    }

    expect(actions.REMOVE_DRAUGHT(id, tile)).toEqual(expectedAction)
  })

  it('should create a ADD_DRAUGHT action', () => {
    const id = 28
    const tile =
    {
      id: 28,
      allowDraught: true,
      hasDraught: false,
      isHighlighted: true,
      isEnemy: false,
      isAbleToEat: false,
      topLeftTileId: 16,
      topRightTileId: 18,
      bottomLeftTileId: 38,
      bottomRightTileId: 40,
      x: 6,
      y: 2,
      draught: undefined
    }

    const expectedAction = {
      type: actionTypes.ADD_DRAUGHT,
      id,
      tile
    }

    expect(actions.ADD_DRAUGHT(id, tile)).toEqual(expectedAction)
  })

  it('should create an UPDATE_BOARD action', () => {
    const selectedDraughtId = 40
    const previousMoveId = 50
    const playerTurn = 2
    const isAbleToEatAvailable = true
    const expectedAction = {
      type: actionTypes.UPDATE_BOARD,
      selectedDraughtId,
      previousMoveId,
      playerTurn,
      isAbleToEatAvailable
    }

    expect(actions.UPDATE_BOARD(selectedDraughtId, previousMoveId, playerTurn, isAbleToEatAvailable)).toEqual(expectedAction)
  })
})
