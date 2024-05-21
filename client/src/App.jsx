import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Cart from './pages/Cart.jsx'
import LocomotiveScroll from 'locomotive-scroll';
const locomotiveScroll = new LocomotiveScroll();
import ShowProduct from './components/ShowProduct.jsx';
import AllProducts from './pages/AllProducts.jsx';
import './App.css'

const App = () => {
  return (
    <div>
      <Routes className=''>
        <Route path='/' element={<Outlet />}>
          <Route index element={<Home />} />
          <Route path='/products/all' element={<AllProducts />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/product/:id' element={<ShowProduct />} />
          <Route path='*' element={<div>error</div>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App