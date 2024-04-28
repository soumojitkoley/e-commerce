import React, { useEffect, useState } from 'react'
import './Category.css'

const Category = () => {

  const [catgory, setCategory] = useState([]);

  useEffect(() => {
    async function getCategory() {
      try {
        let categoryApi = await fetch('https://api.escuelajs.co/api/v1/categories');
        let data = await categoryApi.json();

        let filterData = data.filter((eachData) => eachData.id <=5 )
        setCategory(filterData);
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
      {
        catgory.map((eachCategory) => (
          <div key={eachCategory.id} className='each-category'>
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