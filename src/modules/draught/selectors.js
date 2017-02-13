import React from 'react'
import { createSelector } from 'reselect'

import DraughtContainer from './components/draughtContainer'

export const selectedDraughtIdSelector = state => state.board.selectedDraughtId

export const playerTurnSelector = state => state.board.playerTurn

export const isAbleToEatAvailableSelector = state => state.board.isAbleToEatAvailable

export const previousMoveIdSelector = state => state.board.previousMoveId

export const tilesSelector = state => state.tiles

export const idSelector = (state, props) => props.id

export const tileSelector = createSelector(
  tilesSelector,
  idSelector,
  (tiles, id) => {
    return tiles.get(id)
  }
)

export const draughtSelector = createSelector(
  tileSelector,
  tile => {
    return tile.get('draught')
  }
)

export const hasDraughtSelector = createSelector(
  tileSelector,
  tile => {
    return tile.get('hasDraught')
  }
)

export const isAbleToEatSelector = createSelector(
  tileSelector,
  tile => {
    return tile.get('isAbleToEat')
  }
)

export const playerSelector = createSelector(
  draughtSelector,
  draught => {
    return draught !== undefined ? draught.get('player') : undefined
  }
)

export const isSelectedSelector = createSelector(
  draughtSelector,
  draught => {
    return draught !== undefined ? draught.get('isSelected') : undefined
  }
)

export const isQueenSelector = createSelector(
  draughtSelector,
  draught => {
    return draught !== undefined ? draught.get('isQueen') : undefined
  }
)

export const canBeSelectedSelector = createSelector(
  isAbleToEatAvailableSelector,
  playerSelector,
  playerTurnSelector,
  isAbleToEatSelector,
  (isAbleToEatAvailable, player, playerTurn, isAbleToEat) => {
    if ((!isAbleToEatAvailable && player === playerTurn) || (isAbleToEatAvailable && isAbleToEat)) {
      return true
    }
    return false
  }
)

export const draughtContainerSelector = createSelector(
  idSelector,
  hasDraughtSelector,
  (id, hasDraught) => {
    return hasDraught ?
    <DraughtContainer
    id={id} /> : undefined
  }
)
