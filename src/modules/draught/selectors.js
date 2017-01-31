import React from 'react'
import { DraughtContainer } from './components'
import { createSelector } from 'reselect'

export const getSelectedDraughtId = state => state.board.selectedDraughtId

export const getTiles = state => state.tiles

export const getIdSelector = (state, props) => props.id

export const getTileSelector = (state, props) => props.tile

export const getBoardSelector = (state, props) => props.board

const getBoardConstantsSelector = createSelector(
  getBoardSelector,
  board => {
    return board.constants.NAME
  }
)

const getIsAbleToEatAvailableSelector = (state, props) => createSelector(
  getBoardConstantsSelector,
  boardConstants => {
    return state[boardConstants].isAbleToEatAvailable
  }
)

const getPlayerTurnSelector = (state, props) => createSelector(
  getBoardConstantsSelector,
  boardConstants => {
    return state[boardConstants].playerTurn
  }
)

export const getDraughtSelector = createSelector(
  getTileSelector,
  tile => {
    return tile.get('draught')
  }
)

export const getHasDraughtSelector = createSelector(
  getTileSelector,
  tile => {
    return tile.get('hasDraught')
  }
)

export const getIsAbleToEatSelector = createSelector(
  getTileSelector,
  tile => {
    return tile.get('isAbleToEat')
  }
)

export const getDraughtIsSelectedSelector = createSelector(
  getDraughtSelector,
  draught => {
    return draught !== undefined ? draught.get('isSelected') : undefined
  }
)

export const getDraughtPlayerSelector = createSelector(
  getDraughtSelector,
  draught => {
    return draught !== undefined ? draught.get('player') : undefined
  }
)

export const getDraughtIsAbleToEatSelector = createSelector(
  getDraughtSelector,
  draught => {
    return draught !== undefined ? draught.get('isAbleToEat') : undefined
  }
)

export const getDraughtIsQueenSelector = createSelector(
  getDraughtSelector,
  draught => {
    return draught !== undefined ? draught.get('isQueen') : undefined
  }
)

export const getCanSelectDraughtSelector = (state, props) => createSelector(
  getIsAbleToEatAvailableSelector(state, props),
  getDraughtPlayerSelector,
  getPlayerTurnSelector(state, props),
  getIsAbleToEatSelector,
  (isAbleToEatAvailable, player, playerTurn, isAbleToEat) => {
    if ((!isAbleToEatAvailable && player === playerTurn) || (isAbleToEatAvailable && isAbleToEat)) {
      return true
    }
    return false
  }
)

export const getDraughtContainerSelector = (state, props) => createSelector(
  getIdSelector,
  getTileSelector,
  getBoardSelector,
  getHasDraughtSelector,
  getCanSelectDraughtSelector,
  (id, tile, board, hasDraught, canSelectDraught) => {
    return hasDraught ?
    <DraughtContainer
    id={id}
    tile={tile}
    board={board}
    canSelectDraught={canSelectDraught} /> : undefined
  }
)
