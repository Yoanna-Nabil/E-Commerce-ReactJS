import React from 'react'
import styles from './Categories.module.css'
import { useQuery } from 'react-query'
import axios from 'axios'
import Loading from '../Loading/Loading'
import { Helmet } from 'react-helmet'

export default function Categories() {

  function getAllCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  }

  let {data , isLoading} = useQuery('getAllCategories' , getAllCategories)

  return (
    <>
    <Helmet>
  <title>Categories</title>
  </Helmet>
    <div className="container py-3">
    {isLoading? <Loading/> : null}
      <h2 className='mb-3 text-main fw-bolder text-center h1'>Categories</h2>
      <div className="row gy-3">
        {data?.data?.data.map(ele=>{
          return <div className="col-md-3 text-center p-3"  key={ele._id}>
            <div className="category card rounded-4 overflow-hidden cursor-pointer product">
              <img src={ele.image} className='w-100 mb-3' height={300} alt="category image" />
              <h2 className='h4 p-2'>{ele.name}</h2>
            </div>
          </div>
        })}
      </div>
    </div>

    
    </>
  )
}
