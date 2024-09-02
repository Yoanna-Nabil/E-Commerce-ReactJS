import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'



 export  let cartContext = createContext();

export default function CartContextProvider(props) {
    let [counter , setCounter] = useState("")
    let [id , setId] = useState("")


    function addToCart(productId) {
      return  axios.post('https://ecommerce.routemisr.com/api/v1/cart',{productId},{
            headers: {
                token : localStorage.getItem('userToken')
            }
        } ).then(({data})=>data).catch(error => error);
        
    }

    function getCart() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
              headers: {
                  token : localStorage.getItem('userToken')
              }
          } ).then(({data})=>data).catch(error => error);
          
      }

    async  function deleteCart(productId) {
        return  axios.delete('https://ecommerce.routemisr.com/api/v1/cart/'+productId ,{
              headers: {
                  token : localStorage.getItem('userToken')
              }
          } ).then(({data})=>data).catch(error => error);
          
      }

    async  function updateCart(productId , count) {
        return  axios.put('https://ecommerce.routemisr.com/api/v1/cart/'+productId, {count} ,{
              headers: {
                  token : localStorage.getItem('userToken')
              }
          } ).then(({data})=>data).catch(error => error);
          
      }

      function payment(shippingAddress) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}`,{shippingAddress},{
            headers:{
                token : localStorage.getItem('userToken')
            },
            params: {
                url: 'http://localhost:3000'
            }
        })
        .then((response)=>response).catch((error)=>error)
      }


      async function initialCounter() {
        let data = await getCart()
        setCounter(data?.numOfCartItems)
        setId(data?.data?._id)
      }


      useEffect(()=>{
        initialCounter()
      },[])


  return <cartContext.Provider value={{addToCart , counter , setCounter , getCart , deleteCart , updateCart , payment , setId}}>
    {props.children}
  </cartContext.Provider>
}
