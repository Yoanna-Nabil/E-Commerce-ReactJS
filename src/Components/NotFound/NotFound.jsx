import React from 'react'
import styles from './NotFound.module.css'
import notFount from '../../assets/images/notfound.png'
import { Helmet } from 'react-helmet'

export default function NotFound() {
  return ( 
  <>
  <Helmet>
  <title>Not Found</title>
  </Helmet>
    <section className="container p-3 text-center">
      <img src={notFount} alt="not foung logo"className='w-100' />
    </section>
     </>
  )
 
}
