import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Products from './Components/Products/Products';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import Cart from './Components/Cart/Cart';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import NotFound from './Components/NotFound/NotFound';
import { useContext, useEffect } from 'react';
import { tokenContext } from './Context/TokenContext';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CheckOut from './Components/CheckOut/CheckOut';
import Allorders from './Components/Allorders/Allorders';
import Washlist from './Components/Washlist/Washlist';
import CodeVerify from './Components/CodeVerify/CodeVerify';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import ProtectedAuth from './Components/ProtectedAuth/ProtectedAuth';

function App() {

  let {setToken} = useContext(tokenContext)


  const routs= createHashRouter([
    {path:"/" , element: <Layout/> , children : [
      {index: true, element:  <ProtectedRoutes><Home/></ProtectedRoutes>  },
      {path: "products", element: <ProtectedRoutes><Products/></ProtectedRoutes> },
      {path: "categories", element: <ProtectedRoutes><Categories/></ProtectedRoutes> },
      {path: "brands", element: <ProtectedRoutes><Brands/></ProtectedRoutes> },
      {path: "cart", element:<ProtectedRoutes><Cart/></ProtectedRoutes>  },
      {path: "productDetails/:id", element:<ProtectedRoutes> <ProductDetails/></ProtectedRoutes>  },
      {path: "Washlist", element:<ProtectedRoutes> <Washlist/> </ProtectedRoutes>  },
      {path: "checkOut", element:<ProtectedRoutes> <CheckOut/> </ProtectedRoutes>  },
      {path: "allorders", element:<ProtectedRoutes> <Allorders/> </ProtectedRoutes>  },


      {path:"login" , element: <ProtectedAuth><Login/></ProtectedAuth>  },
      {path: "register", element:   <ProtectedAuth><Register/></ProtectedAuth>  },
      {path: "codeverify", element: <ProtectedAuth><CodeVerify/></ProtectedAuth> },
      {path: "resetPassword", element: <ProtectedAuth><ResetPassword/></ProtectedAuth>  },



      {path: "*", element: <NotFound/> },

    ]}
  ])

  useEffect(()=>{
    if (localStorage.getItem("userToken") != null) {
      setToken(localStorage.getItem("userToken"))
    }
  },[])


  return <RouterProvider router={routs}></RouterProvider>

}

export default App;
