import React, { useContext, useEffect, useState } from 'react'
import './Category.css'
import { ShopContext } from '../context/ShopContext';

const Category = () => {

  const [catgory, setCategory] = useState([]);

  let {categoryChangeHandler} = useContext(ShopContext)

  useEffect(() => {
    async function getCategory() {
      try {
        let categoryApi = await fetch('https://api.escuelajs.co/api/v1/categories');
        let data = await categoryApi.json();
        setCategory(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
  
    getCategory();
  }, []);
  

  return (
    <div className='category-main-div'>
      <div className="category-title">
        <h1>Choose from Range of Categories</h1>
      </div>
      <div className='category-part'>
      <div  className='each-category' onClick={() => categoryChangeHandler(0)}>
            <div className="category-img">
              <img src='' alt="" />
            </div>
            <p>All</p>
          </div>
      {
        catgory.map((eachCategory) => (
          <div key={eachCategory.id} className='each-category' onClick={() => categoryChangeHandler(eachCategory.id)}>
            <div className="category-img">
              <img src={eachCategory.image} alt="" />
            </div>
            <p>{eachCategory.name}</p>
          </div>
        ))
      }
      </div>
    </div>
  )
}

export default Category