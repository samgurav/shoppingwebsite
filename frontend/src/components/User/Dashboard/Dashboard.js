import React,{useState,useEffect} from 'react'
import { getAllProducts } from '../../../config/MyService';
import NavigationBar from '../../NavigationBar'
function Dashboard() {
  const [data, setData] = useState()

  useEffect(() => {
    refresh();
 }, [])

   const refresh=()=>{
        getAllProducts().then((res) => {
            const product = res.data;
            console.log(res.data)
            setData(product)
         
        })
       
    }


  return (
      
    <div>
        <NavigationBar/>
        dashboard
    </div>
  )
}

export default Dashboard