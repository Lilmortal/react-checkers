import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'
import { fromJS } from 'immutable'
import { Draught } from '../draught'

describe('Draught CSS Style', () => {
  it('should display that it is a queen', () => {
    let tileJS = fromJS({ isQueen: true })
    let draughtWrapper = mount(<Draught tile={tileJS} />)
    expect(draughtWrapper.prop('tile').get('isQueen')).is.equal(true)
    expect(draughtWrapper.find('.draughtQueen').text()).is.equal('♛')
  })

  it('should display that it is a normal draught', () => {
    let tileJS = fromJS({ isQueen: false })
    let draughtWrapper = mount(<Draught tile={tileJS} />)
    expect(draughtWrapper.prop('tile').get('isQueen')).is.equal(false)
    expect(draughtWrapper.find('.draughtQueen').text()).is.equal('')
  })

  it('should display that it is selected', () => {

  })

  it('should display that it is allowed to have the users cursor as a pointer', () => {

  })
})

describe('Draught functionality', () => {
  it('can be selected if its the player turn and no other draughts can eat', () => {

  })

  it('can be selected if the tile is highlighted as being allow to eat', () => {

  })

  it('can not be selected if other draughts can eat but not this draught', () => {

  })
})