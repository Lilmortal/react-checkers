import React from 'react'
import { liftCheckerPiece } from './checkerActions'
import { connect } from 'react-redux'
import './checker.css'

const player1 = {
	backgroundColor: 'white'
}

const player2 = {
	backgroundColor: 'maroon'
}

const liftStyle = {
	margin: '0 0 20px 20px',
	boxShadow: '-10px 5px grey'
}

const Checker = (props) => {
	let styles = props.player === 1 ? player1 : player2
	if (props.updatedId === props.id && props.lift) {
		styles = Object.assign({}, styles, liftStyle)
	}
	
	return (
		<div className="checker" onClick={() => props.liftCheckerPiece(props.lift, props.id)} 
		style={styles}></div>
	)
}

const mapStateToProps = (state) => ({
	updatedId: state.checkerReducer.updatedId,
	lift: state.checkerReducer.lift
})

export default connect(mapStateToProps, {liftCheckerPiece})(Checker)
