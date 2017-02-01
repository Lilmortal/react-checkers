import draught from '../../draught'
import reducer from '../reducers'

describe('Board reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {}))
    .toEqual(
      {
        selectedDraughtId: undefined,
        playerTurn: 2,
        isAbleToEatAvailable: false,
        previousMove: undefined
      }
    )
  })

  it('should handle draught SELECT_DRAUGHT', () => {
    expect(reducer(undefined, draught.actions.SELECT_DRAUGHT(10, undefined, 40)
    )).toEqual(
      {
        selectedDraughtId: 40,
        playerTurn: 2,
        isAbleToEatAvailable: false,
        previousMove: undefined
      }
    )
  })
})
