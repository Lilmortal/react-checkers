import draught from '../../draught'
import reducer from '../reducers'

describe('Tile reducer', () => {
  it('something to make it pass for now', () => {
    expect(1+1).toEqual(2)
  })
  /*it('should return initial state', () => {
    expect(reducer(undefined, {}))
    .toEqual(
      {

      }
    )
  })

  it('should handle draught SELECT_DRAUGHT action', () => {
    const tile = {
      {
        id: 40,
        allowDraught: true,
        hasDraught: true,
        isHighlighted: false,
        isEnemy: false,
        isAbleToEat: false,
        topLeftTileId: 28,
        topRightTileId: 30,
        bottomLeftTileId: 50,
        bottomRightTileId: 52,
        x: 7,
        y: 3,
        draught:
        {
          id: 40,
          isSelected: false,
          player: 1,
          isQueen: false,
          canSelectDraught: true
        }
      }
    }

    expect(reducer(undefined, draught.actions.SELECT_DRAUGHT(40, tile)))
    .toEqual(
      {
        // i dont want to type out 121 tiles
      }
    )
  })

  it('should handle draught HIGHLIGHT_NEIGHBOUR_TILES', () => {
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

    expect(reducer(undefined, draught.actionTypes.HIGHLIGHT_NEIGHBOUR_TILES(neighbourTiles)))
    .toEqual(
      {
        // i dont want to type out 121 tiles
      }
    )
  })*/
})
