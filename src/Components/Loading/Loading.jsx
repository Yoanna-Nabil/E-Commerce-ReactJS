import React from 'react'
import { HashLoader } from 'react-spinners'

export default function Loading() {
  return (
    <>
    <div className="vh-100 py-5 d-flex justify-content-center align-items-center">
    <HashLoader color="#36d7b7"/>
    {/* loading.... */}
    </div>
    
    
    </>
  )
}
