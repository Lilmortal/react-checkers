import { NAME } from './constants'

export const getIsAbleToEatAvailableSelector = state => state[NAME].isAbleToEatAvailable

export const getPlayerTurnSelector = state => state[NAME].playerTurn

export const getSelectedDraughtSelector = state => state[NAME].selectedDraught

export const getPreviousMoveSelector = state => state[NAME].previousMove
