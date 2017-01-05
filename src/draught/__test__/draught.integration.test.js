import React from 'react'
import { fromJS, OrderedMap } from 'immutable'
import { mount } from 'enzyme'
import { Draught } from '../draught'
import { startSelectDraught, startMoveDraught } from '../../board/boardActions'
import * as actionTypes from '../../board/boardActionTypes'

describe('Select a draught', () => {
	it('should select a draught', () => {
		let tiles = OrderedMap()
		const tile = fromJS({ id: 1, hasDraught: true, allowDraught: true, player: 1, isSelected: false })
		tiles = tiles.set(0, tile)
		const selectedDraught = undefined
		const playerTurn = 1
		const wrapper = mount(<Draught
		tile={tile}
		isAbleToEatAvailable={false}
		selectedDraught={undefined}
		playerTurn={1}
		startSelectDraught={startSelectDraught} />)

		wrapper.find('.draught').simulate('click')
		expect(wrapper.prop('tile').get('isSelected')).toEqual(true)
	})
})
