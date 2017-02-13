import { fromJS } from 'immutable'

import draughtModule from '../../draught'
import * as actions from '../actions'
import reducer from '../reducers'

// Writing 121 tiles slows down test heavily and makes it less readable, it is not worth it; here I am proving that if two randomly selected tiles are correct, then by induction all tiles are correct.
describe('Tile reducer', () => {
  it('should return initial state', () => {
    const tiles = reducer(undefined, {})
    expect(tiles.get(0))
    .toEqual(
      fromJS({
        id: 0,
        allowDraught: true,
        hasDraught: true,
        isHighlighted: false,
        isEnemy: false,
        isAbleToEat: false,
        topLeftTileId: undefined,
        topRightTileId: undefined,
        bottomLeftTileId: undefined,
        bottomRightTileId: 12,
        x: 0,
        y: 0,
        draught:
        {
          id: 0,
          isSelected: false,
          player: 1,
          isQueen: false,
          canSelectDraught: false
        }
      })
    )

    expect(tiles.get(92))
    .toEqual(
      fromJS({
        id: 92,
        allowDraught: true,
        hasDraught: true,
        isHighlighted: false,
        isEnemy: false,
        isAbleToEat: false,
        topLeftTileId: 80,
        topRightTileId: 82,
        bottomLeftTileId: 102,
        bottomRightTileId: 104,
        x: 4,
        y: 8,
        draught: fromJS({
          id: 92,
          isSelected: false,
          player: 2,
          isQueen: false,
          canSelectDraught: true
        })
      })
    )
  })

  it('should handle draught SELECT_DRAUGHT action', () => {
    const tile = fromJS({
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
      draught: fromJS({
        id: 40,
        isSelected: false,
        player: 1,
        isQueen: false,
        canSelectDraught: true
      })
    })
    const tiles = reducer(undefined, draughtModule.actions.SELECT_DRAUGHT(40, tile))

    expect(tiles.get(40)).toEqual(tile)
  })

  it('should handle draught HIGHLIGHT_NEIGHBOUR_TILES', () => {
    const leftHighlightedTile = fromJS({
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
    })

    const rightHighlightedTile = fromJS({
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
    })
    const neighbourTiles =
    [
      {
        id: 28,
        tile: leftHighlightedTile
      },
      {
        id: 30,
        tile: rightHighlightedTile
      }
    ]
    const tiles = reducer(undefined, draughtModule.actions.HIGHLIGHT_NEIGHBOUR_TILES(neighbourTiles))
    expect(tiles.get(28)).toEqual(leftHighlightedTile)
    expect(tiles.get(30)).toEqual(rightHighlightedTile)
  })

  it('should handle HIGHLIGHT_NEIGHBOUR_TILES', () => {
    const leftHighlightedTile = fromJS({
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
    })

    const rightHighlightedTile = fromJS({
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
    })
    const neighbourTiles =
    [
      {
        id: 28,
        tile: leftHighlightedTile
      },
      {
        id: 30,
        tile: rightHighlightedTile
      }
    ]
    const tiles = reducer(undefined, actions.HIGHLIGHT_NEIGHBOUR_TILES(neighbourTiles))
    expect(tiles.get(28)).toEqual(leftHighlightedTile)
    expect(tiles.get(30)).toEqual(rightHighlightedTile)
  })

  it('should handle REMOVE_DRAUGHT', () => {
    const tile = fromJS({
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
      draught: fromJS({
        id: 40,
        isSelected: false,
        player: 1,
        isQueen: false,
        canSelectDraught: true
      })
    })
    const tiles = reducer(undefined, actions.REMOVE_DRAUGHT(40, tile))

    expect(tiles.get(40)).toEqual(tile)
  })

  it('should handle ADD_DRAUGHT', () => {
    const tile = fromJS({
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
      draught: fromJS({
        id: 40,
        isSelected: false,
        player: 1,
        isQueen: false,
        canSelectDraught: true
      })
    })
    const tiles = reducer(undefined, actions.ADD_DRAUGHT(40, tile))

    expect(tiles.get(40)).toEqual(tile)
  })
})
