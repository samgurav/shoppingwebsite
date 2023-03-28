import React,{useState,useEffect} from 'react'
import AdminNavbar from '../../Admin/AdminNavbar'
import { Container,Card,Button,Form,Row,Col} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import { addsubcategory, getCategory } from '../../../config/MyService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
function Subcategory() {
  const navigate=useNavigate()
  const [category,setCategory]=useState([]);
    const[data,setData] =useState({
        subcategory:'',
        categoryId:''
     });
     const success = (data) => toast.success(data, { position: toast.POSITION.TOP_CENTER });
    const failure = (data) => toast.error(data, { position: toast.POSITION.TOP_CENTER });


    useEffect(() => {
      refresh();
   }, [])
   const refresh=()=>{
    getCategory().then((res) => {
        const categoryresult = res.data;
        console.log(res.data)
        setCategory(categoryresult)
     
    })
  
}


    //input handler
       const handler=(event)=>{
         const {name,value}=event.target;   
         setData({...data,[name]:value})
         console.log(data)
     }

     //submit subcategory
     const SubmitSubcategory=(e)=>{
       e.preventDefault();
      if(!data.subcategory=="" && !data.categoryId==""){
        addsubcategory({subcategory:data.subcategory,categoryID:data.categoryId}).then(res=>{
          if(res.data.err==1) {
              alert(res.data.message)
          }
         else{
         
          alert(res.data.message)
         }
         window.location.reload(false)

       
         
      })
      }
      else{
        failure("Please Select Required Details to continue...")
      }
     }

     //change category function
     const ChangeCategory=(e)=>{
       e.preventDefault();
       navigate("/category")
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
        <h2 style={{color:'gray',fontStyle:'italic'}}>Subcategory Details</h2>
                <Form onSubmit={SubmitSubcategory} className="mt-5" >
                
                  <Form.Group as={Row} className="mb-3" controlId="formHorizontalpincode">
                    <Form.Label column sm={2}>Select Category Name</Form.Label>
                    <Col sm={10}>
                    <Form.Select aria-label="Default select example" name="categoryId" onChange={handler}  >
            <option>Select category name..</option>
            { category.map((ele,index)=>
            <option value={ele._id}  >{ele.category}</option>
            )}
           
          </Form.Select>
                    </Col>
                     </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalpincode">
                    <Form.Label column sm={2}>Subcategory Name</Form.Label>
                    <Col sm={10}>
                    <Form.Control type="text" placeholder=" Enter Subcategory Name" onChange={handler} name='subcategory' />
                    </Col>
                     </Form.Group>
                     <div className="mb-2">
                  <Button variant="primary" type="submit" size="lg">
                   Submit 
                  </Button>&nbsp;&nbsp;
                  <Button variant="light"  size="lg" onClick={ChangeCategory}>
                   Change Category 
                  </Button>
                  </div>
                   
                    </Form>
                     </div>

        </Container>
      </div>
    </div>
  )
}

export default Subcategory