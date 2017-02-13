import React from 'react'
import { Field, reduxForm } from 'redux-form'

let ReduxFormExample = ({ handleSubmit, passengers }) => {
  return (
    <form onSubmit={handleSubmit}>
      {passengers.map((passenger, id) => {
        return (
          <div key={id}>
            <label htmlFor="firstName">{passenger.passengerFirstName}</label>
            <Field name="firstName" component="input" type="text"/>
            <label htmlFor="surname">{passenger.passengerSurname}</label>
            <Field name="surname" component="input" type="text"/>
          </div>
        )
      })}
      <button type="submit">Change PNR</button>
    </form>
  )
}

export default reduxForm({
  form: 'reduxFormExample'
})(ReduxFormExample)
