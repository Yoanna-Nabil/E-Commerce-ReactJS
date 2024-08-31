import React, { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import styles from './Allorders.module.css'
import axios from 'axios';
import Loading from '../Loading/Loading';

export default function Allorders() {

  const [orders , setOrders] = useState([])
  const [loading , setLoading] = useState(false)

  async function allOrders(id) {
    setLoading(true)
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
    setOrders(data)
    setLoading(false)
  }

  useEffect(()=>{
    const {id} = jwtDecode(localStorage.getItem('userToken'));
    allOrders(id)
  },[])

  
  return (
    <>
    {loading? <Loading/> : null}
    <div className="container  py-5 ">
      <h2 className='text-center bg-main text-white rounded-4 py-3 fw-bolder text-capitalize mb-4'>your all orders</h2>
        {orders.map(item => {
          return <div className=" bg-main-light p-3 mb-5 row order rounded-3" key={item.id}>
            <div className="info">
              <h2 className=' fw-bolder'>#{item.id}</h2>
              <p>Count of Orders : <span className='text-main fw-bolder'>{item.cartItems.length}</span></p>
            </div>
            <div className="row gy-3 gx-1" >
            {item.cartItems.map(cart =>{
                return <div className="col-md-2 mb-3  " key={cart._id}>
                  <img src={cart.product.imageCover} alt="image" width={100} />
                </div>
              
            })}
            </div>  
            <hr />
            <h3 className=' text-capitalize'>total price : <span className=' text-main fw-bolder'> {item.totalOrderPrice} EGP</span></h3>
          </div>
        })}


    </div>
    </>
  )
}
