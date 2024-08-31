import React, { useState } from 'react'
import styles from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/freshcart-logo.svg'
import { Helmet } from 'react-helmet';

export default function Register() {
  let navigate = useNavigate()
  let [errorMessage , setErrorMessage] = useState("")
  let [loading , setIsLoading] = useState(false)

  async function callRegister (form) {
    setIsLoading(true)
    setErrorMessage("")
    let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',form)
    .catch(error =>{
      setIsLoading(false)
      setErrorMessage(error.response.data.message)});
    if (data.message == "success") {
      navigate('/login')
    }
  }


  const validationSchema = Yup.object({
    name : Yup.string().min(3,"* Name is too Short")
    .max(15, '* Name Must be 15 characters or less')
    .required('* Name is Required'),
    email : Yup.string().email('* Invalid email address').required('* Email is Required'),
    password : Yup.string().matches(/^[A-Z][a-z0-9]{3,10}$/,"* invalid Password (start with Capitalize)").required("* password is Required"),
    rePassword : Yup.string().oneOf([Yup.ref('password')],"* Password Not the Same").required("* password is Required"),
    phone :Yup.string().matches(/^01[0125][0-9]{8}$/,"* invalid phone").required("* Phone is Required"),
  });

  const registerForm= useFormik({
      initialValues:{
        name : "",
        email : "",
        password : "",
        rePassword : "",
        phone : "",
      },
      validationSchema ,
      onSubmit : callRegister, 
    },
  )


  return (
    <>
    <Helmet>
  <title>Signup</title>
  </Helmet>
    <section className='py-5 mt-5 mx-auto container rounded-3 border p-3 marginTop'>
    <div className=' text-center mb-3 h1'><img width={400} src={logo} alt="logo" /></div>
    <h2 className='mb-3 fw-bolder h3 text-main'>Register Now :</h2>
    {errorMessage ? <div className='text-center text-danger'> * {errorMessage}</div> : null}
    <form onSubmit={registerForm.handleSubmit}>
      <div className=" form-group mb-3">
        <label htmlFor="Name" className='mb-2'>Full Name</label>
        <input type="text" id='Name' name='name' value={registerForm.values.name} className='form-control' placeholder='Enter your Name' onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} />
        {registerForm.errors.name && registerForm.touched.name ? (
          <p className='text-danger mt-1'>{registerForm.errors.name}</p>
        ):null}
      </div>
      <div className=" form-group mb-3">
        <label htmlFor="Email" className='mb-2'>Email</label>
        <input type="email" id='Email' name='email' value={registerForm.values.email} className='form-control' placeholder='Enter your Email ' onChange={registerForm.handleChange} />
        {registerForm.errors.email && registerForm.touched.email ? (
          <p className='text-danger mt-1'>{registerForm.errors.email}</p>
        ):null}
      </div>
      <div className=" form-group mb-3">
        <label htmlFor="Password" className='mb-2'>Password</label>
        <input type="password" id='Password' name='password' value={registerForm.values.password} className='form-control' placeholder='Enter your Password' onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} />
        {registerForm.errors.password && registerForm.touched.password ? (
          <p className='text-danger mt-1'>{registerForm.errors.password}</p>
        ):null}
      </div>
      <div className=" form-group mb-3">
        <label htmlFor="rePassword" className='mb-2'>repassword</label>
        <input type="password" id='rePassword' name='rePassword' value={registerForm.values.rePassword} className='form-control' placeholder='re-password' onChange={registerForm.handleChange} onBlur={registerForm.handleBlur}/>
        {registerForm.errors.rePassword && registerForm.touched.rePassword ? (
          <p className='text-danger mt-1'>{registerForm.errors.rePassword}</p>
        ):null}
      </div>
      <div className=" form-group">
        <label htmlFor="Phone" className='mb-2'>your Phone</label>
        <input type="tel" id='Phone' name='phone' value={registerForm.values.phone} className='form-control' placeholder='Enter your Phone' onChange={registerForm.handleChange} onBlur={registerForm.handleBlur}/>
        {registerForm.errors.phone && registerForm.touched.phone ? (
          <p className='text-danger mt-1'>{registerForm.errors.phone}</p>
        ):null}
      </div>
      <button className='d-block ms-auto btn btn-success mt-3' disabled={! (registerForm.isValid && registerForm.dirty)}>
      {loading ? <i className='fa fa-spinner fa-spin'></i> : "Submit"}
      </button>
    </form>
    </section>
    
    </>
  )
}
