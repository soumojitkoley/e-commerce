import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

import './Cart.css';
import Loader from '../components/Loader';

const Cart = () => {
  const [cartData, setCartData] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const { items, deleteItem, setItems, productShowHandler } = useContext(ShopContext)

  useEffect(() => {
    async function getCartProducts() {
      try {
        setIsLoading(true)
        let categoryApi = await fetch('https://api.escuelajs.co/api/v1/products');
        let data = await categoryApi.json();

        let filterData = data.filter(eachData => items.some(item => item.id === eachData.id));
        setCartData(filterData);
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    getCartProducts();
  }, [items]);

  function increaseHandler(id) {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setItems(updatedItems);
  }

  function decreaseHandler(id) {
    const updatedItems = items.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setItems(updatedItems);
  }

  useEffect(() => {
    let totalPrice = 0;
    cartData.forEach(eachData => {
      totalPrice += eachData.price * (items.find(item => item.id === eachData.id)?.quantity || 0);
    });
    setTotalPrice(totalPrice);
  }, [items, cartData]);

  return (
    <>
      <Navbar />
      {
        isLoading ?
          (<Loader />)
          :
          (
            <div className='cart-main-div'>
              {
                cartData.length == 0 ?
                  (
                    <div className='cart-0'>
                      <img src="/logo/shopping-cart.png" alt="" />
                      <h1>No Products Found</h1>
                      <Link to='/products/all'><button>Start Shopping</button></Link>
                    </div>
                  )
                  :
                  (
                    <>
                      <div className="cart-title">
                        <h1>Cart Products</h1>
                      </div>
                      <div className='cart'>
                        <div className='cart-part'>
                          {cartData.map(eachProduct => (
                            <div key={eachProduct.id} className='each-cart'>
                              <div className="cart-img">
                                <Link to={`/product/${eachProduct.id}`}>
                                  <img src={eachProduct.images[0]} alt="" onClick={() => productShowHandler(eachProduct.id)} />
                                </Link>
                              </div>
                              <p>{eachProduct.title}</p>
                              <div className='each-cart-p-c'>
                                <p>${eachProduct.price}</p>
                                <FaCircleMinus onClick={() => decreaseHandler(eachProduct.id)} />
                                <span>{items.find(item => item.id === eachProduct.id)?.quantity}</span>
                                <FaCirclePlus onClick={() => increaseHandler(eachProduct.id)} />
                                <button onClick={() => deleteItem(eachProduct.id)}>delete</button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className='cart-checkout'>
                          <h1>total: ${totalPrice}</h1>
                          <button> Checkout </button>
                        </div>
                      </div>
                    </>
                  )
              }
            </div>
          )
      }
    </>
  );
};


export default Cart;
