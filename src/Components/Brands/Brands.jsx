import React from 'react'
import styles from './Brands.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import Loading from '../Loading/Loading'
import { Helmet } from 'react-helmet'

export default function Brands() {

  async function getBrands() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }

  let {data , isLoading}  =useQuery("barand", getBrands)


  return (
    <>
    <Helmet>
  <title>Brands</title>
  </Helmet>
    <div className="container py-3">
    {isLoading? <Loading/> : null}
      <h2 className=' text-center text-main mb-4 fw-bolder h1'>All Brands</h2>
      <div className="row gy-3">
        {data?.data?.data.map((brand)=>{
          return <div className="col-md-3" key={brand._id}>
          <div className="brands text-center card cursor-pointer p-2">
            <img src={brand.image} className='w-100' alt={brand.name} />
            <h3>{brand.name}</h3>
          </div>
        </div>
        })}
      </div>
    </div>
    
    </>
  )
}
