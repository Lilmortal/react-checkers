import { fromJS } from 'immutable'
import { put, select } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'

import reducer from '../../../rootReducer'
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

  it('should move the selected draught to the tile that was clicked.', () => {
    const dispatch = {
      id: 82
    }

    let highlightedLeftTile = initialState.tiles.get(80)
    let highlightedRightTile = initialState.tiles.get(82)
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
      },
      {
        id: 82,
        tile:
        fromJS({
          id: 82,
          allowDraught: true,
          hasDraught: false,
          isHighlighted: false,
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
    .put(actions.REMOVE_DRAUGHT(92,
    fromJS({
      id: 92,
      allowDraught: true,
      hasDraught: false,
      isHighlighted: false,
      isEnemy: false,
      isAbleToEat: false,
      topLeftTileId: 80,
      topRightTileId: 82,
      bottomLeftTileId: 102,
      bottomRightTileId: 104,
      x: 4,
      y: 8,
      draught: undefined
    })))
    .put(actions.ADD_DRAUGHT(82,
    fromJS({
      id: 82,
      allowDraught: true,
      hasDraught: true,
      isHighlighted: false,
      isEnemy: false,
      isAbleToEat: false,
      topLeftTileId: 70,
      topRightTileId: 72,
      bottomLeftTileId: 92,
      bottomRightTileId: 94,
      x: 5,
      y: 7,
      draught:
      {
        id: 82,
        isSelected: false,
        player: 2,
        isQueen: false,
        canSelectDraught: false
      }
    })))
    .put(actions.UPDATE_BOARD(undefined, 82, 1, false))
    .run()
  })
})
