import React from 'react'
import { shallow } from 'enzyme'

import Board from '../components/board'

// There are people saying dont test the implementation for components as they changed very quickly; instead rely on jest snapshot feature
describe('Board', () => {
  it('displays the players turn', () => {
    const board = shallow(<Board playerTurn={1} />)
    expect(board.find('.board h1').text()).toEqual('Player 1 turn')
  })
})
