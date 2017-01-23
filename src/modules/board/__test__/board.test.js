import React from 'react'
import renderer from 'react-test-renderer'
import { fromJS, OrderedMap } from 'immutable'
import Board from '../components/board'

describe('<Board /> ', () => {
  it('should display the first player turn', () => {
    let tiles = OrderedMap()
    const tile = fromJS({allowDraught: false, hasDraught: false, player: undefined, isSelected: false,
      isHighlighted: false, isEnemy: false, isQueen: false, isAbleToEat: false, topLeftTile: undefined,
      topRightTile: undefined, bottomLeftTile: undefined, bottomRightTile: undefined, draught: undefined})

    tiles = tiles.set(0, tile)

    const rendered = renderer.create(<Board playerTurn={1} tiles={tiles} />)
    expect(rendered.toJSON()).toMatchSnapshot()
  })
})
