import React from 'react'
import Navbar from '../components/Navbar'
import Products from '../components/Products'
import './Allproducts.css'


const AllProducts = () => {
  return (
    <div className='m-top'>
      <Navbar />
      <div>
        <Products />
      </div>
    </div>
  )
}

export default AllProducts