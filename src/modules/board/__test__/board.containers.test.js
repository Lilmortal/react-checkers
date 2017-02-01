import React from 'react'
import BoardContainer from '../components/boardContainer'
import reducer from '../reducers'
import draught from '../../draught'
import { populateTiles } from '../../../shared/tileUtils'
import { mount } from 'enzyme'
import { createStore } from 'redux'
import { fromJS, OrderedMap } from 'immutable'

const wrapperInitialState = {
  selectedDraughtId: undefined,
  playerTurn: 2,
  isAbleToEatAvailable: false,
  previousMoveId: undefined
}

function getWrapperAndStore(initialState = {board: wrapperInitialState, tiles: populateTiles()}) {
  const store = createStore(reducer, initialState)
  return [mount(<BoardContainer />, { context: { store } }), store]
}

describe('Tile container', () => {
  it('updates the selected draught id', () => {
    const [wrapper, store] = getWrapperAndStore()

    const tile = {
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
      draught: {
        id: 40,
        isSelected: false,
        player: 2,
        isQueen: false,
        canSelectDraught: false
      }
    }

    store.dispatch(draught.actions.SELECT_DRAUGHT(40, tile, 40))

    const state = store.getState()
    console.log(state)
  })
})
