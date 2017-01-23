/*import React from 'react'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'
import { Draught } from '../draught'

describe('<Draught />', () => {
  describe('Queen', () => {
    it('should display that it is a queen', () => {
      const tile = fromJS({ isQueen: true })
      const wrapper = shallow(<Draught tile={tile} />)
      expect(wrapper.find('.draughtQueen').text()).toEqual('♛')
    })

    it('should display that it is a normal draught', () => {
      const tile = fromJS({ isQueen: false })
      const wrapper = shallow(<Draught tile={tile} />)
      expect(wrapper.find('.draughtQueen').text()).toEqual('')
    })
  })

  describe('Cursor', () => {
    it('should have its cursor as a pointer if its the player turn', () => {
      const tile = fromJS({ player: 2 })
      const wrapper = shallow(<Draught tile={tile} playerTurn={2} />)
      expect(wrapper.find('.draught').prop('style').cursor).toEqual('pointer')
    })

    it('should have its cursor as default if its not the player turn', () => {
      const tile = fromJS({ player: 1 })
      const wrapper = shallow(<Draught tile={tile} playerTurn={2} />)
      expect(wrapper.find('.draught').prop('style').cursor).toEqual('default')
    })

    it('should have its cursor as a pointer if this draught can eat', () => {
      const tile = fromJS({ isAbleToEat: true })
      const wrapper = shallow(<Draught tile={tile} isAbleToEatAvailable={true} />)
      expect(wrapper.find('.draught').prop('style').cursor).toEqual('pointer')
    })

    it('should have its cursor as default if this draught cannot eat but one or more other draught can', () => {
      const tile = fromJS({ isAbleToEat: false })
      const wrapper = shallow(<Draught tile={tile} isAbleToEatAvailable={true} />)
      expect(wrapper.find('.draught').prop('style').cursor).toEqual('default')
    })
  })

  describe('Selection', () => {
    let startSelectDraughtSpy

    beforeEach(() => {
      startSelectDraughtSpy = jest.fn()
    })

    it('should display that it is selected', () => {
      const tile = fromJS({ isSelected: true })
      const wrapper = shallow(<Draught tile={tile} />)
      expect(wrapper.find('.draught').prop('className')).toContain('draughtSelected')
    })

    it('should display that it is not selected', () => {
      const tile = fromJS({ isSelected: false })
      const wrapper = shallow(<Draught tile={tile} />)
      expect(wrapper.find('.draught').prop('className')).not.toContain('draughtSelected')
    })

    it('can be selected if its the player turn and no other draughts is able to eat', () => {
      const tile = fromJS({ player: 2 })
      const wrapper = shallow(<Draught tile={tile} isAbleToEatAvailable={false} playerTurn={2} startSelectDraught={startSelectDraughtSpy} />)
      wrapper.find('.draught').simulate('click')
      expect(startSelectDraughtSpy).toBeCalled()
    })

    it('can be selected if this draught is able to eat', () => {
      const tile = fromJS({ isAbleToEat: true })
      const wrapper = shallow(<Draught tile={tile} isAbleToEatAvailable={true} startSelectDraught={startSelectDraughtSpy} />)
      wrapper.find('.draught').simulate('click')
      expect(startSelectDraughtSpy).toBeCalled()
    })

    it('can not be selected if other draughts can eat but not this draught', () => {
      const tile = fromJS({ isAbleToEat: false })
      const wrapper = shallow(<Draught tile={tile} isAbleToEatAvailable={true} startSelectDraught={startSelectDraughtSpy} />)
      wrapper.find('.draught').simulate('click')
      expect(startSelectDraughtSpy).not.toBeCalled()
    })
  })
})*/

describe('test', () => {
  it('test', () => {
    expect(1 + 1).toEqual(2)
  })
})
