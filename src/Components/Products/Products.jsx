import React, { useContext, useEffect, useState } from 'react'
import styles from './Products.module.css'
import axios from 'axios'
import Loading from '../Loading/Loading'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext'
import {  toast } from 'react-toastify';
import { washlist } from '../../Context/Washlist'
import { Helmet } from 'react-helmet'


export default function Products() {
  let [addLoading , setAddLoading] = useState(false)
  let [search , setSearch] = useState('')
  let {addToCart , setCounter} = useContext(cartContext)
  let {addToWashlist  , removeToWashlist  } = useContext(washlist)

  function getProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }
  let {data , isLoading} = useQuery("getProducts" , getProducts);

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

async  function addProductCart(id) {
  setAddLoading(true)
   let data = await addToCart(id)
   if (data.status =='success') {
    setAddLoading(false)
      setCounter(data.numOfCartItems)
      toast.success('add to cart success')
   }
  }

    const filteredData = data?.data?.data.filter((item)=>item.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
    <Helmet>
  <title>Products</title>
  </Helmet>
    {isLoading? <Loading/> : 
    <div className="container py-3">
    <h2 className='mb-4 text-main fw-bolder text-center h1'>Products</h2>
    <input type="text" className=' form-control mb-4' placeholder='Search' onChange={(e)=> setSearch(e.target.value)} />
    <div className="row gy-3">
      {filteredData.map(ele=>{
        return <div className="col-md-2" key={ele._id}>
        <div className="product cursor-pointer rounded-3 p-2 h-100 text-center overflow-hidden position-relative">
        <i className={`fa-regular fa-heart heart`} onClick={(e)=>{
          if (e.target.classList.contains('fa-regular')) {
            washList(ele._id);
                e.target.classList.remove('fa-regular')
                e.target.classList.add('fa-solid')
          }else if (e.target.classList.contains('fa-solid')) {
            removeWashList(ele._id)
            e.target.classList.add('fa-regular')
            e.target.classList.remove('fa-solid')
          }
          }}
          ></i>
        
          <Link to={'/productDetails/'+ ele._id}> 
          <div className="item">
          <img src={ele.imageCover} className='w-100  mb-2' alt="product" />
          <h2 className='text-main h6'>{ele.category.name}</h2>
          <p>{ele.title.split(' ').splice(0,2.).join(' ')}</p>
          <div className="d-flex justify-content-between align-items-center">
            <p className='h6'>{ele.price} EGP</p>
            <span>
            <i className="fa-solid fa-star rating-color"></i>
            {ele.ratingsAverage}
            </span>
          </div>
          </div>
          </Link>
          <button className='btn bg-main w-100 text-white' disabled={addLoading} onClick={()=>addProductCart(ele._id)}>
            {addLoading ? "Loading ..." :"Add to Cart"}
            </button>
        </div>
      </div>
      })}
      
    </div>
  </div>
    }
    
    </>
  )
}
