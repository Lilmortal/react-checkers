import * as actionTypes from './actionTypes'
import axios from 'axios'

export const UPDATE_PASSENGER = (passengers) => {
  return {
    type: actionTypes.UPDATE_PASSENGER,
    passengers
  }
}

export const FETCH_PASSENGER = (pnr) => {
  return dispatch => {
    return axios.get('http://localhost:8080/api/findticket/' + pnr).then(response => {
    	return Promise.resolve(response.data)
    }).then(data => {
      dispatch(UPDATE_PASSENGER(data))
    }).catch(error => {
      // display custom error pages?
      console.log(error)
    })
  }
}
