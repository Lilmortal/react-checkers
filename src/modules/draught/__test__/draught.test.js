import React from 'react'
import { shallow } from 'enzyme'
import { Draught } from '../components/draught'

describe('It should render the draught', () => {
  describe('queen', () => {
    it('should display that it is a queen', () => {
      const wrapper = shallow(<Draught isQueen={true} />)
      expect(wrapper.find('.draughtQueen').text()).toEqual('♛')
    })

    it('should display that it is a normal draught', () => {
      const wrapper = shallow(<Draught isQueen={false} />)
      expect(wrapper.find('.draughtQueen').text()).toEqual('')
    })
  })

  describe('selection', () => {
    let selectDraughtClickSpy

    beforeEach(() => {
      selectDraughtClickSpy = jest.fn()
    })

    it('should display that it is selected', () => {
      const wrapper = shallow(<Draught isSelected={true} />)
      expect(wrapper.find('.draught').prop('className')).toContain('draughtSelected')
    })

    it('should display that it is not selected', () => {
      const wrapper = shallow(<Draught isSelected={false} />)
      expect(wrapper.find('.draught').prop('className')).not.toContain('draughtSelected')
    })

    it('should simulate a click if it can be selected', () => {
      const wrapper = shallow(<Draught canBeSelected={true} selectDraughtClick={selectDraughtClickSpy} />)
      wrapper.find('.draught').simulate('click')
      expect(selectDraughtClickSpy).toBeCalled()
    })

    it('should not simulate a click if it cannot be selected', () => {
      const wrapper = shallow(<Draught canBeSelected={false} selectDraughtClick={selectDraughtClickSpy} />)
      wrapper.find('.draught').simulate('click')
      expect(selectDraughtClickSpy).not.toBeCalled()
    })
  })
})
