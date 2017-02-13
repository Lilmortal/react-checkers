import { fromJS } from 'immutable'
import { put, select } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'

import { populateTiles } from '../../../shared/tileUtils'
import { watchDraughtUpdates } from '../rootSaga'
import * as selectors from '../selectors'
import * as actions from '../actions'

const { selectedDraughtIdSelector, tilesSelector, playerTurnSelector, isAbleToEatAvailableSelector, previousMoveIdSelector } = selectors

describe('Draught saga', () => {
  let initialState
  beforeEach(() => {
    initialState = {
      board: {
        selectedDraughtId: undefined,
        previousMoveId: undefined,
        playerTurn: 2,
        isAbleToEatAvailable: false
      },
      tiles: populateTiles()
    }
  })

  it('should select a draught', () => {
    const dispatch = {
      id: 92
    }
    expectSaga(watchDraughtUpdates, dispatch)
    .withState(initialState)
    .select(playerTurnSelector)
    .select(selectedDraughtIdSelector)
    .select(isAbleToEatAvailableSelector)
    .select(previousMoveIdSelector)
    .select(tilesSelector)
    .put(actions.HIGHLIGHT_NEIGHBOUR_TILES(
      [{
        id: 80,
        tile:
        fromJS({
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
        tile:
        fromJS({
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
      }]
    ))
    .put(actions.SELECT_DRAUGHT(92,
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
      draught:
      {
        id: 92,
        isSelected: true,
        player: 2,
        isQueen: false,
        canSelectDraught: true
      }
    })))
    .put(actions.UPDATE_BOARD(92, undefined, 2, false))
    .run()
  })

  it('should unselect a draught', () => {
    const dispatch = {
      id: 92
    }

    initialState.board.selectedDraughtId = 90
    let highlightedLeftTile = initialState.tiles.get(80)
    let highlightedRightTile = initialState.tiles.get(82)
    highlightedLeftTile = highlightedLeftTile.set('isHighlighted', true)
    highlightedRightTile = highlightedRightTile.set('isHighlighted', true)

    expectSaga(watchDraughtUpdates, dispatch)
    .withState(initialState)
    .select(playerTurnSelector)
    .select(selectedDraughtIdSelector)
    .select(isAbleToEatAvailableSelector)
    .select(previousMoveIdSelector)
    .select(tilesSelector)
    .put(actions.HIGHLIGHT_NEIGHBOUR_TILES(
      [{
        id: 78,
        tile:
        fromJS({
          id: 78,
          allowDraught: true,
          hasDraught: false,
          isHighlighted: false,
          isEnemy: false,
          isAbleToEat: false,
          topLeftTileId: 66,
          topRightTileId: 68,
          bottomLeftTileId: 88,
          bottomRightTileId: 90,
          x: 1,
          y: 7,
          draught: undefined
        })
      },
      {
        id: 80,
        tile:
        fromJS({
          id: 80,
          allowDraught: true,
          hasDraught: false,
          isHighlighted: false,
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
      }]
    ))
    .put(actions.SELECT_DRAUGHT(90,
    fromJS({
      id: 90,
      allowDraught: true,
      hasDraught: true,
      isHighlighted: false,
      isEnemy: false,
      isAbleToEat: false,
      topLeftTileId: 78,
      topRightTileId: 80,
      bottomLeftTileId: 100,
      bottomRightTileId: 102,
      x: 2,
      y: 8,
      draught:
      {
        id: 90,
        isSelected: false,
        player: 2,
        isQueen: false,
        canSelectDraught: true
      }
    })))
    .put(actions.HIGHLIGHT_NEIGHBOUR_TILES(
      [{
        id: 80,
        tile:
        fromJS({
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
        tile:
        fromJS({
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
      }]
    ))
    .put(actions.SELECT_DRAUGHT(92,
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
      draught:
      {
        id: 92,
        isSelected: true,
        player: 2,
        isQueen: false,
        canSelectDraught: true
      }
    })))
    .put(actions.UPDATE_BOARD(92, undefined, 2, false))
    .run()
  })
})
