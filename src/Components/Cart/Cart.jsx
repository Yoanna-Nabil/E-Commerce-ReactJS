import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css'
import { cartContext } from '../../Context/CartContext'
import Loading from '../Loading/Loading'
import { Link } from 'react-router-dom'
import img1 from '../../assets/images/empty-cart.png'
import { Helmet } from 'react-helmet'

export default function Cart() {
  let [cart , setCart ] = useState(null)
  let [loadig , setLoading ] = useState(true)
  let {getCart , deleteCart , setCounter , updateCart ,setId} = useContext(cartContext)

  
  async function getAllcart() {
    let data = await getCart()
    if (data?.status == 'success') {
      setCart(data)
      setLoading(false)
      setId(data?.data?._id)
    }

  }

  useEffect (()=>{
    getAllcart()
  })

  async function deleteProduct(id) {
    let data = await deleteCart(id)
    if (data?.status == 'success') {
      setCounter(data?.numOfCartItems)
      setCart(data)
    }
  }


  async function updateCartQyantitiy(id , count) {
    let data = updateCart(id , count)
    if (data.status == 'success') {
      setCounter(data.numOfCartItems)
      setCart(data)
    }
  }

  if (cart?.numOfCartItems == 0 || !cart ) return <div className='container NoItem pt-5 mt-5 d-flex justify-content-center align-items-center'> <img src={img1} className=' w-100 noItem' alt="no item" /></div>

  
  return (
    <>
    <Helmet>
  <title>Cart</title>
  </Helmet>
    {loadig ? <Loading/> : null}
    <div className="container bg-main-light marginTop p-4 rounded-3">
        <h2 className=' text-capitalize'>shop cart :</h2>
        <div className="d-flex justify-content-between align-items-center">
        <p className='text-main text-capitalize fw-bolder h5'>total price : {cart?.data?.totalCartPrice} EGP</p>
        <Link to={'/checkOut'} className='btn bg-main text-white'>Check Out</Link>
        </div>
        {cart?.data?.products.map(item => {
          return <div className="row py-2 border-bottom " key={item._id}>
          <div className="col-md-1">
            <div className="img">
              <img src={item.product.imageCover} className='w-100' alt={item.product.title} />
            </div>
          </div>
          <div className="col-md-11">
            <div className="info d-flex justify-content-between align-items-center">
              <div className="text py-2">
                <p className=' p-0 m-0'>{item.product.title}</p>
                <p className='text-main p-0 my-1 fw-bold'>price : {item.price}</p>
                <button className='btn p-0 mt-2 ' onClick={()=>deleteProduct(item.product._id)}> 
                <i className="fa-solid fa-trash me-2 text-danger"></i>
                  Remove</button>
              </div>
              <div className="button py-2">
                <button className='btn btn-outline-success ' onClick={()=>updateCartQyantitiy(item.product._id , item.count +1)}>+</button>
                <span className=' p-3'>{item.count}</span>
                <button className='btn btn-outline-success' disabled= {item.count <=1} onClick={()=>updateCartQyantitiy(item.product._id , item.count -1)}>-</button>
              </div>
            </div>
          </div>
        </div>
        })}

    </div>
    
    
    </>
  )
}
