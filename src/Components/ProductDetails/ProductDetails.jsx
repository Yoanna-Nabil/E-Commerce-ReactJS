import React, { useContext, useEffect, useState } from 'react'
import styles from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Loading from '../Loading/Loading';
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';
import { washlist } from '../../Context/Washlist';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {
  let [loading , setLoading] = useState(true)
  let [productDetails , setProductDetails] = useState({})
  let [addLoading , setAddLoading] = useState(false)
  let {addToCart , setCounter} = useContext(cartContext)
  let {addToWashlist  , removeToWashlist , setWashCount} = useContext(washlist)

  async function washList(id) {
    let {data} = await addToWashlist(id)
    if (data.status == 'success') {
      toast.success(data.message)
    }
  }


  async function removeWashList(id) {
    let {data} = await removeToWashlist(id)
    if (data.status == 'success') {
      toast.success(data.message)
    }
  }

  let x = useParams();

  async function getProductDetails() {
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${x.id}`)
    setProductDetails(data.data)
    setLoading(false)
  }

    useEffect(()=>{
      getProductDetails();
    },[])


    async  function addProductCart(id) {
      setAddLoading(true)
       let data = await addToCart(id)
       if (data.status =='success') {
        setAddLoading(false)
          setCounter(data.numOfCartItems)
          toast.success('add to cart success')
       }
      }


  return (
    <>
    <Helmet>
  <title>{productDetails?.category?.name}</title>
  </Helmet>
    {loading ? <Loading/> : null}
    
    <div className="container py-3 my-5 bg-main-light ">
      <div className="row gy-3 gx-1">
        <div className="col-md-4">
          <img src={productDetails.imageCover} className='w-100' alt="image Cover" />
        </div>
        <div className="col-md-8 d-flex justify-content-center align-items-center position-relative">
        <i className={`fa-regular fa-heart heart cursor-pointer`} onClick={(e)=>{

if (e.target.classList.contains('fa-regular')) {
  washList(productDetails._id);
      e.target.classList.remove('fa-regular')
      e.target.classList.add('fa-solid')
  
}else if (e.target.classList.contains('fa-solid')) {
  removeWashList(productDetails._id)
  e.target.classList.add('fa-regular')
  e.target.classList.remove('fa-solid')
}
}}
></i>
          <div className="info">
          <h2 className='mb-3'>{productDetails.title}</h2>
          <p className='mb-3'>{productDetails.description}</p>
          <h4 className='mb-3'>{productDetails.category?.name}</h4>
          
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>{productDetails.price} EGP</h3>
            <span className='h4'>
            <i className="fa-solid fa-star rating-color"></i>
            {productDetails.ratingsAverage}
            </span>
          </div>
          <button className='btn bg-main w-100 text-white' onClick={()=>addProductCart(productDetails._id)}>{addLoading ? "loading ..." : "+ Add to Cart"}</button>
          </div>

        </div>
      </div>
    </div>
    
    
    </>
  )
}
