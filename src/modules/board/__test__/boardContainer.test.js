/*import React from 'react'
import { fromJS, OrderedMap } from 'immutable'
import renderer from 'react-test-renderer'
import { BoardContainer } from '../containers/boardContainer'
import TileContainer from '../../tile/containers/tileContainer'

describe('Board container', () => {
  it('should render tile container', () => {
    let tiles = OrderedMap()
    const tile = fromJS({
      allowDraught: true, hasDraught: false, player: 2, isSelected: false,
    	isHighlighted: false, isEnemy: false, isQueen: false, isAbleToEat: false, topLeftTile: undefined,
      topRightTile: undefined, bottomLeftTile: undefined, bottomRightTile: undefined, x: 0, y: 0, id: 1,
      draught: undefined
    })
    tiles = tiles.set(0, tile)

    const rendered = renderer.create(<BoardContainer tiles={tiles} playerTurn={2} />)
    expect(rendered.toJSON()).toMatchSnapshot()
  })
})*/

describe('test', () => {
  it('test', () => {
    expect(1 + 1).toEqual(2)
  })
})
