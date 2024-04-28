import React from 'react'
import HeaderSlider from '../components/HeaderSlider'
import Navbar from '../components/Navbar';
import Category from '../components/Category';
import Products from '../components/Products';

const Home = () => {
  return (
    <div>
      <Navbar/>
      <HeaderSlider/>
      <Category/>
      <Products/>
    </div>
  )
}

export default Home