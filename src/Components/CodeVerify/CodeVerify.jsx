import React, { useState } from 'react'
import styles from './CodeVerify.module.css'
import logo from '../../assets/images/freshcart-logo.svg'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function CodeVerify() {
  let navigate = useNavigate()
  let [loading , setIsLoading] = useState(false)
  let [errorMessage , setErrorMessage] = useState("")



  async function verifyCode(resetCode) {
    setIsLoading(true)
    let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',resetCode)
    .catch(err =>{
      setIsLoading(false)
      setErrorMessage(err.response.data.message)})
  if (data.status == 'Success') {
    navigate('/resetPassword')
  }
  }
  


  let formik = useFormik({
    initialValues:{
      resetCode : "",
    },
    onSubmit:verifyCode,
  })



  return (
    <>
    <Helmet>
  <title>Repassword</title>
  </Helmet>
    <section className='py-5 mx-auto container rounded-3 border px-3 marginTop'>
    <div className=' text-center mb-3 h1'><img width={400} src={logo} alt="logo" /></div>
    {errorMessage ? <div className='text-center text-danger'> * {errorMessage}</div> : null}
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group p-2">
          <label htmlFor="code" className='text-main mb-2 fw-bolder p-2 text-capitalize'>please enter your verification code </label>
          <input type="text" id='code' name='resetCode' className=' form-control' placeholder='######' value={formik.values.resetCode} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        </div>
        <button disabled={! (formik.isValid && formik.dirty)} className='btn bg-main text-white ms-3 px-3 fw-bolder mt-2'>{loading ? <i className='fa fa-spinner fa-spin'></i> : "Verify"}</button>
      </form>
    </section>
    
    </>
  )
}
