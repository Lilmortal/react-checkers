import React from 'react'
import { expect } from 'chai'
import { fromJS, OrderedMap } from 'immutable'
import { mount } from 'enzyme'
import { Board } from '../board'
import { startSelectDraught, startMoveDraught } from '../boardActions'
import * as actionTypes from '../boardActionTypes'
import { toggleTileHighlights } from '../boardSagas'

describe('Board Saga', () => {
  it('should highlight the tile neighbours if its player 1', () => {
    const topLeftTile = fromJS({ player: undefined, hasDraught: false, isHighlighted: false, isEnemy: false })
    const enemyTopRightTile = fromJS({ player: undefined, hasDraught: false, isHighlighted: false, isEnemy: false })
    const topRightTile = fromJS({ player: 2, hasDraught: true, topRightTile: enemyTopRightTile, isHighlighted: false, isEnemy: false })
    let tile = fromJS({ player: 1, isHighlighted: false, topLeftTile: topLeftTile, topRightTile: topRightTile })

    const playerTurn = 1
    const isHighlighted = true
    tile = toggleTileHighlights(tile, playerTurn, isHighlighted)

    expect(tile.getIn(['topLeftTile', 'isHighlighted'])).to.equal(true)
  })
})
