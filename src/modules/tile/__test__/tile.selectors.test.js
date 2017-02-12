import React from 'react'
import * as selectors from '../selectors'
import TileContainer from '../components/tileContainer'
import { fromJS, OrderedMap, Seq } from 'immutable'

describe('Tile selectors', () => {
  it('return tiles', () => {
    expect(selectors.tilesSelector({tiles: fromJS({hasDraught: false}) })).toEqual(fromJS({hasDraught: false}))
  })

  it('return id', () => {
    expect(selectors.idSelector(undefined, {id: 123})).toEqual(123)
  })

  it('return tile', () => {
    let tiles = OrderedMap()
    let tile = fromJS({id: 123, hasDraught: false})
    tiles = tiles.set(123, tile)
    expect(selectors.tileSelector.resultFunc(tiles, 123)).toEqual(fromJS({id: 123, hasDraught: false}))
  })

  it('return hasDraught', () => {
    expect(selectors.hasDraughtSelector.resultFunc(fromJS({hasDraught: true}))).toEqual(true)
  })

  it('return isEnemy', () => {
    expect(selectors.isEnemySelector.resultFunc(fromJS({isEnemy: true}))).toEqual(true)
  })

  it('return isHighlighted', () => {
    expect(selectors.isHighlightedSelector.resultFunc(fromJS({isHighlighted: true}))).toEqual(true)
  })

  it('return isAbleToEat', () => {
    expect(selectors.isAbleToEatSelector.resultFunc(fromJS({isAbleToEat: true}))).toEqual(true)
  })

  it('return allowDraught', () => {
    expect(selectors.allowDraughtSelector.resultFunc(fromJS({allowDraught: true}))).toEqual(true)
  })

  it('return canBeMoved', () => {
    expect(selectors.canBeMovedSelector.resultFunc(true)).toEqual(true)
  })

  // expect array but received object wtf?
  /*it('return tile containers', () => {
    let tiles = OrderedMap()
    let tile = fromJS({hasDraught: false})
    tiles = tiles.set(0, tile)

    let tilesArray = Seq(<TileContainer key={0} id={0} />)
    expect(selectors.tileContainersSelector.resultFunc(tiles)).toEqual(tilesArray)
  })*/
})
