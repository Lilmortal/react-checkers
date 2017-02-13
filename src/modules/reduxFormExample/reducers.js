import * as actionTypes from './actionTypes'

const initialState = {
  passengers: [
    {
      passengerSurname: 'Default surname',
      passengerFirstName: 'Default first name'
    }
  ]
}

const reduxFormExampleReducer = (state = initialState, payLoad) => {
  switch(payLoad.type) {
    case actionTypes.UPDATE_PASSENGER: {
      return {
        ...state,
        passengers: payLoad.passengers
      }
    }
    default:
      return state
  }
}

export default reduxFormExampleReducer
