import * as actions from '../actions'
import * as actionTypes from '../actionTypes'

describe('Draught actions', () => {
  it('should create a START_SELECT_DRAUGHT action', () => {
    const id = 40
    const expectedAction = {
      type: actionTypes.START_SELECT_DRAUGHT,
      id
    }

    expect(actions.START_SELECT_DRAUGHT(id)).toEqual(expectedAction)
  })

  it('should create a SELECT_DRAUGHT action', () => {
    const id = 40
    const tile = {
      id: 40,
      allowDraught: true,
      hasDraught: false,
      isHighlighted: false,
      isEnemy: false,
      isAbleToEat: false,
      topLeftTileId: 28,
      topRightTileId: 30,
      bottomLeftTileId: 50,
      bottomRightTileId: 52,
      x: 7,
      y: 3,
      draught: undefined
    }

    const expectedAction = {
      type: actionTypes.SELECT_DRAUGHT,
      id,
      tile
    }

    expect(actions.SELECT_DRAUGHT(id, tile)).toEqual(expectedAction)
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
})
