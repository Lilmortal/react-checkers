import * as selectors from '../selectors'
import { fromJS } from 'immutable'

describe('Board selectors', () => {
  it('return isAbleToEatAvailable', () => {
    expect(selectors.isAbleToEatAvailableSelector({board: {isAbleToEatAvailable: true}})).toEqual(true)
  })

  it('return playerTurn', () => {
    expect(selectors.playerTurnSelector({board: {playerTurn: true}})).toEqual(true)
  })

  it('return selectedDraughtId', () => {
    expect(selectors.selectedDraughtIdSelector({board: {selectedDraughtId: 123}})).toEqual(123)
  })

  it('return previousMoveId', () => {
    expect(selectors.previousMoveIdSelector({board: {previousMoveId: 456}})).toEqual(456)
  })
})
