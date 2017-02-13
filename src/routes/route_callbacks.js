import store from '../store'
import reduxFormExampleModule from '../modules/reduxFormExample'

const { FETCH_PASSENGER } = reduxFormExampleModule.actions

export const onFormEnter = (params) => {
  store.dispatch(FETCH_PASSENGER(params.params.pnr))
}
