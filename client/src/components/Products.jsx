import React, { useContext, useEffect, useState } from 'react'
import { FaCartPlus } from "react-icons/fa";
import './Products.css'
import { ShopContext } from '../context/ShopContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products = () => {

  const [products, setProducts] = useState([]);
  let {addItem} = useContext(ShopContext)
  
  useEffect(() => {
    async function getProducts() {
      try {
        let categoryApi = await fetch('https://api.escuelajs.co/api/v1/products');
        let data = await categoryApi.json();

        // let filterData = data.filter((eachData) => eachData.id <= 48)
        setProducts(data)
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    getProducts();
  }, []);

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
            <div key={eachProduct.id} className='each-products'>
              <div className="products-img">
                <img src={eachProduct.images[0]} alt="" />
              </div>
              <p>{eachProduct.title}</p>
              <div className='each-product-p-c'>
                <p>${eachProduct.price}</p>
                <FaCartPlus className='cart-btn' size={30} onClick={()=> {addItem(eachProduct.id), notify(eachProduct.title)} }  color='blue'/>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Products