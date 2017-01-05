import React from 'react'
import { fromJS, OrderedMap } from 'immutable'
import { mount } from 'enzyme'
import { Board } from '../board'
import { startSelectDraught, startMoveDraught } from '../boardActions'
import { removeEnemy } from '../boardSagas'
import * as actionTypes from '../boardActionTypes'

describe('Board Saga', () => {
  it('should should remove an enemy', () => {
    let tile = fromJS({ id: 4, player: 1, isHighlighted: false, topLeftTile: topLeftTile, topRightTile: topRightTile, x: 7, y: 3 })
    const topRightTile = fromJS({ id: 3, player: 2, isEnemy: true, hasDraught: true, allowDraught: true, isQueen: true, topRightTile: tile, x: 6, y: 4 })
    const selectedDraught = fromJS({ id: 2, player: 1, isHighlighted: false, hasDraught: true, topRightTile: topRightTile, x: 5, y: 5 })

    const playerTurn = 1
    const isHighlighted = true
    tile = removeEnemy(selectedDraught, tile)
    expect(tile.getIn(['topRightTile', 'isEnemy'])).toEqual(false)
  })
})
