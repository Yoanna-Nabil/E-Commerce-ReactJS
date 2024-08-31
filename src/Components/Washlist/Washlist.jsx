import React, { useContext, useEffect, useState } from 'react'
import styles from './Washlist.module.css'
import { washlist } from '../../Context/Washlist'
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';
import img1 from '../../assets/images/empty-cart.png'
import { Helmet } from 'react-helmet';

export default function Washlist() {

  let {getWashlist , removeToWashlist ,setWashlist ,washlistArr } = useContext(washlist);
  let {addToCart , setCounter} = useContext(cartContext);
  let [loading, setAddLoading] = useState(false)

  async function getAllWashlist() {
    let {data} = await getWashlist();
    if (data.status == 'success') {
      setWashlist(data?.data)
    }
  }
  useEffect(()=>{
    getAllWashlist();
  },[])

  async  function addProductCart(id) {
    setAddLoading(true)
     let data = await addToCart(id)
     if (data.status =='success') {
      setAddLoading(false)
        setCounter(data.numOfCartItems)
        toast.success('add to cart success')
     }
     getAllWashlist();
    }

    async function removeWashList(id) {
      setAddLoading(true)
      let {data} = await removeToWashlist(id)
      if (data.status == 'success') {
        setAddLoading(false)
        getAllWashlist();
      }
    }

    if (washlistArr?.length == 0) return (<div className=' pt-5 mt-5 NoItem d-flex justify-content-center align-items-center'> <img src={img1} className=' w-100' alt="no item" /></div>)


  return (
    <>
    <Helmet>
  <title>Wash List</title>
  </Helmet>
    <div className="container py-5 marginTop bg-main-light rounded-3">
      <h2 className=' text-main fw-bolder text-center mb-3 border-bottom pb-3'>Wash List</h2>
      {washlistArr?.map((wash)=>{
        return <div className="row border-bottom gy-2 mb-2 p-3" key={wash._id} >
          <div className="col-md-2">
            <img src={wash.imageCover} className=' w-100' alt="" />
          </div>
          <div className="col-md-10 d-flex justify-content-between align-items-center">
            <div className="info">
              <h3 className=' fw-bolder'>{wash.brand.name}</h3>
              <p className='text-main fw-bolder mb-1'>{wash.price} EGP</p>
              <button className='btn p-0 text-danger ' onClick={()=>{removeWashList(wash._id)}}> 
                <i className="fa-solid fa-trash me-2 text-danger"></i>
                remove</button>
            </div>
            <div className="addCart">
              <button className='btn bg-main text-white fw-bolder' disabled={loading} onClick={()=>{addProductCart(wash._id) 
                 removeWashList(wash._id)}}>Add to Cart</button>
            </div>
          </div>
        </div>
      })}
    </div>
    </>
    
  )
}
