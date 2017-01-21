//this is not working, ignore this file for now; will work on fixing it

import { createSelector } from 'reselect'

const isAbleToEatAvailableSelector = state => state.boardReducer.isAbleToEatAvailable
const playerTurnSelector = state => state.boardReducer.playerTurn
const selectedDraughtSelector = state => state.boardReducer.selectedDraught
const previousMoveSelector = state => state.boardReducer.previousMove
const tileSelector = (state, props) => props.tile
const startSelectDraughtPropsSelector = (state, props) => props.startSelectDraught
const startMoveDraughtPropsSelector = (state, props) => props.startMoveDraught

export const canSelectDraught = (isAbleToEatAvailable, playerTurn, tile) => {
	if ((!isAbleToEatAvailable && tile.get('player') === playerTurn) || (isAbleToEatAvailable && tile.get('isAbleToEat'))) {
		return true
	}
	return false
}

export const canMoveDraught = (tile) => {
	if (tile.get('isHighlighted')) {
		return true
	}
	return false
}

export const startSelectDraughtSelector = () => {
  return createSelector(
    tileSelector,
    selectedDraughtSelector,
    previousMoveSelector,
    playerTurnSelector,
    isAbleToEatAvailableSelector,
    startSelectDraughtPropsSelector,
    (tile, selectedDraught, previousMove, playerTurn, isAbleToEatAvailable, startSelectDraught) => {
      return canSelectDraught(isAbleToEatAvailable, playerTurn, tile) ?
      startSelectDraught.bind(this, tile, selectedDraught, previousMove, playerTurn, isAbleToEatAvailable) : undefined
    }
  )
}

export const startMoveDraughtSelector = () => {
  return createSelector(
    tileSelector,
    selectedDraughtSelector,
    previousMoveSelector,
    playerTurnSelector,
    isAbleToEatAvailableSelector,
    startMoveDraughtPropsSelector,
    (tile, selectedDraught, previousMove, playerTurn, isAbleToEatAvailable, startMoveDraught) => {
      return canMoveDraught(tile) ? startMoveDraught.bind(this, tile, selectedDraught, previousMove, playerTurn, isAbleToEatAvailable) : undefined
    }
  )
}
