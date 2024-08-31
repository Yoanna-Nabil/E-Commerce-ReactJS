import React from 'react'
import styles from './Footer.module.css'
import amazon from '../../assets/images/amazon.png'
import paypal from '../../assets/images/PayPal.png'
import master from '../../assets/images/masterCard.png'

export default function Footer() {
  return (
    <>
    <footer className='py-4 bg-main-light  text-white'>

      <div className="container">
      <h2 className='text-capitalize h4 text-black' >get the fresh cart app</h2>
      <p className='text-capitalize text-muted'>we will send you a link, open it on your phone to download the app</p>
      <div className="row">
        <div className="col-md-10">
        <input type="text" className='form-control mb-3'placeholder='Email ...' />
        </div>
        <div className="col-md-2">
        <button className='btn bg-main text-white w-100'>Share App Link</button>
        </div>
      </div>
      

      <div className={`payment d-flex ${styles.border} py-2`}>
        <p className='me-3 text-capitalize text-black my-0'>payment partner</p>
          <div className="img">
          <img src={amazon} className={`${styles.imageWidth} mx-2 `} alt="amazon logo" />
          <img src={paypal}  className={`${styles.imageWidth} mx-2 `} alt="paypal logo" />
          <img src={master}  className={`${styles.imageWidth} mx-2 `} alt="master card logo" />
          </div>

      </div>
      </div>
    </footer>
    </>
  )
}
