import { fromJS } from 'immutable'

import utils from '../utils'

const { tileUtils } = utils
const { getTileNeighboursHighlightsToggled, populateTiles } = tileUtils

describe('Tile utils', () => {
  it('should return an array indicating the two neighbour tiles are highlighted.', () => {
    // hard coding 121 tiles makes test slower and less readable, we are going to assume populateTiles() work (if it does not work, the other test will fail and we need to fix that anyway).
    const tiles = populateTiles()
    const tile = fromJS({
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
        isSelected: true,
        player: 2,
        isQueen: false,
        canSelectDraught: true
      })
    })

    const expectedTiles = [
      {
        id: 80,
        tile: fromJS({
          id: 80,
          allowDraught: true,
          hasDraught: false,
          isHighlighted: true,
          isEnemy: false,
          isAbleToEat: false,
          topLeftTileId: 68,
          topRightTileId: 70,
          bottomLeftTileId: 90,
          bottomRightTileId: 92,
          x: 3,
          y: 7,
          draught: undefined
        })
      },
      {
        id: 82,
        tile: fromJS({
          id: 82,
          allowDraught: true,
          hasDraught: false,
          isHighlighted: true,
          isEnemy: false,
          isAbleToEat: false,
          topLeftTileId: 70,
          topRightTileId: 72,
          bottomLeftTileId: 92,
          bottomRightTileId: 94,
          x: 5,
          y: 7,
          draught: undefined
        })
      }
    ]
    const playerTurn = 2

    expect(getTileNeighboursHighlightsToggled(tiles, tile, playerTurn)).toEqual(expectedTiles)
  })

  it('should return an array indicating that one tile is an enemy and another tile is highlighted.', () => {
    // hard coding 121 tiles makes test slower and less readable, we are going to assume populateTiles() work (if it does not work, the other test will fail and we need to fix that anyway).
    let tiles = populateTiles()
    const tile = fromJS({
      id: 48,
      allowDraught: true,
      hasDraught: true,
      isHighlighted: false,
      isEnemy: false,
      isAbleToEat: true,
      topLeftTileId: 36,
      topRightTileId: 38,
      bottomLeftTileId: 58,
      bottomRightTileId: 60,
      x: 4,
      y: 4,
      draught: fromJS({
        id: 48,
        isSelected: true,
        player: 1,
        isQueen: false,
        canSelectDraught: true
      })
    })

    const enemy = fromJS({
      id: 60,
      allowDraught: true,
      hasDraught: true,
      isHighlighted: false,
      isEnemy: false,
      isAbleToEat: false,
      topLeftTileId: 48,
      topRightTileId: 50,
      bottomLeftTileId: 70,
      bottomRightTileId: 72,
      x: 5,
      y: 5,
      draught: fromJS({
        id: 60,
        isSelected: false,
        player: 2,
        isQueen: false,
        canSelectDraught: false
      })
    })

    tiles = tiles.set(48, tile)
    tiles = tiles.set(60, enemy)

    const expectedTiles = [
      {
        id: 60,
        tile: fromJS({
          id: 60,
          allowDraught: true,
          hasDraught: true,
          isHighlighted: false,
          isEnemy: true,
          isAbleToEat: false,
          topLeftTileId: 48,
          topRightTileId: 50,
          bottomLeftTileId: 70,
          bottomRightTileId: 72,
          x: 5,
          y: 5,
          draught: fromJS({
            id: 60,
            isSelected: false,
            player: 2,
            isQueen: false,
            canSelectDraught: false
          })
        })
      },
      {
        id: 72,
        tile: fromJS({
          id: 72,
          allowDraught: true,
          hasDraught: false,
          isHighlighted: true,
          isEnemy: false,
          isAbleToEat: false,
          topLeftTileId: 60,
          topRightTileId: 62,
          bottomLeftTileId: 82,
          bottomRightTileId: 84,
          x: 6,
          y: 6,
          draught: undefined
        })
      }
    ]
    const playerTurn = 1

    expect(getTileNeighboursHighlightsToggled(tiles, tile, playerTurn)).toEqual(expectedTiles)
  })

  it('should return the initial tiles state.', () => {
    const tiles = populateTiles()
    // It takes far too long to test all 121 tiles; so I will test two tiles and hope that this proves by induction that all other tiles work the same
    expect(tiles.get(0)).toEqual(
      fromJS({
        allowDraught: true,
        bottomLeftTileId: undefined,
        bottomRightTileId: 12,
        draught: fromJS({
          id: 0,
          isSelected: false,
          player: 1,
          isQueen: false,
          canSelectDraught: false
        }),
        hasDraught: true,
        id: 0,
        isAbleToEat: false,
        isEnemy: false,
        isHighlighted: false,
        topLeftTileId: undefined,
        topRightTileId: undefined,
        x: 0,
        y: 0
      })
    )

    expect(tiles.get(110)).toEqual(
      fromJS({
        allowDraught: true,
        bottomLeftTileId: undefined,
        bottomRightTileId: undefined,
        draught: fromJS({
          id: 110,
          isSelected: false,
          player: 2,
          isQueen: false,
          canSelectDraught: true
        }),
        hasDraught: true,
        id: 110,
        isAbleToEat: false,
        isEnemy: false,
        isHighlighted: false,
        topLeftTileId: undefined,
        topRightTileId: 100,
        x: 0,
        y: 10
      })
    )
  })
})
