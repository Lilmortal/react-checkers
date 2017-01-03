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

  it('should display that it is selected', () => {

  })

  it('should display that it is allowed to have the users cursor as a pointer', () => {

  })
})
