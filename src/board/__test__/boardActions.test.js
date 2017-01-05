import React from 'react'
import { fromJS } from 'immutable'
import * as actions from '../boardActions'
import * as actionTypes from '../boardActionTypes'

describe('Board actions', () => {
  it('should create an action that start the select draught process', () => {
    const tile = fromJS({ isSelected: false, player: 1 })
    const selectedDraught = fromJS({ isSelected: true, player: 1 })
    const playerTurn = 1

    const expectedAction = {
      type: actionTypes.START_SELECT_DRAUGHT,
      tile,
      selectedDraught,
      playerTurn
    }
    expect(actions.startSelectDraught(tile, selectedDraught, playerTurn)).toEqual(expectedAction)
  })

  it('should create an action that toggle select the draught', () => {
    const tile = fromJS({ isSelected: true, player: 1 })
    const selectedDraught = fromJS({ isSelected: false, player: 1 })
    const playerTurn = 1

    const expectedAction = {
      type: actionTypes.SELECT_DRAUGHT,
  		selectedDraught,
  		tile
    }
    expect(actions.selectDraught(selectedDraught, tile)).toEqual(expectedAction)
  })

  it('should create an action that toggle highlight the tile', () => {
    const tile = fromJS({ isHighlighted: true })

    const expectedAction = {
    	type: actionTypes.HIGHLIGHT_TILE,
      tile
    }
    expect(actions.highlightTile(tile)).toEqual(expectedAction)
  })

  it('should create an action that remove the draught', () => {
    const tile = fromJS({ hasDraught: false })

    const expectedAction = {
      type: actionTypes.REMOVE_DRAUGHT,
  		tile
    }
    expect(actions.removeDraught(tile)).toEqual(expectedAction)
  })

  it('should create an action that start the moving draught process', () => {
    const tile = fromJS({ hasDraught: true, isSelected: false })
    const selectedDraught = fromJS({ hasDraught: false, isSelected: false })
    const previousSelectedDraught = fromJS({ hasDraught: false, x: 5, y: 5 })
    const previousMove = fromJS({ hasDraught: true, x: 6, y: 6 })
    const playerTurn = 2

    const expectedAction = {
      type: actionTypes.START_MOVE_DRAUGHT,
  		tile,
  		selectedDraught,
  		previousSelectedDraught,
  		previousMove,
  		playerTurn
    }
    expect(actions.startMoveDraught(tile, selectedDraught, previousSelectedDraught, previousMove, playerTurn)).toEqual(expectedAction)
  })

  it('should create an action that move the draught', () => {
    const tile = fromJS({ hasDraught: true, isSelected: false })
    const playerTurn = 2
    const previousSelectedDraught = fromJS({ hasDraught: false, x: 5, y: 5 })
    const previousMove = fromJS({ hasDraught: true, x: 6, y: 6 })
    const isAbleToEatAvailable = true

    const expectedAction = {
      type: actionTypes.MOVE_DRAUGHT,
  		tile,
  		playerTurn,
  		previousSelectedDraught,
  		previousMove,
  		isAbleToEatAvailable
    }
    expect(actions.moveDraught(tile, playerTurn, previousSelectedDraught, previousMove, isAbleToEatAvailable)).toEqual(expectedAction)
  })
})
