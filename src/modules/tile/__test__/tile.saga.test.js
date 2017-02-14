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
        selectedDraughtId: undefined,
        previousMoveId: undefined,
        playerTurn: 2,
        isAbleToEatAvailable: false
      },
      tiles: populateTiles()
    }
  })

  it('should move the selected draught to the tile that was clicked, as well as highlighting the selected tile neighbours that it can eat.', () => {
    const dispatch = {
      id: 62
    }

    initialState.board.selectedDraughtId = 72
    initialState.tiles.get(48).set('hasDraught', true)
    initialState.tiles.get(48).set('draught', fromJS({
      id: 48,
      isSelected: false,
      player: 1,
      isQueen: false,
      canSelectDraught: false
    }))

    initialState.tiles.get(36).set('hasDraught', true)
    initialState.tiles.get(36).set('draught', fromJS({
      id: 36,
      isSelected: false,
      player: 1,
      isQueen: false,
      canSelectDraught: false
    }))

    initialState.tiles.get(72).set('hasDraught', true)
    initialState.tiles.get(72).set('draught', fromJS({
      id: 72,
      isSelected: true,
      player: 2,
      isQueen: false,
      canSelectDraught: false
    }))

    initialState.tiles.get(60).set('hasDraught', true)
    initialState.tiles.get(60).set('draught', fromJS({
      id: 60,
      isSelected: false,
      player: 2,
      isQueen: false,
      canSelectDraught: false
    }))

    initialState.tiles.get(62).set('isHighlighted', true)

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
      }]
    ))
    .put(actions.UPDATE_BOARD(undefined, 62, 1, true))
    .run()
  })
})
