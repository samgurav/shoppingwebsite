import React,{useState} from 'react'
import { Container,Card,Button,Form,Row,Col} from 'react-bootstrap'
import { addCategory } from '../../../config/MyService';
import AdminNavbar from '../../Admin/AdminNavbar'
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//toast for alert
toast.configure();
function Category() {
  const navigate=useNavigate()
  const[data,setData] =useState({
   category:''
});
const success = (data) => toast.success(data, { position: toast.POSITION.TOP_CENTER });
const failure = (data) => toast.error(data, { position: toast.POSITION.TOP_CENTER });

// data handler
  const handler=(event)=>{
    const {name,value}=event.target;   
    setData({...data,[name]:value})
    console.log(data)
}

// add category
const submitCategory=(e)=>{
  // alert(data.category)
  e.preventDefault();
  if(!data.category==""){
    addCategory({category:data.category}).then(res=>{
      if(res.data.err==0) {
        // localStorage.setItem("categoryName",data.category)
         navigate('/subcategory')
         Swal.fire({
          icon:'success',
          text: res.data.message,
          timer:1000
        })
          console.log(res.data)
      }else{
        // localStorage.setItem("categoryName",data.category)
        navigate('/subcategory')
         alert(res.data.message)
      }
  })
  }
  else{
    failure("Please Enter category name to continue.")
  }
}

if  (!localStorage.getItem('adminlogin')){
  window.location.replace('/login')
}
  return (
    <div>
      <AdminNavbar/>
      <div>
        <Container style={{marginTop:'30px'}}>
        
        <div className="container card " style={{padding:'30px',height:'400px'}}>
        <h2 style={{color:'gray',fontStyle:'italic'}}>Category Details</h2>
                <Form  onSubmit={submitCategory} className="mt-5">
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalpincode">
                  <Form.Label column sm={2}>Category Name</Form.Label>
                    <Col sm={10}>
                    <Form.Control type="text" placeholder=" Enter Category Name" name='category' onChange={handler}  />
                    </Col>
                     </Form.Group>
                     <div className="mb-2">
                  <Button variant="primary" type="submit" size="lg">
                   Submit Category
                  </Button>
                  </div>
                   
                    </Form>
                     </div>

        </Container>
      </div>
    </div>

  )
}

export default Category