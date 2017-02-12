import { watchDraughtUpdates } from '../rootSaga'
import reducer from '../../../rootReducer'
import * as selectors from '../selectors'
import * as actions from '../actions'
import { fromJS } from 'immutable'
import { put, select } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'

const { selectedDraughtIdSelector, tilesSelector, playerTurnSelector, isAbleToEatAvailableSelector, previousMoveIdSelector } = selectors

describe('Draught saga', () => {
  it('should select a draught', () => {
    const dispatch = {
      id: 92
    }
    expectSaga(watchDraughtUpdates, dispatch)
    .withReducer(reducer)
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

  // find out how to mutate the selectedDraughtId state in combinedReducers
})
