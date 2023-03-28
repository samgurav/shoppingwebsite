import React,{useState,useRef} from 'react'
import NavigationBar from '../NavigationBar'
import "../../CSS/style.css"
import { Register } from '../../config/MyService';
import { useNavigate } from 'react-router-dom';
const regForName = RegExp(/^[A-Za-z]{2,10}$/);
const regForUName = RegExp(/^[A-Za-z]{2,12}$/);
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForPass = RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/);
const RegForMobile=RegExp('^((\\+91-?)|0)?[0-9]{10}$')
const bcrypt = require('bcryptjs')

function Registration() {
    const[eye,seteye]=useState(true);
    const navigate=useNavigate()
    const[password,setpassword]=useState("password");
    const[type,settype]=useState(false);
    const[flag,setFlag]=useState(false)
    const[eyes,seteyes]=useState(true);
    const[types,settypes]=useState(false);
    const[passwords,setpasswords]=useState("password"); 
    const pass =useRef()
    const[data,setData] =useState({
        name:'',
        lname:'',
        email:'',
        password:'',
        mobile:'',
        cpassword:'',
       
    });  
    const [select,setSelect]=useState() 
    const [Errors,SetError]=useState({
        name:'',
        lname:'',
        email:'',
        password:'',
        mobile:'',
        cpassword:''
      })

    const Eye=()=>{
        if(password=="password"){
        setpassword("text");
        seteye(false);
        settype(true);
        }
        else{
        setpassword("password");
        seteye(true);
        settype(false);
        }
        }
  
        const Eyes=()=>{
            if(passwords=="password"){
            setpasswords("text");
            seteyes(false);
            settypes(true);
            }
            else{
            setpasswords("password");
            seteyes(true);
            settypes(false);
            }
            }

            const handler=(event)=>{
                const {name,value}=event.target;
                switch(name){
                    case 'name':
                      Errors.name= regForName.test(value)?'':' name should be between 2 to 10 letters';
                      break;
                      case 'lname':
                        Errors.lname= regForName.test(value)?'':' last name should be between 2 to 10 letters';
                        break;
                      case 'mobile':
                        Errors.mobile= RegForMobile.test(value)?'':'Phone Number should be valid';
                   break;
                 
                           case 'email':
                            Errors.email= regForEmail.test(value)?'':'invalid email';
                       break;
                    
                          case 'password':
                              Errors.password= regForPass.test(value)?'':'Password must be between 6 to 16 characters and must contain one number and one special character';
                              break;
                              case 'cpassword':
                                Errors.cpassword=pass.current.value===value?'':'Password do not match';
                              break; 
                        
                     
                    
                  }
                  setSelect({Errors,[name]:value},()=>{
                    console.log(Errors)
                  })
                  
                setData({...data,[name]:value})
                console.log(data)
            }

            //validate errors
            const validate=(errors)=>{
                let valid = true;
                Object.values(errors).forEach((val)=> 
                    val.length>0 && (valid = false));
                    return valid;
                    }

        //submit data
        const submit=(e)=>{
        e.preventDefault();
        const saltRounds=10;
        const myPlaintextPassword=data.password;
        const salt=bcrypt.genSaltSync(saltRounds)
        const hashPass = bcrypt.hashSync(myPlaintextPassword,salt);
        data.password=hashPass;
        console.log(data)
        if(validate(Errors)){
          Register(data).then(res=>{
            if(res.data.err==1) {
                alert(res.data.message)
            }
          else {
            alert(res.data.message)
            setFlag(true)
           
           }
        })
      
        }
        }
  return (
    <div >
        <NavigationBar/>
            <div className="container " style={{marginTop:'5vh',marginBottom:'5vh'}}>
            <div className="col-md-8 mx-auto card11 " >
        <div >
            <div className="text">
            <h2 style={{color:'gray',fontStyle:'italic'}}>Welcome to Neosoft fashion</h2>
               
            </div>
            <form onSubmit={submit} >
                <div className="input-text">
             
                    <input type="text"  placeholder="Enter First Name"  name="name"    onChange={handler} 
                       required />
                    <i class="fa fa-font" aria-hidden="true"></i>

                </div>
                {Errors.name.length>0 &&
                  <span style={{color:"red"}}>{Errors.name}</span>} 
                
                <div className="input-text">
                    <input type="text"  placeholder="Enter Last Name"  name="lname"    onChange={handler} 
                     required />
                    <i class="fa fa-font" aria-hidden="true"></i>

                </div>
                {Errors.lname.length>0 &&
                  <span style={{color:"red"}}>{Errors.lname}</span>} 
               
                <div className="input-text">
                    <input type="text"  placeholder="Enter Email Address"  name="email"
                         onChange={handler}  required />
                    <i className="fa fa-envelope"></i>
                </div>
                {Errors.email.length>0 &&
                  <span style={{color:"red"}}>{Errors.email}</span>} 
                 
                <div className="input-text">
                    <input type={password} placeholder="Enter your password"  name="password"    onChange={handler}  ref={pass}
                       required/>
                    <i className="fa fa-lock"></i>
                    <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye" }`}></i>
                </div>
                {Errors.password.length>0 &&
                  <span style={{color:"red"}}>{Errors.password}</span>} 
            
                <div className="input-text">
                    <input type={passwords}  placeholder="Confirm Password"    onChange={handler}  name="cpassword" 
                     required/>
                    <i className="fa fa-lock"></i>
                    <i onClick={Eyes} className={`fa ${eyes ? "fa-eye-slash" : "fa-eye" }`}></i>
                </div>
                {Errors.cpassword.length>0 &&
                  <span style={{color:"red"}}>{Errors.cpassword}</span>} 
              
                <div className="input-text">
                    <input type="text"  placeholder="Enter Mobile Number"    onChange={handler}   name="mobile" 
                    required />
                    <i class="fa fa-phone" aria-hidden="true"></i>
          
                </div>
                {Errors.mobile.length>0 &&
                  <span style={{color:"red"}}>{Errors.mobile}</span>}   
        
                <div className="buttons">
                    <button type="submit" >Register</button>
                    {flag? navigate('/login'):null}  
                </div>
             
              
            </form>
        </div>
    </div>

            </div>
          
        
            
       

    </div>
  )
}

export default Registration