import React, { useContext, useEffect } from 'react'
import styles from './NavBar.module.css'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { tokenContext } from '../../Context/TokenContext';
import logo from '../../assets/images/freshcart-logo.svg'
import { cartContext } from '../../Context/CartContext';



export default function NavBar() {

  let {counter} = useContext(cartContext)

  let {token,setToken} = useContext(tokenContext);
  let navigate = useNavigate()

  function logOut() {
    localStorage.removeItem("userToken");
    setToken(null)
    navigate("/login")
  }


  

  return (
    <>
    <nav className="navbar navbar-expand-lg bg-main-light fixed-top py-3">
  <div className="container">
    <Link className="navbar-brand" to={"/"}>
      <img src={logo} alt="logo image" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">

    {token ?
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    <li className="nav-item">
      <NavLink className="nav-link " aria-current="page"  to={'/'}>Home</NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" aria-current="page" to={'/cart'}>Cart</NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" aria-current="page" to={'/allorders'}>Orders</NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link " aria-current="page" to={'/products'}>Products</NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link " aria-current="page" to={'/categories'}>Categories</NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link " aria-current="page" to={'/brands'}>Brands</NavLink>
    </li>

  </ul> : null }

      
      <ul className='ms-auto navbar-nav align-items-center'>
      
        {token ?      <>
        
        <li className='position-relative mx-3 resMarginTop'>
        <Link to={'/washlist'}>
        <i className="fa-solid fa-heart h2 p-0 m-0 text-danger"></i>
        </Link>
        </li>

        <li className='position-relative  resMarginTop'>
        <Link to={'/cart'}>
        <i className="fa-solid fa-cart-shopping h2 p-0 m-0 "></i>
        <span className="counter rounded-3 px-2">
          {counter}
        </span>
        </Link>
        </li>
        
         <li className="nav-item resMarginTop ms-3">
          <button className=" btn btn-outline-danger " onClick={logOut}>Logout <i className="fa-solid fa-right-from-bracket"></i></button>
        </li> 
        </>
        :
        <>
         <li className="nav-item">
          <Link className="nav-link " aria-current="page" to={'/login'}>Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to={'/register'}>Register</Link>
        </li>
        </> }
     
      
      </ul>
      </div>
  </div>
</nav>

    </>

  );
}
