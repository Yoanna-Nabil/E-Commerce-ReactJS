import React from 'react'
import styles from './MainSlider.module.css'
import img1 from '../../assets/images/slider-image-1.jpeg'
import img2 from '../../assets/images/slider-image-2.jpeg'
import img3 from '../../assets/images/slider-image-3.jpeg'
import p1 from '../../assets/images/p1.webp'
import p2 from '../../assets/images/p2.png'
import p3 from '../../assets/images/p3.jpg'
import Slider from "react-slick";


export default function MainSlider() {

  let settings = {
    dots: false,
    arrows : false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay : true ,
    autoplaySpeed : 1500 ,
  };


  return (
    <>

<div className="container  overflow-hidden py-3">
      <div className="row gy-4 gx-0">
        <div className="col-md-8">
          <div className="slider">
          <Slider {...settings}>
      <img src={img1} height={400} className='w-100' alt="img1" />
      <img src={img2} height={400} className='w-100' alt="img2" />
      <img src={img3} height={400} className='w-100' alt="img3" />
      <img src={p1} height={400} className='w-100' alt="img3" />
      <img src={p2} height={400} className='w-100' alt="img3" />
      <img src={p3} height={400} className='w-100' alt="img3" />
    </Slider>
          </div>
        
        </div>
        <div className="col-md-4">
          <div className="image">
          <img src={img2} height={200} className='w-100' alt="img2" />
          <img src={img3} height={200} className='w-100' alt="img3" />
          </div>
        </div>
      </div>
    </div>
    
    
    
    </>
  )
}
