import React from 'react'
import { fromJS, OrderedMap } from 'immutable'
import { mount } from 'enzyme'
import { Tile } from '../tile'
import { startSelectDraught } from '../../draught/draughtActions'
import { startMoveDraught } from '../tileActions'
import * as actionTypes from '../tileActionTypes'

describe('Tile integration test', () => {
  describe('Move a draught', () => {
    it('should move a draught to a tile', () => {
      const tile = fromJS({ id: 2, hasDraught: false, player: undefined, isSelected: false, isHighlighted: true, isQueen: false })
      const selectedDraught = fromJS({ id: 1, hasDraught: true, player: 1, isSelected: true, isQueen: false })
      const wrapper = mount(<Tile
      tile={tile}
      id={0}
      selectedDraught={selectedDraught}
      playerTurn={1}
      isAbleToEatAvailable={false}
      previousSelectedDraught={undefined}
      previousMove={undefined}
      startSelectDraught={startSelectDraught}
      startMoveDraught={startMoveDraught} />)

      wrapper.find('.tile').simulate('click')

      // how to wait until it finish
      setTimeout(() => {
        expect(wrapper.prop('tile').get('isSelected')).toEqual(true)
        expect(wrapper.prop('tile').get('isHighlighted')).toEqual(false)
        expect(wrapper.prop('tile').get('isQueen')).toEqual(false)
        expect(wrapper.prop('tile').get('player')).toEqual(1)
        expect(wrapper.prop('tile').get('hasDraught')).toEqual(true)

        expect(wrapper.prop('selectedDraught').get('isSelected')).toEqual(false)
        expect(wrapper.prop('selectedDraught').get('isHighlighted')).toEqual(false)
        expect(wrapper.prop('selectedDraught').get('isQueen')).toEqual(false)
        expect(wrapper.prop('selectedDraught').get('player')).toEqual(undefined)
        expect(wrapper.prop('selectedDraught').get('hasDraught')).toEqual(false)
      }, 10000)
    })

  it('should move a draught to a tile as a queen', () => {
    const tile = fromJS({ id: 2, hasDraught: false, player: undefined, isSelected: false, isHighlighted: true, isQueen: false })
    const selectedDraught = fromJS({ id: 1, hasDraught: true, player: 1, isSelected: true, isQueen: true })
    const wrapper = mount(<Tile
    tile={tile}
    id={0}
    selectedDraught={selectedDraught}
    playerTurn={1}
    isAbleToEatAvailable={false}
    previousSelectedDraught={undefined}
    previousMove={undefined}
    startSelectDraught={startSelectDraught}
    startMoveDraught={startMoveDraught} />)

    wrapper.find('.tile').simulate('click')

    // how to wait until it finish
    setTimeout(() => {
      expect(wrapper.prop('tile').get('isSelected')).toEqual(true)
      expect(wrapper.prop('tile').get('isHighlighted')).toEqual(false)
      expect(wrapper.prop('tile').get('isQueen')).toEqual(true)
      expect(wrapper.prop('tile').get('player')).toEqual(1)
      expect(wrapper.prop('tile').get('hasDraught')).toEqual(true)

      expect(wrapper.prop('selectedDraught').get('isSelected')).toEqual(false)
      expect(wrapper.prop('selectedDraught').get('isHighlighted')).toEqual(false)
      expect(wrapper.prop('selectedDraught').get('isQueen')).toEqual(false)
      expect(wrapper.prop('selectedDraught').get('player')).toEqual(undefined)
      expect(wrapper.prop('selectedDraught').get('hasDraught')).toEqual(false)
    }, 10000)
  })

    it('should move a draught to the end of the board as a player 1 making the draught a queen', () => {
      const tile = fromJS({ id: 2, hasDraught: false, player: undefined, isSelected: false, isHighlighted: true, isQueen: false, x: 10, y: 10 })
      const selectedDraught = fromJS({ id: 1, hasDraught: true, player: 1, isSelected: true, isQueen: false, x: 9, y: 9 })
      const wrapper = mount(<Tile
      tile={tile}
      id={0}
      selectedDraught={selectedDraught}
      playerTurn={1}
      isAbleToEatAvailable={false}
      previousSelectedDraught={undefined}
      previousMove={undefined}
      startSelectDraught={startSelectDraught}
      startMoveDraught={startMoveDraught} />)

      wrapper.find('.tile').simulate('click')

      // how to wait until it finish
      setTimeout(() => {
        expect(wrapper.prop('tile').get('isSelected')).toEqual(true)
        expect(wrapper.prop('tile').get('isHighlighted')).toEqual(false)
        expect(wrapper.prop('tile').get('isQueen')).toEqual(true)
        expect(wrapper.prop('tile').get('player')).toEqual(1)
        expect(wrapper.prop('tile').get('hasDraught')).toEqual(true)

        expect(wrapper.prop('selectedDraught').get('isSelected')).toEqual(false)
        expect(wrapper.prop('selectedDraught').get('isHighlighted')).toEqual(false)
        expect(wrapper.prop('selectedDraught').get('isQueen')).toEqual(false)
        expect(wrapper.prop('selectedDraught').get('player')).toEqual(undefined)
        expect(wrapper.prop('selectedDraught').get('hasDraught')).toEqual(false)
      }, 10000)
    })

    it('should move a draught to the end of the board as a player 2 making the draught a queen', () => {
      const tile = fromJS({ id: 2, hasDraught: false, player: undefined, isSelected: false, isHighlighted: true, isQueen: false, x: 0, y: 0 })
      const selectedDraught = fromJS({ id: 1, hasDraught: true, player: 2, isSelected: true, isQueen: false, x: 1, y: 1 })
      const wrapper = mount(<Tile
      tile={tile}
      id={0}
      selectedDraught={selectedDraught}
      playerTurn={2}
      isAbleToEatAvailable={false}
      previousSelectedDraught={undefined}
      previousMove={undefined}
      startSelectDraught={startSelectDraught}
      startMoveDraught={startMoveDraught} />)

      wrapper.find('.tile').simulate('click')

      // how to wait until it finish
      setTimeout(() => {
        expect(wrapper.prop('tile').get('isSelected')).toEqual(true)
        expect(wrapper.prop('tile').get('isHighlighted')).toEqual(false)
        expect(wrapper.prop('tile').get('isQueen')).toEqual(true)
        expect(wrapper.prop('tile').get('player')).toEqual(2)
        expect(wrapper.prop('tile').get('hasDraught')).toEqual(true)

        expect(wrapper.prop('selectedDraught').get('isSelected')).toEqual(false)
        expect(wrapper.prop('selectedDraught').get('isHighlighted')).toEqual(false)
        expect(wrapper.prop('selectedDraught').get('isQueen')).toEqual(false)
        expect(wrapper.prop('selectedDraught').get('player')).toEqual(undefined)
        expect(wrapper.prop('selectedDraught').get('hasDraught')).toEqual(false)
      }, 10000)
    })
  })

  describe('Eat a draught', () => {
    it('should eat an opponent draught', () => {
      const tile = fromJS({ id: 3, hasDraught: false, player: undefined, isSelected: false, isHighlighted: true, isQueen: false, x: 9, y: 9 })
      const bottomRightTile = fromJS({ id: 2, hasDraught: true, player: 2, isSelected: false, isHighlighted: false, isEnemy: true, isQueen: true, x: 8, y: 8, bottomRightTile: tile })
      const selectedDraught = fromJS({ id: 1, hasDraught: true, player: 1, isSelected: true, isQueen: false, x: 7, y: 7, bottomRightTile: bottomRightTile })
      const wrapper = mount(<Tile
      tile={tile}
      id={0}
      selectedDraught={selectedDraught}
      playerTurn={1}
      isAbleToEatAvailable={false}
      previousSelectedDraught={undefined}
      previousMove={undefined}
      startSelectDraught={startSelectDraught}
      startMoveDraught={startMoveDraught} />)

      wrapper.find('.tile').simulate('click')

      // how to wait until it finish
      setTimeout(() => {
        expect(wrapper.prop('tile').get('isSelected')).toEqual(true)
        expect(wrapper.prop('tile').get('isHighlighted')).toEqual(false)
        expect(wrapper.prop('tile').get('isQueen')).toEqual(false)
        expect(wrapper.prop('tile').get('player')).toEqual(1)
        expect(wrapper.prop('tile').get('hasDraught')).toEqual(true)

        expect(wrapper.prop('selectedDraught').getIn(['bottomRightTile', 'isSelected'])).toEqual(false)
        expect(wrapper.prop('selectedDraught').getIn(['bottomRightTile', 'isHighlighted'])).toEqual(false)
        expect(wrapper.prop('selectedDraught').getIn(['bottomRightTile', 'isQueen'])).toEqual(false)
        expect(wrapper.prop('selectedDraught').getIn(['bottomRightTile', 'player'])).toEqual(undefined)
        expect(wrapper.prop('selectedDraught').getIn(['bottomRightTile', 'hasDraught'])).toEqual(false)
        expect(wrapper.prop('selectedDraught').getIn(['bottomRightTile', 'isEnemy'])).toEqual(false)

        expect(wrapper.prop('selectedDraught').get('isSelected')).toEqual(false)
        expect(wrapper.prop('selectedDraught').get('isHighlighted')).toEqual(false)
        expect(wrapper.prop('selectedDraught').get('isQueen')).toEqual(false)
        expect(wrapper.prop('selectedDraught').get('player')).toEqual(undefined)
        expect(wrapper.prop('selectedDraught').get('hasDraught')).toEqual(false)
      }, 10000)
    })
  })
})
