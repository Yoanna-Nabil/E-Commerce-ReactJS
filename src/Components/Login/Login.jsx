import React, { useContext, useState } from 'react'
import styles from './Login.module.css'
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import { tokenContext } from '../../Context/TokenContext';
import logo from '../../assets/images/freshcart-logo.svg'
import { Helmet } from 'react-helmet';



export default function Login() {
  let navigate = useNavigate()
  let [errorMessage , setErrorMessage] = useState("")
  let [loading , setIsLoading] = useState(false)
  let {setToken} = useContext(tokenContext)


  async function callLogin (form) {
    setIsLoading(true)
    setErrorMessage("")
    let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',form)
    .catch(error =>{
      setIsLoading(false)
      setErrorMessage(error.response.data.message)});
    if (data.message == "success") {
      localStorage.setItem("userToken" , data.token)
      setToken(data.token)
      navigate('/')
    }
  }


  const validationSchema = Yup.object({
    email : Yup.string().email('* Invalid email address').required('* Email is Required'),
    password : Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/,"* invalid Password").required("* password is Required"),
  });

  const loginForm= useFormik({
      initialValues:{
        email : "",
        password : "",
      },
      validationSchema ,
      onSubmit : callLogin, 
    },
  )


    async function frogetPassword(email) {
      let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', {email});
      if (data.statusMsg == 'success') {
        navigate('/codeverify')
      }
    }



  return (
    <>

<Helmet>
  <title>Login</title>
  </Helmet>

    <section className='py-5 mx-auto container rounded-3 border p-3 marginTop'>
      <div className=' text-center mb-3 h1'><img width={400} src={logo} alt="logo" /></div>
    <h2 className='mb-3 fw-bolder h3 text-main'>Login Now :</h2>
    {errorMessage ? <div className='text-center text-danger'> * {errorMessage}</div> : null}
    <form onSubmit={loginForm.handleSubmit}>
      <div className=" form-group mb-3">
        <label htmlFor="Email" className='mb-2 fw-bolder'>Email</label>
        <input type="email" id='Email' name='email' value={loginForm.values.email} className='form-control' placeholder='Enter your Email ' onChange={loginForm.handleChange} />
        {loginForm.errors.email && loginForm.touched.email ? (
          <p className='text-danger mt-1'>{loginForm.errors.email}</p>
        ):null}
      </div>
      <div className=" form-group mb-3">
        <label htmlFor="Password" className='mb-2 fw-bolder'>Password</label>
        <input type="password" id='Password' name='password' value={loginForm.values.password} className='form-control' placeholder='Enter your Password' onChange={loginForm.handleChange} onBlur={loginForm.handleBlur} />
        {loginForm.errors.password && loginForm.touched.password ? (
          <p className='text-danger mt-1'>{loginForm.errors.password}</p>
        ):null}
      </div>
      <div className="lostInfo">
        <p>New to FreshCart? <Link className='newAccount' to={'/register'}>Create Account</Link></p>
        <p className='text-main fw-bolder cursor-pointer' onClick={()=>{
          if (loginForm.values.email !== '') {
            frogetPassword(loginForm.values.email)
          }
        }}>Forget Password ?</p>
      </div>
      <button className='d-block m-auto btn btn-success px-3 mt-3' disabled={! (loginForm.isValid && loginForm.dirty)}>
      {loading ? <i className='fa fa-spinner fa-spin'></i> : "Login"}
      </button>
    </form>
    </section>
    
    </>
  )
}
