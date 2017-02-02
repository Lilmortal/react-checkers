import React from 'react'
import reducer from '../../../rootReducer'
import draught from '../../draught'
import { populateTiles } from '../../../shared/tileUtils'
import { createStore } from 'redux'
import { fromJS, OrderedMap } from 'immutable'

const boardInitialState = {
  selectedDraughtId: undefined,
  playerTurn: 2,
  isAbleToEatAvailable: false,
  previousMoveId: undefined
}

function getWrapperAndStore(initialState = {board: boardInitialState, tiles: populateTiles()}) {
  const store = createStore(reducer, initialState)
  return store
}

describe('Board container', () => {
  it('updates the selected draught id', () => {
    const store = getWrapperAndStore()

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
        isSelected: true,
        player: 2,
        isQueen: false,
        canSelectDraught: false
      })
    })

    store.dispatch(draught.actions.SELECT_DRAUGHT(40, tile, 40))

    const state = store.getState()
    expect(state.board.selectedDraughtId).toEqual(40)
  })
})
