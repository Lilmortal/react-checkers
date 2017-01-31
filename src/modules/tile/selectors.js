import React from 'react'
import { TileContainer } from './components'
import { NAME } from './constants'
import { createSelector } from 'reselect'

const getTilesSelector = state => state[NAME]

const getTileSelector = (state, props) => props.tile

const getBoardSelector = (state, props) => props.board

export const getHasDraughtSelector = createSelector(
  getTileSelector,
  tile => {
    return tile.get('hasDraught')
  }
)

export const getIsEnemySelector = createSelector(
  getTileSelector,
  tile => {
    return tile.get('isEnemy')
  }
)

export const getIsHighlightedSelector = createSelector(
  getTileSelector,
  tile => {
    return tile.get('isHighlighted')
  }
)

export const getIsAbleToEatSelector = createSelector(
  getTileSelector,
  tile => {
    return tile.get('isAbleToEat')
  }
)

export const getAllowDraughtSelector = createSelector(
  getTileSelector,
  tile => {
    return tile.get('allowDraught')
  }
)

export const canMoveDraughtSelector = createSelector(
  getIsHighlightedSelector,
  isHighlighted => {
    return isHighlighted
  }
)

export const getTileContainersSelector = (state, props) => createSelector(
  getTilesSelector,
  getBoardSelector,
  (tiles, board) => {
    return tiles.valueSeq().map((tile, id) => {
      return (
        <TileContainer key={id}
        id={id}
        tile={tile}
        canMoveDraughtSelector={canMoveDraughtSelector}
        board={board} />
      )
    })
  }
)
