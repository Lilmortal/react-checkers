import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'
import { fromJS } from 'immutable'
import { Tile } from '../tile'

describe('Tile CSS Styles', () => {
  it('should display that this tile is an enemy', () => {
    let tileJS = fromJS({ isEnemy: true })
    let tileWrapper = mount(<Tile tile={tileJS} />)
    expect(tileWrapper.prop('tile').get('isEnemy')).to.equal(true)
    expect(tileWrapper.find('.tile').props().style.backgroundColor).to.equal('brown')
  })

  it('should display that this tile is highlighted', () => {
    let tileJS = fromJS({ isHighlighted: true })
    let tileWrapper = mount(<Tile tile={tileJS} />)
    expect(tileWrapper.prop('tile').get('isHighlighted')).to.equal(true)
    expect(tileWrapper.find('.tile').props().style.backgroundColor).to.equal('orange')
  })

  it('should display that this tile is able to eat an opponent', () => {
    let tileJS = fromJS({ isAbleToEat: true })
    let tileWrapper = mount(<Tile tile={tileJS} />)
    expect(tileWrapper.prop('tile').get('isAbleToEat')).to.equal(true)
    expect(tileWrapper.find('.tile').props().style.backgroundColor).to.equal('blue')
  })

  it('should display that this tile is allowed to have a draught', () => {
    let tileJS = fromJS({ allowDraughts: true })
    let tileWrapper = mount(<Tile tile={tileJS} />)
    expect(tileWrapper.prop('tile').get('allowDraughts')).to.equal(true)
    expect(tileWrapper.find('.tile').props().style.backgroundColor).to.equal('black')
  })

  it('should display that this tile is not allowed to have a draught', () => {
    let tileJS = fromJS({ allowDraughts: false })
    let tileWrapper = mount(<Tile tile={tileJS} />)
    expect(tileWrapper.prop('tile').get('allowDraughts')).to.equal(false)
    expect(tileWrapper.find('.tile').props().style.backgroundColor).to.equal('red')
  })
})

// display draught if have draught
// test other variables and shit
// mock click and see if it move draught
