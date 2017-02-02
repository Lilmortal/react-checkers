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

describe('Tiles container', () => {
  it('updates the tiles', () => {
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
    const updatedTile = state.tiles.get(40)
    expect(updatedTile.get('hasDraught')).toEqual(true)
    expect(updatedTile.getIn(['draught', 'isSelected'])).toEqual(true)
  })

  it('updates the neighbour tiles to be highlighted', () => {
    const store = getWrapperAndStore()

    const tiles = [
    {
      id: 28,
      tile: fromJS({
        id: 40,
        allowDraught: true,
        hasDraught: true,
        isHighlighted: true,
        isEnemy: false,
        isAbleToEat: false,
        topLeftTileId: 16,
        topRightTileId: 18,
        bottomLeftTileId: 38,
        bottomRightTileId: 40,
        x: 7,
        y: 3,
        draught: undefined
      })
    },
    {
      id: 30,
      tile: fromJS({
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
        x: 9,
        y: 3,
        draught: undefined
      })
    }]

    store.dispatch(draught.actions.HIGHLIGHT_NEIGHBOUR_TILES(tiles))

    const state = store.getState()
    const updatedLeftTile = state.tiles.get(28)
    expect(updatedLeftTile.get('isHighlighted')).toEqual(true)
    const updatedRightTile = state.tiles.get(30)
    expect(updatedRightTile.get('isHighlighted')).toEqual(true)
  })
})
