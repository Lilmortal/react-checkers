import React from 'react'
import { fromJS, OrderedMap } from 'immutable'
import { mount } from 'enzyme'
import { Draught } from '../draught'
import { startSelectDraught } from '../draughtActions'
import * as actionTypes from '../draughtActionTypes'

describe('Draught integration test', () => {
	describe('Select a draught', () => {
		it('should select a draught', () => {
			const tile = fromJS({ id: 1, hasDraught: true, player: 1, isSelected: false })
			const wrapper = mount(<Draught
			tile={tile}
			isAbleToEatAvailable={false}
			selectedDraught={undefined}
			playerTurn={1}
			startSelectDraught={startSelectDraught} />)

			wrapper.find('.draught').simulate('click')
			//const generatedValue = watchUpdateTiles()
			//console.log(generatedValue)
			// how to wait until it finish
			expect(wrapper.prop('tile').get('isSelected')).toEqual(true)
		})

		it('should unselect a draught', () => {
			const tile = fromJS({ id: 1, hasDraught: true, player: 1, isSelected: true })
			const selectedDraught = fromJS({ id: 2, hasDraught: true, player: 1, isSelected: true })
			const wrapper = mount(<Draught
			tile={tile}
			isAbleToEatAvailable={false}
			selectedDraught={selectedDraught}
			playerTurn={1}
			startSelectDraught={startSelectDraught} />)

			wrapper.find('.draught').simulate('click')

			// how to wait until it finish
			setTimeout(() => {
				expect(wrapper.prop('selectedDraught').get('isSelected')).toEqual(false)
				expect(wrapper.prop('tile').get('isSelected')).toEqual(false)
			}, 10000)
		})

		it('should unselect the previous selected draught and select the current draught', () => {
			const tile = fromJS({ id: 1, hasDraught: true, player: 1, isSelected: false })
			const selectedDraught = fromJS({ id: 2, hasDraught: true, player: 1, isSelected: true })
			const wrapper = mount(<Draught
			tile={tile}
			isAbleToEatAvailable={false}
			selectedDraught={selectedDraught}
			playerTurn={1}
			startSelectDraught={startSelectDraught} />)

			wrapper.find('.draught').simulate('click')

			// how to wait until it finish
			setTimeout(() => {
				expect(wrapper.prop('selectedDraught').get('isSelected')).toEqual(false)
				expect(wrapper.prop('tile').get('isSelected')).toEqual(true)
			}, 10000)
		})
	})

	describe('Highlight a draught neighbours', () => {
		it('should highlight the potential tiles that the draught can move to as a player 1', () => {
			const bottomLeftTile = fromJS({ id: 2, hasDraught: false, isHighlighted: false })
			const bottomRightTile = fromJS({ id: 3, hasDraught: true, player: 1, isHighlighted: false })
			const tile = fromJS({ id: 1, hasDraught: true, player: 1, isSelected: false, bottomLeftTile: bottomLeftTile, bottomRightTile: bottomRightTile })
			const wrapper = mount(<Draught
			tile={tile}
			isAbleToEatAvailable={false}
			selectedDraught={undefined}
			playerTurn={1}
			startSelectDraught={startSelectDraught} />)

			wrapper.find('.draught').simulate('click')

			// how to wait until it finish
			setTimeout(() => {
				expect(wrapper.prop('tile').getIn(['bottomLeftTile', 'isHighlighted'])).toEqual(true)
				expect(wrapper.prop('tile').getIn(['bottomRightTile', 'isHighlighted'])).toEqual(false)
			}, 10000)
		})

		it('should highlight the potential tiles that the draught can move to as a player 2', () => {
			const topLeftTile = fromJS({ id: 2, hasDraught: false, isHighlighted: false })
			const topRightTile = fromJS({ id: 3, hasDraught: true, player: 2, isHighlighted: false })
			const tile = fromJS({ id: 1, hasDraught: true, player: 2, isSelected: false, topLeftTile: topLeftTile, topRightTile: topRightTile })
			const wrapper = mount(<Draught
			tile={tile}
			isAbleToEatAvailable={false}
			selectedDraught={undefined}
			playerTurn={2}
			startSelectDraught={startSelectDraught} />)

			wrapper.find('.draught').simulate('click')

			// how to wait until it finish
			setTimeout(() => {
				expect(wrapper.prop('tile').getIn(['topLeftTile', 'isHighlighted'])).toEqual(true)
				expect(wrapper.prop('tile').getIn(['topRightTile', 'isHighlighted'])).toEqual(false)
			}, 10000)
		})

		it('should highlight the potential tiles that the draught can move to as a queen', () => {
			const topLeftTile = fromJS({ id: 4, hasDraught: false, isHighlighted: false })
			const topRightTile = fromJS({ id: 5, hasDraught: true, player: 2, isHighlighted: false })
			const bottomLeftTile = fromJS({ id: 2, hasDraught: false, isHighlighted: false })
			const bottomRightTile = fromJS({ id: 3, hasDraught: true, player: 1, isHighlighted: false })
			const tile = fromJS({ id: 1, hasDraught: true, player: 2, isSelected: false, topLeftTile: topLeftTile, topRightTile: topRightTile,
			bottomLeftTile: bottomLeftTile, bottomRightTile: bottomRightTile, isQueen: true })
			const wrapper = mount(<Draught
			tile={tile}
			isAbleToEatAvailable={false}
			selectedDraught={undefined}
			playerTurn={2}
			startSelectDraught={startSelectDraught} />)

			wrapper.find('.draught').simulate('click')

			// how to wait until it finish
			setTimeout(() => {
				expect(wrapper.prop('tile').getIn(['topLeftTile', 'isHighlighted'])).toEqual(true)
				expect(wrapper.prop('tile').getIn(['topRightTile', 'isHighlighted'])).toEqual(false)
				expect(wrapper.prop('tile').getIn(['bottomLeftTile', 'isHighlighted'])).toEqual(true)
				expect(wrapper.prop('tile').getIn(['bottomRightTile', 'isHighlighted'])).toEqual(false)
			}, 10000)
		})

		it('should highlight that this tile is an enemy', () => {
			const bottomBottomRightTile = fromJS({ id: 3, hasDraught: false, player: undefined, x: 7, y: 7 })
			const bottomRightTile = fromJS({ id: 2, hasDraught: true, player: 2, x: 6, y: 6, bottomRightTile: bottomBottomRightTile })
			const tile = fromJS({ id: 1, hasDraught: true, player: 1, x: 5, y: 5, bottomRightTile: bottomRightTile })
			const wrapper = mount(<Draught
			tile={tile}
			isAbleToEatAvailable={false}
			selectedDraught={undefined}
			playerTurn={1}
			startSelectDraught={startSelectDraught} />)

			wrapper.find('.draught').simulate('click')

			// how to wait until it finish
			setTimeout(() => {
				expect(wrapper.prop('tile').getIn(['bottomRightTile', 'isEnemy'])).toEqual(true)
			}, 10000)
		})
	})
})
