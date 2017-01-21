import React from 'react'
import { mount, shallow } from 'enzyme'
import { fromJS, OrderedMap } from 'immutable'
import { Board } from '../board'

describe('<Board /> ', () => {
  let startSelectDraughtSpy
  let startMoveDraughtSpy

  beforeEach(() => {
    startSelectDraughtSpy = jest.fn()
    startMoveDraughtSpy = jest.fn()
  })

  it('should display the player turn', () => {
    const wrapper = shallow(<Board playerTurn={2} tiles={OrderedMap()} isAbleToEatAvailable={false} startSelectDraught={startSelectDraughtSpy}
    startMoveDraught={startMoveDraughtSpy} />)
    expect(wrapper.find('.board').text()).toEqual('Player 2 turn')
  })
})

// write a test to test mapStateToProps which I need to use <Provider> and create my own store wtf? or just passing state itself and testing the non connected
// components is good enough
