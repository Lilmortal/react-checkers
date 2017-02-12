import { watchTileUpdates } from '../rootSaga'
import reducer from '../../../rootReducer'
import * as selectors from '../selectors'
import * as actions from '../actions'
import { fromJS } from 'immutable'
import { put, select } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'

const { selectedDraughtIdSelector, tilesSelector, playerTurnSelector, previousMoveIdSelector } = selectors

describe('Tile saga', () => {
  it('should select a draught', () => {
    const dispatch = {
      id: 82
    }
    expectSaga(watchTileUpdates, dispatch)
    .withReducer(reducer)
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
    /*.put(actions.REMOVE_DRAUGHT(92,

    ))*/
    .run()
  })

})
