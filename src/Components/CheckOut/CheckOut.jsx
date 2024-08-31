import React, { useState } from 'react'
import styles from './CheckOut.module.css'
import * as Yup from 'yup';
import { useFormik } from 'formik'
import { useContext } from 'react';
import { cartContext } from '../../Context/CartContext';
import { Helmet } from 'react-helmet';

export default function CheckOut() {

   let {payment} = useContext(cartContext)
   let [loading , setLoading] = useState(false);

  async function onlinePayment(values) {
    setLoading(true)
  let {data} = await payment(values)
  window.location.href = data.session.url
  }

  
  let validationSchema = Yup.object({
    details : Yup.string().min(3,"* Details is too Short")
    .max(50, '* Details Must be 50 characters or less')
    .required('* Details is Required'),
    phone :Yup.string().matches(/^01[0125][0-9]{8}$/,"* invalid phone").required("* Phone is Required"),
    city : Yup.string().min(3,"* Name is too Short")
    .max(15, '* Name Must be 15 characters or less')
    .required('* Name is Required'),
  })

  let formik = useFormik({
    initialValues:{
      "details": "",
      "phone": "",
      "city": ""
    },
    validationSchema,
    onSubmit:onlinePayment,

  })


  return (

    <>
  <Helmet>
  <title>Payment</title>
  </Helmet>

    <section className="py-5 mx-auto container rounded-3 border p-3 marginTop">
      <h2 className='mb-3 text-center text-main p-3 fw-bolder'>Check out</h2>
      <form onSubmit={formik.handleSubmit} >
        <div className="form-group p-2">
          <label className='p-2' htmlFor="details">Details</label>
          <input type="text" className=' form-control' name='details' id='details' value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Details'/>
          {formik.errors.details && formik.touched.details ? (
          <p className='text-danger mt-1'>{formik.errors.details}</p>
        ):null}
        </div>
        <div className="form-group p-2">
          <label className='p-2' htmlFor="phone">Phone</label>
          <input type="text" className=' form-control' name='phone' id='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Phone' />
          {formik.errors.phone && formik.touched.phone ? (
          <p className='text-danger mt-1'>{formik.errors.phone}</p>
        ):null}
        </div>
        <div className="form-group p-2">
          <label className='p-2' htmlFor="details">city</label>
          <input type="text" className=' form-control' name='city' id='city' value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='City' />
          {formik.errors.city && formik.touched.city ? (
          <p className='text-danger mt-1'>{formik.errors.city}</p>
        ):null}
        </div>
            <button disabled={!(formik.dirty && formik.isValid)} className='btn bg-main w-100 text-white mt-4'>
            {loading ? <i className='fa fa-spinner fa-spin'></i> : "Pay Now"}
            </button>
      </form>
    </section>
    </>
  )
}
