import React, { useContext, useState, useEffect } from 'react'
import Navbar from './Navbar'
import './ShowProduct.css'
import { ShopContext } from '../context/ShopContext'
import { ToastContainer, toast } from 'react-toastify';

const ShowProduct = () => {

  let { addItem, currentProductId, productShowHandler } = useContext(ShopContext)

  const [currentProductData, setCurrentProductData] = useState([])
  const [productImages, setProductImages] = useState([])
  const [currentImage, setCurrentImage] = useState([]);

  useEffect(() => {
    async function getProducts() {
      try {
        let CurrentProductApi = await fetch(`https://api.escuelajs.co/api/v1/products/${currentProductId}`);
        let data = await CurrentProductApi.json();
        setCurrentProductData(data)
        setProductImages(data.images)
        setCurrentImage(data.images[0])
      }
      catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    getProducts();
  }, [currentProductId]);

  function CurrentImageHandler(idx) {
    setCurrentImage(productImages[idx])
  }

  function notify(title) {
    toast.success(`${title} added to the Cart`, {
      position: "bottom-right"
    });
  }

  return (
    <>
      <Navbar />
      <div className='show-product-main-div'>
        <div className="show-product-image-part">
          <div className="side-image">
            {
              productImages.map((image, idx) => (
                <div key={idx} className='side-each-image' onClick={() => CurrentImageHandler(idx)}>
                  <img src={image} alt="" />
                </div>
              ))
            }
          </div>
          <div className="show-product-main-image">
            <img src={currentImage} alt="" />
          </div>
        </div>
        <div className="show-product-name-desc-part">
          <h1>{currentProductData.title}</h1>
          <h3>{currentProductData.price}$</h3>
          <p>{currentProductData.description}</p>
          <div className="show-product-buttons">
            <button onClick={()=> {addItem(currentProductData.id), notify(currentProductData.title)} }>add to cart</button>
            <button>Buy Now</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ShowProduct