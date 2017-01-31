/*import React from 'react'
import { fromJS, OrderedMap } from 'immutable'
import { mount } from 'enzyme'
import { Tile } from '../tile'
import { startSelectDraught, startMoveDraught } from '../../board/boardActions'
import * as actionTypes from '../../board/boardActionTypes'

describe('Tile integration test', () => {
  describe('Move a draught', () => {
    it('should move a draught to a tile', () => {
      const tile = fromJS({ id: 2, hasDraught: false, player: undefined, isSelected: false, isHighlighted: true, isQueen: false })
      const selectedDraught = fromJS({ id: 1, hasDraught: true, player: 1, isSelected: true, isQueen: false })
      const wrapper = mount(<Tile
      tile={tile}
      id={0}
      selectedDraught={selectedDraught}
      playerTurn={1}
      isAbleToEatAvailable={false}
      previousSelectedDraught={undefined}
      previousMove={undefined}
      startSelectDraught={startSelectDraught}
      startMoveDraught={startMoveDraught} />)

      wrapper.find('.tile').simulate('click')

      // how to wait until it finish
      setTimeout(() => {
        expect(wrapper.prop('tile').get('isSelected')).toEqual(true)
        expect(wrapper.prop('tile').get('isHighlighted')).toEqual(false)
        expect(wrapper.prop('tile').get('isQueen')).toEqual(false)
        expect(wrapper.prop('tile').get('player')).toEqual(1)
        expect(wrapper.prop('tile').get('hasDraught')).toEqual(true)

        expect(wrapper.prop('selectedDraught').get('isSelected')).toEqual(false)
        expect(wrapper.prop('selectedDraught').get('isHighlighted')).toEqual(false)
        expect(wrapper.prop('selectedDraught').get('isQueen')).toEqual(false)
        expect(wrapper.prop('selectedDraught').get('player')).toEqual(undefined)
        expect(wrapper.prop('selectedDraught').get('hasDraught')).toEqual(false)
      }, 10000)
    })

  it('should move a draught to a tile as a queen', () => {
    const tile = fromJS({ id: 2, hasDraught: false, player: undefined, isSelected: false, isHighlighted: true, isQueen: false })
    const selectedDraught = fromJS({ id: 1, hasDraught: true, player: 1, isSelected: true, isQueen: true })
    const wrapper = mount(<Tile
    tile={tile}
    id={0}
    selectedDraught={selectedDraught}
    playerTurn={1}
    isAbleToEatAvailable={false}
    previousSelectedDraught={undefined}
    previousMove={undefined}
    startSelectDraught={startSelectDraught}
    startMoveDraught={startMoveDraught} />)

    wrapper.find('.tile').simulate('click')

    // how to wait until it finish
    setTimeout(() => {
      expect(wrapper.prop('tile').get('isSelected')).toEqual(true)
      expect(wrapper.prop('tile').get('isHighlighted')).toEqual(false)
      expect(wrapper.prop('tile').get('isQueen')).toEqual(true)
      expect(wrapper.prop('tile').get('player')).toEqual(1)
      expect(wrapper.prop('tile').get('hasDraught')).toEqual(true)

      expect(wrapper.prop('selectedDraught').get('isSelected')).toEqual(false)
      expect(wrapper.prop('selectedDraught').get('isHighlighted')).toEqual(false)
      expect(wrapper.prop('selectedDraught').get('isQueen')).toEqual(false)
      expect(wrapper.prop('selectedDraught').get('player')).toEqual(undefined)
      expect(wrapper.prop('selectedDraught').get('hasDraught')).toEqual(false)
    }, 10000)
  })

    it('should move a draught to the end of the board as a player 1 making the draught a queen', () => {
      const tile = fromJS({ id: 2, hasDraught: false, player: undefined, isSelected: false, isHighlighted: true, isQueen: false, x: 10, y: 10 })
      const selectedDraught = fromJS({ id: 1, hasDraught: true, player: 1, isSelected: true, isQueen: false, x: 9, y: 9 })
      const wrapper = mount(<Tile
      tile={tile}
      id={0}
      selectedDraught={selectedDraught}
      playerTurn={1}
      isAbleToEatAvailable={false}
      previousSelectedDraught={undefined}
      previousMove={undefined}
      startSelectDraught={startSelectDraught}
      startMoveDraught={startMoveDraught} />)

      wrapper.find('.tile').simulate('click')

      // how to wait until it finish
      setTimeout(() => {
        expect(wrapper.prop('tile').get('isSelected')).toEqual(true)
        expect(wrapper.prop('tile').get('isHighlighted')).toEqual(false)
        expect(wrapper.prop('tile').get('isQueen')).toEqual(true)
        expect(wrapper.prop('tile').get('player')).toEqual(1)
        expect(wrapper.prop('tile').get('hasDraught')).toEqual(true)

        expect(wrapper.prop('selectedDraught').get('isSelected')).toEqual(false)
        expect(wrapper.prop('selectedDraught').get('isHighlighted')).toEqual(false)
        expect(wrapper.prop('selectedDraught').get('isQueen')).toEqual(false)
        expect(wrapper.prop('selectedDraught').get('player')).toEqual(undefined)
        expect(wrapper.prop('selectedDraught').get('hasDraught')).toEqual(false)
      }, 10000)
    })

    it('should move a draught to the end of the board as a player 2 making the draught a queen', () => {
      const tile = fromJS({ id: 2, hasDraught: false, player: undefined, isSelected: false, isHighlighted: true, isQueen: false, x: 0, y: 0 })
      const selectedDraught = fromJS({ id: 1, hasDraught: true, player: 2, isSelected: true, isQueen: false, x: 1, y: 1 })
      const wrapper = mount(<Tile
      tile={tile}
      id={0}
      selectedDraught={selectedDraught}
      playerTurn={2}
      isAbleToEatAvailable={false}
      previousSelectedDraught={undefined}
      previousMove={undefined}
      startSelectDraught={startSelectDraught}
      startMoveDraught={startMoveDraught} />)

      wrapper.find('.tile').simulate('click')

      // how to wait until it finish
      setTimeout(() => {
        expect(wrapper.prop('tile').get('isSelected')).toEqual(true)
        expect(wrapper.prop('tile').get('isHighlighted')).toEqual(false)
        expect(wrapper.prop('tile').get('isQueen')).toEqual(true)
        expect(wrapper.prop('tile').get('player')).toEqual(2)
        expect(wrapper.prop('tile').get('hasDraught')).toEqual(true)

        expect(wrapper.prop('selectedDraught').get('isSelected')).toEqual(false)
        expect(wrapper.prop('selectedDraught').get('isHighlighted')).toEqual(false)
        expect(wrapper.prop('selectedDraught').get('isQueen')).toEqual(false)
        expect(wrapper.prop('selectedDraught').get('player')).toEqual(undefined)
        expect(wrapper.prop('selectedDraught').get('hasDraught')).toEqual(false)
      }, 10000)
    })
  })

  describe('Eat a draught', () => {
    it('should eat an opponent draught', () => {
      const tile = fromJS({ id: 3, hasDraught: false, player: undefined, isSelected: false, isHighlighted: true, isQueen: false, x: 9, y: 9 })
      const bottomRightTile = fromJS({ id: 2, hasDraught: true, player: 2, isSelected: false, isHighlighted: false, isEnemy: true, isQueen: true, x: 8, y: 8, bottomRightTile: tile })
      const selectedDraught = fromJS({ id: 1, hasDraught: true, player: 1, isSelected: true, isQueen: false, x: 7, y: 7, bottomRightTile: bottomRightTile })
      const wrapper = mount(<Tile
      tile={tile}
      id={0}
      selectedDraught={selectedDraught}
      playerTurn={1}
      isAbleToEatAvailable={false}
      previousSelectedDraught={undefined}
      previousMove={undefined}
      startSelectDraught={startSelectDraught}
      startMoveDraught={startMoveDraught} />)

      wrapper.find('.tile').simulate('click')

      // how to wait until it finish
      setTimeout(() => {
        expect(wrapper.prop('tile').get('isSelected')).toEqual(true)
        expect(wrapper.prop('tile').get('isHighlighted')).toEqual(false)
        expect(wrapper.prop('tile').get('isQueen')).toEqual(false)
        expect(wrapper.prop('tile').get('player')).toEqual(1)
        expect(wrapper.prop('tile').get('hasDraught')).toEqual(true)

        expect(wrapper.prop('selectedDraught').getIn(['bottomRightTile', 'isSelected'])).toEqual(false)
        expect(wrapper.prop('selectedDraught').getIn(['bottomRightTile', 'isHighlighted'])).toEqual(false)
        expect(wrapper.prop('selectedDraught').getIn(['bottomRightTile', 'isQueen'])).toEqual(false)
        expect(wrapper.prop('selectedDraught').getIn(['bottomRightTile', 'player'])).toEqual(undefined)
        expect(wrapper.prop('selectedDraught').getIn(['bottomRightTile', 'hasDraught'])).toEqual(false)
        expect(wrapper.prop('selectedDraught').getIn(['bottomRightTile', 'isEnemy'])).toEqual(false)

        expect(wrapper.prop('selectedDraught').get('isSelected')).toEqual(false)
        expect(wrapper.prop('selectedDraught').get('isHighlighted')).toEqual(false)
        expect(wrapper.prop('selectedDraught').get('isQueen')).toEqual(false)
        expect(wrapper.prop('selectedDraught').get('player')).toEqual(undefined)
        expect(wrapper.prop('selectedDraught').get('hasDraught')).toEqual(false)
      }, 10000)
    })
  })
})*/

/*import React from 'react'
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

	it('should select a draught and highlight that it move to a new tile', () => {
		const topLeftTile = fromJS({ hasDraught: false, player: undefined, isHighlighted: false })
		const topRightTile = fromJS({ hasDraught: true, player: 1, isHighlighted: false })
		const tile = fromJS({ hasDraught: true, player: 2, isSelected: false, topLeftTile: topLeftTile, topRightTile: topRightTile })

		const selectedDraught = undefined
		const playerTurn = 2

		const dispatch = {
			tile: tile,
			selectedDraught: selectedDraught,
			playerTurn: playerTurn
		}

		const generatedTile = sagas.selectDraught(dispatch)
		generatedTile.next()
		const updatedTile = generatedTile.next().value
		// getTiles... how to mock that
		expect(updatedTile.PUT.action.tile.get('isSelected')).toEqual(true)
		expect(updatedTile.PUT.action.tile.getIn(['topLeftTile', 'isHighlighted'])).toEqual(true)
		expect(updatedTile.PUT.action.tile.getIn(['topRightTile', 'isHighlighted'])).toEqual(false)
		expect(updatedTile.PUT.action.selectedDraught).toEqual(tile)
	})

	it('should select a draught and highlight that it can eat an enemy', () => {
		const topTopRightTile = fromJS({ hasDraught: false, player: undefined, isHighlighted: false })
		const topRightTile = fromJS({ hasDraught: true, player: 1, isEnemy: false, topRightTile: topTopRightTile })
		const tile = fromJS({ hasDraught: true, player: 2, isSelected: false, topRightTile: topRightTile })

		const selectedDraught = undefined
		const playerTurn = 2

		const dispatch = {
			tile: tile,
			selectedDraught: selectedDraught,
			playerTurn: playerTurn
		}

		const generatedTile = sagas.selectDraught(dispatch)
		generatedTile.next()
		const updatedTile = generatedTile.next().value
		expect(updatedTile.PUT.action.tile.get('isSelected')).toEqual(true)
		expect(updatedTile.PUT.action.tile.getIn(['topRightTile', 'isEnemy'])).toEqual(true)
		expect(updatedTile.PUT.action.tile.getIn(['topRightTile', 'topRightTile', 'isHighlighted'])).toEqual(true)
		expect(updatedTile.PUT.action.selectedDraught).toEqual(tile)
	})

	it('should unselect a draught and unhighlight the tile neighbours', () => {
		const topLeftTile = fromJS({ hasDraught: false, player: undefined, isHighlighted: true })
		const topRightTile = fromJS({ hasDraught: true, player: 1, isHighlighted: false })
		const tile = fromJS({ hasDraught: true, player: 2, isSelected: false, topLeftTile: topLeftTile, topRightTile: topRightTile })

		const selectedDraught = undefined
		const playerTurn = 2

		const dispatch = {
			tile: tile,
			selectedDraught: selectedDraught,
			playerTurn: playerTurn
		}

		const generatedTile = sagas.selectDraught(dispatch)
		generatedTile.next()
		const updatedTile = generatedTile.next().value
		expect(updatedTile.PUT.action.tile.get('isSelected')).toEqual(false)
		expect(updatedTile.PUT.action.tile.getIn(['topLeftTile', 'isHighlighted'])).toEqual(false)
		expect(updatedTile.PUT.action.tile.getIn(['topRightTile', 'isHighlighted'])).toEqual(false)
		expect(updatedTile.PUT.action.selectedDraught).toEqual(tile)
	})

	/*it('should move the draught to the tile', () => {
		const tile = fromJS({ id: 2, hasDraught: false, player: undefined, isSelected: false, isHighlighted: true, isQueen: false })
		const selectedDraught = fromJS({ id: 1, hasDraught: true, player: 1, isSelected: true, isQueen: true })
		const playerTurn = 1
		const previousMove = undefined
		const isAbleToEatAvailable = false

		const dispatch = {
			tile: tile,
			selectedDraught: selectedDraught,
			playerTurn: playerTurn
			previousMove: previousMove,
			isAbleToEatAvailable: isAbleToEatAvailable
		}

		const generatedTile = sagas.moveDraught(dispatch)
		const isEnemyRemoved = generatedTile.next().value
		expect(isEnemyRemoved).toEqual(false)

		const removedSelectedDraught = generatedTile.next().value
		expect(removedSelectedDraught.get('isSelected')).toEqual(false)
		expect(removedSelectedDraught.get('hasDraught')).toEqual(false)
		expect(removedSelectedDraught.get('player')).toEqual(false)
		expect(removedSelectedDraught.get('isQueen')).toEqual(false)

		// this is getTile
		generatedTile.next()


		expect(updatedTile.PUT.action.tile.get('isSelected')).toEqual(false)
		expect(updatedTile.PUT.action.tile.getIn(['topLeftTile', 'isHighlighted'])).toEqual(false)
		expect(updatedTile.PUT.action.tile.getIn(['topRightTile', 'isHighlighted'])).toEqual(false)
		expect(updatedTile.PUT.action.selectedDraught).toEqual(tile)
	})*/

	/*it('should move the draught to the tile and eat the enemy on the way', () => {

	})

	it('should move the draught to the tile, eat the enemy and be able to eat again', () => {

	})

	it('should move the draught to the end of the board and make it a queen as a player 1', () => {

	})

	it('should move the draught to the end of the board and make it a queen as a player 2', () => {

	})

	it('should move the draught to the tile and highlight the previous selected draught neighbours if they can eat on the next turn', () => {

	})

	it('should move the draught to the tile and highlight this tile neighbours if they can eat on the next turn', () => {

	})

	it('should move the draught to the tile and highlight the previous move that is made by the other player if they can eat on the next turn', () => {

	})

	it('should move the draught to the tile and check if the previous move that is made by the other player is eaten on the way', () => {

	})
})*/

describe('test', () => {
  it('test', () => {
    expect(1 + 1).toEqual(2)
  })
})
