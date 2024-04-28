import React from 'react'
import { Routes, Route, Outlet, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Cart from './pages/Cart.jsx'
import LocomotiveScroll from 'locomotive-scroll';
const locomotiveScroll = new LocomotiveScroll();
import './App.css'

const App = () => {
  return (
    <div>

      <Routes className=''>
        <Route path='/' element={<Outlet />}>
          <Route index element={<Home />} />
          {/* <Route path='/doctors' element={<Doctors />} /> */}
          <Route path='/cart' element={<Cart />} />
          <Route path='*' element={<div>error</div>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App