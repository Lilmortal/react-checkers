import React from 'react'
import { shallow } from 'enzyme'
import { Tile } from '../components/tile'
import draught from '../../draught'

const { Draught } = draught.components

describe('It should render a tile', () => {
  describe('class name', () => {
    it('should display that this tile is an enemy', () => {
      const wrapper = shallow(<Tile isEnemy={true} />)
      expect(wrapper.find('.tile').prop('className')).toContain('enemyTile')
    })

    it('should display that this tile is highlighted', () => {
      const wrapper = shallow(<Tile isHighlighted={true} />)
      expect(wrapper.find('.tile').prop('className')).toContain('highlightedTile')
    })

    it('should display that this tile is able to eat an opponent', () => {
      const wrapper = shallow(<Tile isAbleToEat={true} />)
      expect(wrapper.find('.tile').prop('className')).toContain('ableToEatTile')
    })

    it('should display that this tile is allowed to have a draught', () => {
      const wrapper = shallow(<Tile allowDraught={true} />)
      expect(wrapper.find('.tile').prop('className')).toContain('allowDraughtTile')
    })

    it('should display that this tile is not allowed to have a draught', () => {
      const wrapper = shallow(<Tile allowDraught={false} />)
      expect(wrapper.find('.tile').prop('className')).toContain('notAllowDraughtTile')
    })
  })

  describe('selection', () => {
    let moveDraughtClickSpy

    beforeEach(() => {
      moveDraughtClickSpy = jest.fn()
    })

    it('should simulate a click if it can be moved', () => {
      const wrapper = shallow(<Tile canMoveDraught={true} moveDraughtClick={moveDraughtClickSpy} />)
      wrapper.find('.tile').simulate('click')
      expect(moveDraughtClickSpy).toBeCalled()
    })

    it('should not simulate a click if it cannot be moved', () => {
      const wrapper = shallow(<Tile canMoveDraught={false} moveDraughtClick={moveDraughtClickSpy} />)
      wrapper.find('.tile').simulate('click')
      expect(moveDraughtClickSpy).not.toBeCalled()
    })
  })
})
