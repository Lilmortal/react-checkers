import React from 'react'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'
import { Tile } from '../tile'
import { Draught } from '../../draught/draught'

describe('<Tile />', () => {
  describe('background color CSS Styles', () => {
    it('should display that this tile is an enemy', () => {
      const tile = fromJS({ isEnemy: true })
      const wrapper = shallow(<Tile tile={tile} />)
      expect(wrapper.find('.tile').prop('style').backgroundColor).toEqual('brown')
    })

    it('should display that this tile is highlighted', () => {
      const tile = fromJS({ isHighlighted: true })
      const wrapper = shallow(<Tile tile={tile} />)
      expect(wrapper.find('.tile').prop('style').backgroundColor).toEqual('orange')
    })

    it('should display that this tile is able to eat an opponent', () => {
      const tile = fromJS({ isAbleToEat: true })
      const wrapper = shallow(<Tile tile={tile} />)
      expect(wrapper.find('.tile').prop('style').backgroundColor).toEqual('blue')
    })

    it('should display that this tile is allowed to have a draught', () => {
      const tile = fromJS({ allowDraught: true })
      const wrapper = shallow(<Tile tile={tile} />)
      expect(wrapper.find('.tile').prop('style').backgroundColor).toEqual('black')
    })

    it('should display that this tile is not allowed to have a draught', () => {
      const tile = fromJS({ allowDraught: false })
      const wrapper = shallow(<Tile tile={tile} />)
      expect(wrapper.find('.tile').prop('style').backgroundColor).toEqual('red')
    })
  })

  describe('cursor', () => {
    it('should have its cursor as a pointer if it is highlighted', () => {
      const tile = fromJS({ isHighlighted: true })
      const wrapper = shallow(<Tile tile={tile} />)
      expect(wrapper.find('.tile').prop('style').cursor).toEqual('pointer')
    })

    it('should have its cursor as a pointer if it is highlighted as being able to eat other draughts', () => {
      const tile = fromJS({ isAbleToEat: true })
      const wrapper = shallow(<Tile tile={tile} />)
      expect(wrapper.find('.tile').prop('style').cursor).toEqual('pointer')
    })
  })

  describe('draught', () => {
    it('should display draught if it has one', () => {
      const tile = fromJS({ hasDraught: true })
      const wrapper = shallow(<Tile tile={tile} />)
      expect(wrapper.find('.tile').contains(
        <Draught tile={tile}
        isAbleToEatAvailable={undefined}
        selectedDraught={undefined}
        playerTurn={undefined}
        startSelectDraught={undefined} />)).toEqual(true)
    })

    it('should not display draught if it does not have one', () => {
      const tile = fromJS({ hasDraught: false })
      const wrapper = shallow(<Tile tile={tile} />)
      //toHaveLength is not a function, what?
      expect(wrapper.find('.tile').text()).toEqual('')
    })

    it('should display draught if it has one', () => {
      const tile = fromJS({ hasDraught: true })
      const wrapper = shallow(<Tile tile={tile} />)
      expect(wrapper.find('.tile').contains(
        <Draught tile={tile}
        isAbleToEatAvailable={undefined}
        selectedDraught={undefined}
        playerTurn={undefined}
        startSelectDraught={undefined} />)).toEqual(true)
    })

    describe('Selection', () => {
      let startSelectDraughtSpy
      let startMoveDraughtSpy

      beforeEach(() => {
        startSelectDraughtSpy = jest.fn()
        startMoveDraughtSpy = jest.fn()
      })

      it('should move the draught if the tile is clicked and is highlighted', () => {
        const tile = fromJS({ isHighlighted: true })
        const wrapper = shallow(<Tile tile={tile} startMoveDraught={startMoveDraughtSpy} />)
        wrapper.find('.tile').simulate('click')
        expect(startMoveDraughtSpy).toBeCalled()
      })

      it('should not be able to move the draught if the tile is clicked but is not highlighted', () => {
        const tile = fromJS({ isHighlighted: false })
        const wrapper = shallow(<Tile tile={tile} startMoveDraught={startMoveDraughtSpy} />)
        wrapper.find('.tile').simulate('click')
        expect(startMoveDraughtSpy).not.toBeCalled()
      })
    })
  })
})
