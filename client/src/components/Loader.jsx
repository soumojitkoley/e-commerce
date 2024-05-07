import React from 'react'
import { FadeLoader } from 'react-spinners';
import './Loader.css'

const Loader = () => {
  return (
    <div className="loader">
      <FadeLoader />
    </div>
  )
}

export default Loader