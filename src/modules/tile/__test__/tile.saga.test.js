import { fromJS } from 'immutable'
import { put, select } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'

import { populateTiles } from '../../../shared/tileUtils'
import { watchTileUpdates } from '../rootSaga'
import * as selectors from '../selectors'
import * as actions from '../actions'

const { selectedDraughtIdSelector, tilesSelector, playerTurnSelector, previousMoveIdSelector } = selectors

describe('Tile saga', () => {
  let initialState
  beforeEach(() => {
    initialState = {
      board: {
        selectedDraughtId: 92,
        previousMoveId: undefined,
        playerTurn: 2,
        isAbleToEatAvailable: false
      },
      tiles: populateTiles()
    }
  })

  it('should move the selected draught to the tile that was clicked, as well as highlighting the selected tile and the tile that was selected neighbours' +
  'that it can eat.', () => {
    const dispatch = {
      id: 62
    }

    let highlightedLeftTile = initialState.tiles.get(48)
    let highlightedRightTile = initialState.tiles.get(62)
    highlightedLeftTile = highlightedLeftTile.set('isHighlighted', true)
    highlightedRightTile = highlightedRightTile.set('isHighlighted', true)

    expectSaga(watchTileUpdates, dispatch)
    .withState(initialState)
    .select(playerTurnSelector)
    .select(selectedDraughtIdSelector)
    .select(previousMoveIdSelector)
    .select(tilesSelector)
    .put(actions.HIGHLIGHT_NEIGHBOUR_TILES(
      [{
        id: 62,
        tile:
        fromJS({
          id: 62,
          allowDraught: true,
          hasDraught: false,
          isHighlighted: false,
          isEnemy: false,
          isAbleToEat: false,
          topLeftTileId: 50,
          topRightTileId: 52,
          bottomLeftTileId: 72,
          bottomRightTileId: 74,
          x: 7,
          y: 5,
          draught: undefined
        })
      }]
    ))
    .put(actions.REMOVE_DRAUGHT(72,
    fromJS({
      id: 72,
      allowDraught: true,
      hasDraught: false,
      isHighlighted: false,
      isEnemy: false,
      isAbleToEat: false,
      topLeftTileId: 60,
      topRightTileId: 62,
      bottomLeftTileId: 82,
      bottomRightTileId: 84,
      x: 6,
      y: 6,
      draught: undefined
    })))
    .put(actions.ADD_DRAUGHT(62,
    fromJS({
      id: 62,
      allowDraught: true,
      hasDraught: true,
      isHighlighted: false,
      isEnemy: false,
      isAbleToEat: false,
      topLeftTileId: 50,
      topRightTileId: 52,
      bottomLeftTileId: 72,
      bottomRightTileId: 74,
      x: 7,
      y: 5,
      draught:
      {
        id: 62,
        isSelected: false,
        player: 2,
        isQueen: false,
        canSelectDraught: false
      }
    })))
    .put(actions.HIGHLIGHT_NEIGHBOUR_TILES(
      [
        {
        id: 48,
        tile:
        fromJS({
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
          draught:
          {
            id: 48,
            isSelected: false,
            player: 1,
            isQueen: false,
            canSelectDraught: true
          }
        })
      },
      {
        id: 52,
        tile:
        fromJS({
          id: 52,
          allowDraught: true,
          hasDraught: true,
          isHighlighted: false,
          isEnemy: false,
          isAbleToEat: true,
          topLeftTileId: 40,
          topRightTileId: 42,
          bottomLeftTileId: 62,
          bottomRightTileId: 64,
          x: 8,
          y: 4,
          draught:
          {
            id: 52,
            isSelected: false,
            player: 1,
            isQueen: false,
            canSelectDraught: true
          }
          })
        }
      ]
    ))
    .put(actions.UPDATE_BOARD(undefined, 62, 1, true))
    .run()
  })

  it('should move the selected draught to the tile that was clicked, eating the enemy along the way as well as highlight that the previous tile can eat.', () => {

  })
})
