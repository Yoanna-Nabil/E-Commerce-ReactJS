import axios from "axios";
import { createContext,  useEffect,  useState } from "react";





export let washlist = createContext();

export default function WashlistProvider(props) {

    let [washlistArr, setWashlist] = useState([])


    function addToWashlist(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId},{
            headers:{
                token : localStorage.getItem('userToken')
            }
        })
        .then((response)=>response).catch((error)=>error)
      }
    function removeToWashlist(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
            headers:{
                token : localStorage.getItem('userToken')
            }
        })
        .then((response)=>response).catch((error)=>error)
      }


    function getWashlist() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            headers:{
                token : localStorage.getItem('userToken')
            }
        })
        .then((response)=>response).catch((error)=>error)
      }
 
    async function getAllWahlist() {
        let {data} = await getWashlist()
        if (data?.status == 'success') {
            setWashlist(data?.data)
          }
    }
    
    useEffect(()=>{
        getAllWahlist()
    },[])


    return <washlist.Provider value={{addToWashlist , removeToWashlist , getWashlist , setWashlist ,washlistArr }}>
    {props.children}
    </washlist.Provider>
}
