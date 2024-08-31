import React, { useContext, useState } from 'react'
import styles from './ResetPassword.module.css'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import logo from '../../assets/images/freshcart-logo.svg'
import { tokenContext } from '../../Context/TokenContext';
import { Helmet } from 'react-helmet';


export default function ResetPassword() {
  let [errorMessage , setErrorMessage] = useState("")
  let [loading , setIsLoading] = useState(false)
  let {setToken} = useContext(tokenContext)
  let navigate = useNavigate()

  async function passwordReset(form) {
    setIsLoading(true)
    setErrorMessage("")
    let {data} = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',form)
    .catch(err =>{
      setIsLoading(false)
    setErrorMessage(err.response.data.message)
    } )

  if (data.token) {
    localStorage.setItem("userToken" , data.token)
    setToken(data.token)
    navigate('/')
  }
  }
  
  const validationSchema = Yup.object({
    email : Yup.string().email('* Invalid email address').required('* Email is Required'),
    newPassword : Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/,"* invalid Password").required("* password is Required"),
  });

  let loginForm = useFormik({
    initialValues:{
      email : "",
      newPassword : "",
    },
    onSubmit:passwordReset,
    validationSchema,
  })


  return (
    <>
    <Helmet>
  <title>Repassword</title>
  </Helmet>
    <section className='py-5 mx-auto container rounded-3 border p-3 marginTop'>
      <div className=' text-center mb-3 h1'><img width={400} src={logo} alt="logo" /></div>
    <h2 className='mb-3 fw-bolder h3 text-main h4'>Reset Password</h2>
    {errorMessage ? <div className='text-center text-danger'> * {errorMessage}</div> : null}
    <form onSubmit={loginForm.handleSubmit}>
      <div className=" form-group mb-3">
        <label htmlFor="Email" className='mb-2 fw-bolder'>Email</label>
        <input type="email" id='Email' name='email' value={loginForm.values.email} className='form-control' placeholder='Enter your Email ' onChange={loginForm.handleChange} onBlur={loginForm.handleBlur} />
        {loginForm.errors.email && loginForm.touched.email ? (
          <p className='text-danger mt-1'>{loginForm.errors.email}</p>
        ):null}
      </div>
      <div className=" form-group mb-3">
        <label htmlFor="newPassword" className='mb-2 fw-bolder'>NewPassword</label>
        <input type="password" id='newPassword' name='newPassword' value={loginForm.values.newPassword} className='form-control' placeholder='Enter your newPassword' onChange={loginForm.handleChange} onBlur={loginForm.handleBlur} />
        {loginForm.errors.newPassword && loginForm.touched.newPassword ? (
          <p className='text-danger mt-1'>{loginForm.errors.newPassword}</p>
        ):null}
      </div>
      <button className='d-block m-auto btn btn-success px-3 mt-3' disabled={!(loginForm.isValid && loginForm.dirty)}>
      {loading ? <i className='fa fa-spinner fa-spin'></i> : "Verify"}
      </button>
    </form>
    </section>
    
    </>
  )
}
