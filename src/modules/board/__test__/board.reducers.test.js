import draughtModule from '../../draught'
import tileModule from '../../tile'
import reducer from '../reducers'

describe('Board reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {}))
    .toEqual(
      {
        selectedDraughtId: undefined,
        previousMoveId: undefined,
        playerTurn: 2,
        isAbleToEatAvailable: false
      }
    )
  })

  // doesnt activate watchTileSaga and watchDraughtSaga
  /*it('should handle draught UPDATE_BOARD', () => {
    expect(reducer(undefined, draughtModule.actions.UPDATE_BOARD(10, 20, 1, true)
    )).toEqual(
      {
        selectedDraughtId: 10,
        previousMoveId: 20,
        playerTurn: 1,
        isAbleToEatAvailable: true
      }
    )
  })

  it('should handle tile UPDATE_BOARD', () => {
    expect(reducer(undefined, draughtModule.actions.UPDATE_BOARD(10, 20, 1, true)
    )).toEqual(
      {
        selectedDraughtId: 10,
        previousMoveId: 20,
        playerTurn: 1,
        isAbleToEatAvailable: true
      }
    )
  })*/
})
