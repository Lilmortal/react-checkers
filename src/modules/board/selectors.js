import { NAME } from './constants'

export const isAbleToEatAvailableSelector = state => state[NAME].isAbleToEatAvailable

export const playerTurnSelector = state => state[NAME].playerTurn

export const selectedDraughtIdSelector = state => state[NAME].selectedDraughtId

export const previousMoveIdSelector = state => state[NAME].previousMoveId
