import React,{useState,useEffect} from 'react'
import { Card, Container, Form,Row,Col ,Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ProductImage, ProductMultImage } from '../../../config/MyService'
import AdminNavbar from '../../Admin/AdminNavbar'

function ProductImages() {
  const [data, setData] = useState()
  const [flag,setFlag]=useState()
  const navigate=useNavigate();
  const [newUser, setNewUser] = useState(
    {

      photo: '',
        id: ''
    })
    const [multImage, setMultImage] = useState({})

    



 
  const handleMultPhoto = (e) => {
    // console.log({ multiple_images: e.target.files[0] })
    setMultImage( e.target.files );
    console.log(e.target.files)
  }


  //submit multiple images
const submitMultImage=(e)=>{
  e.preventDefault()
  let formData = new FormData()

  let arr=[];
  for(let i=0;i<multImage.length;i++){
     formData.append('multiple_images', multImage[i])
  }

    formData.append('proid', localStorage.getItem("ProductId"))
  console.log(formData);
  ProductMultImage(formData).then(res => {
      console.log(res.data);
      if (res.data.err === 0)
      {
        alert(res.data.message)
        localStorage.removeItem("ProductId")
        navigate("/products")
        // setFlag(false)
      } 

      else {
        alert(res.data.message)
      }
      
    
  })


}
if  (!localStorage.getItem('adminlogin')){
  window.location.replace('/login')
}else if  (!localStorage.getItem('ProductId')){
  window.location.replace('/addproduct')
}


  return (
    <div>
        <AdminNavbar/>
        
        <Container className='mt-5'>
        <h4 >Product Details</h4>
        <Card className='p-5'>
      
         <div>
         <Form onSubmit={submitMultImage} encType="multipart/form-data">
            <h4 >Product Sub Images</h4>
           
            <Row className='mt-5'>
            
                <Col>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalpname">
                    <Form.Label column sm={2}>
                    Product SubImages
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control  type="file"  accept=".png, .jpg, .jpeg"  name="multiple_images" multiple  onChange={handleMultPhoto}  />
                    </Col>
                 
                    </Form.Group>
                   
                    
                </Col>
               
             
               </Row>

             
               <Button variant="primary"  type='submit' size="lg">
                   Submit Sub Image
                  </Button>
            </Form>
         </div>
           
        

        </Card>


        </Container>
    </div>
  )
}

export default ProductImages