import React,{useState,useRef,useEffect} from 'react'
import NavigationBar from '../NavigationBar'
import "../../CSS/style.css"
import { useNavigate } from 'react-router-dom';
import { getAll, getUserData } from '../../config/MyService';
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForPass = RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/);

function Login() {
  const [loginData,setLoginData]=useState()
  const[flag,setFlag]=useState(false)
  const [state, setstate] = useState([])
  const navigate=useNavigate()
  useEffect(()=>{
    // dispatch({type:"cartLen"})
    if(localStorage.getItem('isLogged')==='true'){
        window.location.replace('/dashboard')
    }
    else{
        localStorage.setItem('isLogged',false)
       
    }

    if(localStorage.getItem('adminlogin')==='true'){
      window.location.replace('/category')
  }



  
        getAll().then(res=>{
          setstate(res.data)
          console.log(res.data)
        })
    
  

  
},[])
const handleLoginData = (event) => {
  const { name, value } = event.target;
  setLoginData({ ...loginData, [name]: value })
  console.log(loginData)
}
const submitLogin = (e) => {
  e.preventDefault()
  console.log(loginData.email)
  
    getUserData({ email: loginData.email, password: loginData.password }).then((res) => {
      if (res.data.err == 0 && res.data.status=="user") {
      alert(res.data.message)
      localStorage.setItem("isLogged",true)
          localStorage.setItem("_token", res.data.token);
          navigate('/dashboard')     

      } else if (res.data.err == 1) {
          alert(res.data.message)
      }
      else if(res.data.err==2 && res.data.status=="admin"){
        alert(res.data.message)
        navigate('/category')    
        localStorage.setItem('adminlogin',true)
      }
  })   
  
         
     }

  return (
    <div>
            <div >
        <NavigationBar/>
            <div className="container " style={{marginTop:'20vh',marginBottom:'5vh'}}>
            <div className="col-md-8 mx-auto card11 " >
        <div >
            <div className="text">
            <h2 style={{color:'gray',fontStyle:'italic'}}>Login To Neosoft Fashion</h2>
               
            </div>
            <form onSubmit={submitLogin} >
                <div className="input-text">
             
                    <input type="text"  placeholder="Enter Email Address"  name="email"    onChange={handleLoginData} 
                       required />
                    <i class="fa fa-font" aria-hidden="true"></i>

                </div>
                {/* {Errors.email.length>0 &&
                  <span style={{color:"red"}}>{Errors.email}</span>}  */}


                <div className="input-text">
                    <input type="password" placeholder="Enter your password"  name="password"    onChange={handleLoginData}  
                       required/>
                    {/* <i className="fa fa-lock"></i>
                    <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye" }`}></i> */}
                </div>
                {/* {Errors.password.length>0 &&
                  <span style={{color:"red"}}>{Errors.password}</span>} 
             */}
     
          
                <div className="buttons">
                    <button type="submit"  >Login</button>
                   
                </div>
             
              
            </form>
        </div>
    </div>

            </div>
          
        
            
       

    </div>
    </div>
  )
}

export default Login