import React from 'react'
import TileContainer from './components/tileContainer'
import { NAME } from './constants'
import { createSelector } from 'reselect'

export const tilesSelector = state => state[NAME]

export const selectedDraughtIdSelector = state => state.board.selectedDraughtId

// figure out how to get board constant name
export const playerTurnSelector = state => state.board.playerTurn

export const isAbleToEatAvailableSelector = state => state.board.isAbleToEatAvailable

export const previousMoveIdSelector = state => state.board.previousMoveId

export const idSelector = (state, props) => props.id

export const tileSelector = createSelector(
  tilesSelector,
  idSelector,
  (tiles, id) => {
    return tiles.get(id)
  }
)

export const hasDraughtSelector = createSelector(
  tileSelector,
  tile => {
    return tile.get('hasDraught')
  }
)

export const isEnemySelector = createSelector(
  tileSelector,
  tile => {
    return tile.get('isEnemy')
  }
)

export const isHighlightedSelector = createSelector(
  tileSelector,
  tile => {
    return tile.get('isHighlighted')
  }
)

export const isAbleToEatSelector = createSelector(
  tileSelector,
  tile => {
    return tile.get('isAbleToEat')
  }
)

export const allowDraughtSelector = createSelector(
  tileSelector,
  tile => {
    return tile.get('allowDraught')
  }
)

export const canBeMovedSelector = createSelector(
  isHighlightedSelector,
  isHighlighted => {
    return isHighlighted
  }
)

export const tileContainersSelector = createSelector(
  tilesSelector,
  tiles => {
    return tiles.valueSeq().map((tile, id) => {
      return (
        <TileContainer key={id}
        id={id} />
      )
    })
  }
)
