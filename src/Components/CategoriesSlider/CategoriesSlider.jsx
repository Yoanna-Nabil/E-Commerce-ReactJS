import React, { useEffect, useState } from 'react'
import styles from './CategoriesSlider.module.css'
import axios from 'axios'
import Slider from 'react-slick';

export default function CategoriesSlider() {

  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 4,
    autoplay : true ,
    autoplaySpeed : 1500 ,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };

  let [categories , setCategories] = useState([]);

  async  function getCategories() {
    let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    setCategories(data.data)
  }

  useEffect(()=>{

    getCategories()

  },[])




  return (
    <>
    
    <div className="container py-3 overflow-hidden">
      <h2 className='mb-3 text-main fw-bolder'>Categories : </h2>
      <div className="item">
        <Slider  {...settings}>
          {categories.map(ele => 
            <div className="category text-center px-1" key={ele._id}>
              <img src={ele.image} className='w-100 mb-2' height={200} alt="image" />
              <h6>{ele.name}</h6>
            </div>
            )}
        </Slider>

      </div>
    </div>
    
    </>
  )
}
