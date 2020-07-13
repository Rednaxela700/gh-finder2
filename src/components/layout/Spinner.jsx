import React, { Fragment } from 'react'
import spinnerImg from '../../assets/spinner.gif'
export default function Spinner() {
  return (
    <Fragment>
      <img src={spinnerImg} alt="" style={spinnerStyles}/>
    </Fragment>
  )
}


const spinnerStyles = {
  width: '200px',
  marging: 'auto',
  display: 'block'
}