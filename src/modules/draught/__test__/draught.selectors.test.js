import React from 'react'
import DraughtContainer from '../components/draughtContainer'
import * as selectors from '../selectors'
import { fromJS, OrderedMap } from 'immutable'

describe('Draught selectors', () => {
  it('return selectedDraughtId', () => {
    expect(selectors.selectedDraughtIdSelector({board: {selectedDraughtId: 123}})).toEqual(123)
  })

  it('return isAbleToEatAvailable', () => {
    expect(selectors.isAbleToEatAvailableSelector({board: {isAbleToEatAvailable: true}})).toEqual(true)
  })

  it('return playerTurn', () => {
    expect(selectors.playerTurnSelector({board: {playerTurn: 1}})).toEqual(1)
  })

  it('return tiles', () => {
    expect(selectors.tilesSelector({tiles: fromJS({hasDraught: false}) })).toEqual(fromJS({hasDraught: false}))
  })

  it('return draught tile', () => {
    let tiles = OrderedMap()
    let tile = fromJS({id: 123, hasDraught: false})
    tiles = tiles.set(123, tile)
    expect(selectors.tileSelector.resultFunc(tiles, 123)).toEqual(fromJS({id: 123, hasDraught: false}))
  })

  it('return draught', () => {
    expect(selectors.draughtSelector.resultFunc(fromJS({draught: fromJS({isSelected: true })}))).toEqual(fromJS({isSelected: true}))
  })

  it('return hasDraught', () => {
    expect(selectors.hasDraughtSelector.resultFunc(fromJS({hasDraught: true}))).toEqual(true)
  })

  it('return isAbleToEat', () => {
    expect(selectors.isAbleToEatSelector.resultFunc(fromJS({isAbleToEat: true}))).toEqual(true)
  })

  it('return player', () => {
    expect(selectors.playerSelector.resultFunc(fromJS({player: true}))).toEqual(true)
  })

  it('return isSelected', () => {
    expect(selectors.isSelectedSelector.resultFunc(fromJS({isSelected: true}))).toEqual(true)
  })

  it('return isQueen', () => {
    expect(selectors.isQueenSelector.resultFunc(fromJS({isQueen: true}))).toEqual(true)
  })

  it('return draught can be selected if its the player turn', () => {
    expect(selectors.canBeSelectedSelector.resultFunc(false, 1, 1, false)).toEqual(true)
  })

  it('return draught can be selected if this draught can eat', () => {
    expect(selectors.canBeSelectedSelector.resultFunc(true, 1, 1, true)).toEqual(true)
  })

  it('return draught cannot be selected if its the player turn but draught cannot eat', () => {
    expect(selectors.canBeSelectedSelector.resultFunc(true, 1, 1, false)).toEqual(false)
  })

  it('return draught container', () => {
    expect(selectors.draughtContainerSelector.resultFunc(123, true)).toEqual(<DraughtContainer id={123} />)
  })

  it('should not return draught container if it does not have a draught', () => {
    expect(selectors.draughtContainerSelector.resultFunc(123, false)).toEqual(undefined)
  })
})
