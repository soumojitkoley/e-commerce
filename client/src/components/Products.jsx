import React, { useContext, useEffect, useState } from 'react'
import { FaCartPlus } from "react-icons/fa";
import './Products.css'
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products = () => {

  const [products, setProducts] = useState([]);
  let {addItem, categorySelector, productShowHandler} = useContext(ShopContext)
  
  useEffect(() => {
    async function getProducts() {
      try {
        if(categorySelector == 0) {
          let categoryApi = await fetch('https://api.escuelajs.co/api/v1/products');
          let data = await categoryApi.json();
          setProducts(data)
        }
        else {
          let categoryApi = await fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=${categorySelector}`);
          let data = await categoryApi.json();
          setProducts(data)
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    getProducts();
  }, [categorySelector]);

  function notify(title) {
    toast.success(`${title} added to the Cart`, {
      position: "bottom-right"
    });
  }

  return (
    <div className='products-main-div'>
      <div className="products-title">
        <h1>Choose from Range of Products</h1>
      </div>
      <div className='products-part'>
        {
          products.map((eachProduct) => (
            <Link key={eachProduct.id} to={`/product/${eachProduct.id}`}>
            <div className='each-products' onClick={() => productShowHandler(eachProduct.id)}>
              <div className="products-img">
                <img src={eachProduct.images[0]} alt="" />
              </div>
              <p>{eachProduct.title}</p>
              <div className='each-product-p-c'>
                <p>${eachProduct.price}</p>
                <FaCartPlus className='cart-btn' size={30} onClick={()=> {addItem(eachProduct.id), notify(eachProduct.title)} }  color='blue'/>
              </div>
            </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Products