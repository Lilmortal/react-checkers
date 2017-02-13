import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import * as actions from '../actions'
import * as selectors from '../selectors'
import ReduxFormExample from './reduxFormExample'

const mapStateToProps = state => {
	return createStructuredSelector({
		passengers: selectors.passengersSelector
	})
}

const mapDispatchToProps = dispatch => ({
	onSubmit: passengers => dispatch(actions.UPDATE_PASSENGER(passengers))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReduxFormExample)
