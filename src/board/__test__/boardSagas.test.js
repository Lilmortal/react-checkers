import React from 'react'
import { fromJS } from 'immutable'
import * as sagas from '../boardSagas'

describe('Board Saga', () => {
	it('should remove an enemy', () => {
		const tile = fromJS({ id: 4, player: 1, isHighlighted: false, x: 7, y: 3 })
		const topRightTile = fromJS({ id: 3, player: 2, isEnemy: true, hasDraught: true, allowDraught: true, isQueen: true, topRightTile: tile, x: 6, y: 4 })
		const selectedDraught = fromJS({ id: 2, player: 1, isHighlighted: false, hasDraught: true, topRightTile: topRightTile, x: 5, y: 5 })

		const generatedTile = sagas.removeEnemy(selectedDraught, tile)
		generatedTile.next()
		const updatedTile = generatedTile.next().value

		expect(updatedTile.PUT.action.tile.getIn(['topRightTile', 'isEnemy'])).toEqual(false)
		expect(updatedTile.PUT.action.tile.getIn(['topRightTile', 'isQueen'])).toEqual(false)
		expect(updatedTile.PUT.action.tile.getIn(['topRightTile', 'hasDraught'])).toEqual(false)
	})

	it('should remove the selected draught', () => {
		const playerTurn = 2
		const selectedDraught = fromJS({ id: 2, player: 1, isSelected: true, hasDraught: true, x: 5, y: 5 })

		const generatedTile = sagas.removeSelectedDraught(selectedDraught, playerTurn)
		const updatedTile = generatedTile.next().value

		expect(updatedTile.PUT.action.tile.get('isSelected')).toEqual(false)
		expect(updatedTile.PUT.action.tile.get('hasDraught')).toEqual(false)
	})

	it('should check that the tile has enemy while its player 1 turn', () => {
		const bottomBottomRightTile = fromJS({ player: undefined, x: 7, y: 7 })
		const bottomRightTile = fromJS({ player: 2, x: 6, y: 6, bottomRightTile: bottomBottomRightTile })
		const tile = fromJS({ player: 1, x: 5, y: 5, bottomRightTile: bottomRightTile })

		const isQueen = false
		const playerTurn = 1
		const hasEnemy = sagas.checkIfTileHasEnemy(tile, isQueen, playerTurn)
		expect(hasEnemy).toEqual(true)
	})
   
   	it('should check that the tile has enemy while its player 2 turn', () => {
   		const topTopRightTile = fromJS({ player: undefined, x: 7, y: 3 })
		const topRightTile = fromJS({ player: 1, x: 6, y: 4, topRightTile: topTopRightTile })
		const tile = fromJS({ player: 2, x: 5, y: 5, topRightTile: topRightTile })

		const isQueen = false
		const playerTurn = 2
		const hasEnemy = sagas.checkIfTileHasEnemy(tile, isQueen, playerTurn)
		expect(hasEnemy).toEqual(true)
	})

   	it('should check that the tile does not have enemy while its player 2 turn', () => {
		const bottomBottomRightTile = fromJS({ player: undefined, x: 7, y: 7 })
		const bottomRightTile = fromJS({ player: 2, x: 6, y: 6, bottomRightTile: bottomBottomRightTile })
		const tile = fromJS({ player: 2, x: 5, y: 5, bottomRightTile: bottomRightTile })

		const isQueen = false
		const playerTurn = 2
		const hasEnemy = sagas.checkIfTileHasEnemy(tile, isQueen, playerTurn)
		expect(hasEnemy).toEqual(false)
	})

	it('should check that the tile has enemy while the tile is a queen', () => {
		const topTopRightTile = fromJS({ player: undefined, x: 7, y: 3 })
		const topRightTile = fromJS({ player: 2, x: 6, y: 4, topRightTile: topTopRightTile })
		const tile = fromJS({ player: 1, x: 5, y: 5, topRightTile: topRightTile })

		const isQueen = true
		const playerTurn = 1
		const hasEnemy = sagas.checkIfTileHasEnemy(tile, isQueen, playerTurn)
		expect(hasEnemy).toEqual(true)
	})

	it('should move the selected draught to tile', () => {
		const tile = fromJS({ player: undefined, hasDraught: false, isQueen: false, isAbleToEat: true })
		const selectedDraught = fromJS({ player: 1, isSelected: true, hasDraught: true, isQueen: true })
		const isAbleToEat = true
		const updatedTile = sagas.moveSelectedDraughtToTile(tile, selectedDraught, isAbleToEat)

		expect(updatedTile.get('hasDraught')).toEqual(true)
		expect(updatedTile.get('isQueen')).toEqual(true)
		expect(updatedTile.get('isAbleToEat')).toEqual(true)
	})
	
	it('should set the selected draught neighbours to be able to eat', () => {
		const topTopLeftTile = fromJS({ player: 2, hasDraught: true, isAbleToEat: false })
		const topLeftTile = fromJS({ player: 1, hasDraught: true, topLeftTile: topTopLeftTile })
		const selectedDraught = fromJS({ player: 1, isSelected: true, hasDraught: true, topLeftTile: topLeftTile })

		const playerTurn = 1
		const generatedTile = sagas.setSelectedDraughtNeighboursToBeAbleToEatIfItCan(selectedDraught, playerTurn)
		const updatedTile = generatedTile.next().value
		expect(updatedTile.PUT.action.tile.getIn(['topLeftTile', 'topLeftTile', 'isAbleToEat'])).toEqual(true)
	})

	it('should set the tile neighbour to be able to eat while its player 1 turn', () => {
		const topLeftTile = fromJS({ player: undefined, hasDraught: false })
		const bottomRightTile = fromJS({ player: 2, hasDraught: true, isAbleToEat: false })
		const tile = fromJS({ player: 1, hasDraught: true, topLeftTile: topLeftTile, bottomRightTile: bottomRightTile })

		const playerTurn = 1
		const generatedTile = sagas.setTileNeighboursToBeAbleToEatIfItCan(tile, playerTurn)
		const updatedTile = generatedTile.next().value
		expect(updatedTile.PUT.action.tile.getIn(['bottomRightTile', 'isAbleToEat'])).toEqual(true)
	})

	it('should set the tile neighbour to be able to eat while its player 2 turn', () => {
		const topLeftTile = fromJS({ player: 1, hasDraught: true, isAbleToEat: false })
		const bottomRightTile = fromJS({ player: undefined, hasDraught: false })
		const tile = fromJS({ player: 2, hasDraught: true, topLeftTile: topLeftTile, bottomRightTile: bottomRightTile })

		const playerTurn = 2
		const generatedTile = sagas.setTileNeighboursToBeAbleToEatIfItCan(tile, playerTurn)
		const updatedTile = generatedTile.next().value
		expect(updatedTile.PUT.action.tile.getIn(['topLeftTile', 'isAbleToEat'])).toEqual(true)
	})

	it('should set the tile neighbour to be able to eat while the tile neighbour is a queen', () => {
		const topLeftTile = fromJS({ player: 2, hasDraught: true, isQueen: true, isAbleToEat: false })
		const bottomRightTile = fromJS({ player: undefined, hasDraught: false })
		const tile = fromJS({ player: 1, hasDraught: true, topLeftTile: topLeftTile, bottomRightTile: bottomRightTile })

		const playerTurn = 1
		const generatedTile = sagas.setTileNeighboursToBeAbleToEatIfItCan(tile, playerTurn)
		const updatedTile = generatedTile.next().value
		expect(updatedTile.PUT.action.tile.getIn(['topLeftTile', 'isAbleToEat'])).toEqual(true)
	})

	it('should not set the tile neighbour to be able to eat if the tile neighbours cant eat', () => {
		const topLeftTile = fromJS({ player: 2, hasDraught: true, isAbleToEat: false })
		const bottomRightTile = fromJS({ player: undefined, hasDraught: false })
		const tile = fromJS({ player: 1, hasDraught: true, topLeftTile: topLeftTile, bottomRightTile: bottomRightTile })

		const playerTurn = 1
		const generatedTile = sagas.setTileNeighboursToBeAbleToEatIfItCan(tile, playerTurn)
		const updatedTile = generatedTile.next().value
		expect(updatedTile.PUT.action.tile.getIn(['topLeftTile', 'isAbleToEat'])).toEqual(false)
	})

	it('should not set the tile neighbour to be able to eat if the tile that it can move to is taken', () => {
		const topTopLeftTile = fromJS({ player: 2, hasDraught: true, isAbleToEat: true })
		const topLeftTile = fromJS({ player: 1, hasDraught: true, isAbleToEat: false, topLeftTile: topTopLeftTile })
		const tile = fromJS({ player: 1, hasDraught: true, topLeftTile: topLeftTile })

		const playerTurn = 1
		const generatedTile = sagas.setTileNeighboursToBeAbleToEatIfItCan(tile, playerTurn)
		const updatedTile = generatedTile.next().value
		expect(updatedTile.PUT.action.tile.getIn(['topLeftTile', 'topLeftTile', 'isAbleToEat'])).toEqual(false)
	})

	/*it('should set the previous tile neighbours to be able to eat', () => {
		const topTopLeftTile = fromJS({ player: undefined, hasDraught: false, isAbleToEat: false })
		const topLeftTile = fromJS({ player: 1, hasDraught: true, isAbleToEat: false, topLeftTile: topTopLeftTile })
		const tile = fromJS({ player: 2, hasDraught: true, topLeftTile: topLeftTile })

		const playerTurn = 1
		const generatedTile = sagas.setPreviousMove(tile, playerTurn)
		const updatedTile = generatedTile.next().value
		expect(updatedTile.PUT.action.tile.get('isAbleToEat')).toEqual(true)
	})*/

	it('should update the previous tile', () => {
		const tile = fromJS({ id: 4, hasDraught: true})
		const previousMove = fromJS({ player: 2, hasDraught: true })

		const playerTurn = 1
		const generatedTile = sagas.setPreviousMove(previousMove, tile, playerTurn)
		const updatedTile = generatedTile.next().value
		expect(updatedTile.PUT.action.tile.get('id')).toEqual(4)
	})

	it('should remove the previous tile if the draught that is on this tile is eaten', () => {
		const tile = fromJS({ id: 4, hasDraught: true})
		const previousMove = fromJS({ player: 2, hasDraught: false })

		const playerTurn = 1
		const generatedTile = sagas.setPreviousMove(previousMove, tile, playerTurn)
		const updatedTile = generatedTile.next().value
		expect(updatedTile.PUT.action.tile).toBeUndefined()
	})
})
