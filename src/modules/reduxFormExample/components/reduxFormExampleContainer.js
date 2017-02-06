import ReduxFormExample from './reduxFormExample'
import { connect } from 'react-redux'

const mapStateToProps = (state, props) => {
	return {
    word: 'Hello'
  }
}

export default connect(mapStateToProps)(ReduxFormExample)
