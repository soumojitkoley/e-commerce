import React from 'react'
import './App.css'
import HeaderSlider from './components/HeaderSlider'

import LocomotiveScroll from 'locomotive-scroll';
import Navbar from './components/Navbar';
const locomotiveScroll = new LocomotiveScroll();

const App = () => {
  return (
    <div>
      <Navbar/>
      <HeaderSlider/>
    </div>
  )
}

export default App