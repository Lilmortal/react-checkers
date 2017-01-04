import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import { fromJS, OrderedMap } from 'immutable'
import { Board } from '../board'

describe('<Board /> ', () => {
  it('should display the player turn', sinon.test(function() {
    const startSelectDraughtSpy = this.stub()
    const startMoveDraughtSpy = this.stub()
    const wrapper = shallow(<Board playerTurn={2} tiles={OrderedMap()} isAbleToEatAvailable={false} startSelectDraught={startSelectDraughtSpy} startMoveDraught={startMoveDraughtSpy} />)
    expect(wrapper.find('.board').text()).to.equal('Player 2 turn')
  }))
})
