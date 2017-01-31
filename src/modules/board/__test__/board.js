import board from '../board'
import { shallow } from 'enzyme'
import { OrderedMap } from 'immutable'

const { Board } = board.components

describe('It should render the board', () => {
  it('should display the player turn', () => {
    const board = shallow(<Board playerTurn={1} tiles={OrderedMap()})
    expect(board.find('.board h1').text()).toEqual('Player 1 turn')
  })
  it('should fail on purpose to generate some kind of error report', () => {
    expect(1 + 1).toEqual(3)
  })
})
