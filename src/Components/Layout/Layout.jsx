import React from 'react'
import styles from './Layout.module.css'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { Offline, Online } from "react-detect-offline";

export default function Layout() {
  return (
    <>

      <NavBar/>

      <div className="mainStyle">

      <Outlet/>
      </div>
      
      <div>
    <Offline> 
      <div className="offline">
      <i className="fa-solid fa-wifi"></i> No Internet Connection
      </div>
      </Offline>
  </div>
      <Footer/>
    
    </>
  )
}
