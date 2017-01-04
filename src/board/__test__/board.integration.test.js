import React from 'react'
import { expect } from 'chai'
import { fromJS, OrderedMap } from 'immutable'
import { mount } from 'enzyme'
import { Board } from '../board'
import { startSelectDraught, startMoveDraught } from '../boardActions'
import * as actionTypes from '../boardActionTypes'

describe('<Board /> integration test', () => {
	describe('Select a draught', () => {
		/*it('should select a draught', () => {
			let tiles = OrderedMap()
			const tile = fromJS({ id: 1, hasDraught: true, allowDraught: true, player: 1, isSelected: false })
			tiles = tiles.set(0, tile)
			const selectedDraught = undefined
			const playerTurn = 1
			const wrapper = mount(<Board tiles={tiles} selectedDraught={selectedDraught} playerTurn={playerTurn} isAbleToEatAvailable={false} 
			previousSelectedDraught={undefined} previousMove={undefined} startSelectDraught={startSelectDraught} startMoveDraught={startMoveDraught} />)

			expect(wrapper.prop('tiles').getIn([0, 'isSelected'])).to.equal(true)
		})*/

		it('should unselect a draught', () => {

		})
	})

	describe('Move a draught', () => {
		it('should move a draught to a tile', () => {

		})

		it('should move a draught to the end of the board making the draught a queen', () => {
			//test if y is 0 or 10
		})
	})

	describe('Eat a draught', () => {
		it('should eat an opponent draught', () => {

		})
	})

	describe('Highlight a draught neighbours', () => {
		it('should highlight the potential tiles that the draught can move to as a player 1', () => {

		})

		it('should highlight the potential tiles that the draught can move to as a player 2', () => {
			
		})

		it('should highlight the potential tiles that the draught can move to as a queen', () => {
			
		})

		it('should highlight that this tile is an enemy', () => {
			
		})

		it('should highlight that this draught can eat an enemy', () => {
			
		})
	})
})