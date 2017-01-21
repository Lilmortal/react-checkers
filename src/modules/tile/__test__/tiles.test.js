import React from 'react'
import { updateTiles, populateTiles } from '../tiles'
import { fromJS, OrderedMap } from 'immutable'

describe('Tiles', () => {
  describe('Update tiles', () => {
    it('should update the tiles', () => {
      let tiles = OrderedMap()
      const bottomLeftTile = fromJS({ isEnemy: false })
      const tile = fromJS({ isHighlighted: false })
      tiles = tiles.set(0, tile)

      const updatedBottomLeftTile = fromJS({ isEnemy: true, x: 1, y: 3 })
      const updatedTile = fromJS({ id: 0, isHighlighted: true, bottomLeftTile: updatedBottomLeftTile, x: 2, y: 2 })
      const updatedTiles = updateTiles(tiles, updatedTile)
      expect(updatedTiles.getIn([0, 'isHighlighted'])).toEqual(true)
      expect(updatedTiles.getIn([0, 'bottomLeftTile', 'isEnemy'])).toEqual(true)
    })
  })

  describe('Populate tiles', () => {
    it('should populate the tiles', () => {
      const tiles = populateTiles()

      const player1Draught = tiles.find((tile) => tile.get('y') <= 3)
      expect(player1Draught.get('player')).toEqual(1)
      expect(player1Draught.get('hasDraught')).toEqual(true)
    })
  })
})
