import React,{useState,useEffect,useRef} from 'react'
import { getCategory, getProducts,DeleteProduct, EditProduct, UpdateImage, UpdatesubImage, ChangeProfile } from '../../../config/MyService';
import AdminNavbar from '../../Admin/AdminNavbar'
import {Accordion,Button,Card, Container,Table,Modal,Row,Col} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const regForName = RegExp(/^[a-zA-Z ]{2,30}$/);
const regForDesc = RegExp(/^[a-zA-Z ]{2,1000}$/);
const regForCost=RegExp(/^[0-9]*$/);
function AllProducts() {
    const [category,setCategory]=useState([]);
    const [product,setProduct]=useState([]);
    const[productdetails,setProDetails]=useState([])
    const[index,setindex]=useState()
    const[image,setImages]=useState([])
    const [modalShow, setModalShow] = React.useState(false);
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
      const [select,setSelect]=useState()
      const [Errors,SetError]=useState({
        productName:'',
        productDescrip:'',
        productProducer:'',
        productCost:'',
     
      })
      const [newUser, setNewUser] = useState(
        {
    
          photo: '',
            id: '',
            index:'',
            multiple_images:''
        })
        const[data,setData]=useState({})
    
     const [flag,setFlag]=useState(false)
    const success = (data) => toast.success(data, { position: toast.POSITION.TOP_CENTER });
    const failure = (data) => toast.error(data, { position: toast.POSITION.TOP_CENTER });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2= () => setShow2(true);
    // const handleClose3 = () => setShow3(false);
    // const handleShow3= () => setShow3(true);
   const ProNameInput=useRef(null)
   const proProducerInput=useRef(null)
   const proDesc=useRef(null)
   const ProCost=useRef(null)
  
    useEffect(() => {
        refresh();
      
     }, [])

     //refresh function
     const refresh=()=>{
        getCategory().then((res) => {
            const categoryresult = res.data;
            console.log(res.data)
            setCategory(categoryresult)
         
        })
        getProducts().then((res) => {
            const categoryresult = res.data;
            console.log(res.data)
            setProduct(categoryresult)
 
        })
      
    }
    
      //delete product from database
    const Deleteproduct=(proId)=>{
        // alert(proId)
        DeleteProduct({ProductId:proId}) .then(res=>{
            if(res.data.err==1) {
                failure(res.data.message)
            }
            success(res.data.message)
           refresh();
  
        })  
    }
  
    //Update product button function
    const Updateproduct=(productdetails)=>{
        console.log(productdetails)
        setProDetails(productdetails)

    }

    //error handler
    const handleError=(event)=>{
        const {name,value}=event.target;   
        switch(name){
          case 'productName':
            Errors.productName= regForName.test(value)?'':' product name should be between 2 to 30 letters';
            break;
            case 'productDescrip':
              Errors.productDescrip= regForDesc.test(value)?'':' Description is invalid';
              break;
              case 'productProducer':
                Errors.productProducer= regForName.test(value)?'':' producer producer should be between 2 to 10 letters';
                break;
                case 'productCost':
                  Errors.productCost= regForCost.test(value)?'':' product cost field accepts only number';
                  break;
    
        }

        setSelect({Errors,[name]:value},()=>{
          console.log(Errors)
        })
       
       
    }

    //validate error
    const validate=(errors)=>{
        let valid = true;
        Object.values(errors).forEach((val)=> 
            val.length>0 && (valid = false));
            return valid;
            }

            //Update data
    const EditData=(e)=>{
        e.preventDefault();
        if( validate(Errors)){
                   EditProduct({proName:ProNameInput.current.value,Cost:ProCost.current.value,desc:proDesc.current.value,producer:proProducerInput.current.value,proID:productdetails._id}) .then(res=>{
                if(res.data.err==1) {
                    alert(res.data.message)
                }
                else{
                    success(res.data.message)
                    setShow(false)
                    refresh()
                }
           
            //    setModalShow(false)
            //    refresh()
               
            })  
        }else{
            alert('something went wrong')
        }

      
     
    }
    const handlePhoto = (e) => {
      console.log({ photo: e.target.files[0] })
      setNewUser({ ...newUser, photo: e.target.files[0] });
      console.log(newUser.photo)
  }
  const handleprofileimage=(event)=>{
    const {name,value}=event.target;   
    setData({...data,[name]:value})
    console.log(data)
}


 

       //Updte subimages
        const EditSubImage=(index,mainimg)=>{
        
          let formData = new FormData()
         
          formData.append('photo', newUser.photo)
          formData.append('id', productdetails._id)
          formData.append('mainimg', mainimg)
          formData.append('index', index)
          console.log(formData);
       
          if(newUser.photo!==""){
            UpdatesubImage(formData).then(res => {
              console.log(res.data);
              if (res.data.err === 0)
              {
                setNewUser({...newUser,photo:""})
               success(res.data.message)
               setProDetails(res.data.data)
               refresh();
             handleClose2() 
             handleShow1();
           
              } 
      
              else {
                failure(res.data.message)
              }
            
          })
         
          }else{
            failure("please select and image to continue")
          }
     
        }

    function MyVerticallyCenteredModal(props) {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
               Update Subctegory
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='text-center'>
            
                <Button variant="outline-warning" onClick={()=>{handleShow();setModalShow(false)}} >Update Product Details</Button>{' '} &nbsp;&nbsp;
                <Button variant="outline-primary" onClick={()=>{handleShow1();setModalShow(false)}}>Update Product Images</Button>{' '} &nbsp;&nbsp;
               
                

                </div>
             </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }

      if  (!localStorage.getItem('adminlogin')){
        window.location.replace('/login')
      }
  return (
    <div>
        <AdminNavbar/>
        <div >
            <Container className='col-md-8 col-lg-8 col-sm-12' >
            { category.map((ele,index)=>
                 <div style={{margin:'10px'}}>
                 <Accordion defaultActiveKey="0" key={index} >
                                <Accordion.Item eventKey="0">
                                <Accordion.Header ><span style={{fontSize:'25px',fontWeight:'bold'}}>{ele.category}</span></Accordion.Header>
                              
                          
                        <Accordion.Body>
                     
                        <Table striped bordered hover responsive variant="light">
                     
                     <thead>
                         <tr >
                         <th>sr No</th>
                         <th>Product Name</th>
                         <th>Product Image</th>
                         <th>Product Description</th>
                         <th>Product Producer</th>
                         <th>Product Cost</th>
                         <th>Action</th>
                         </tr>
                     </thead>
                     {  product.filter((pro) => {
                         if (ele._id==pro.categoryId) {
                             return pro;
                         }
                     }).map((pro,index)=>
                     <tbody>
                         <tr >
                         <td>{index+1}</td>
                         <td>{pro.productName}</td>
                         <td><img src={pro.productImage} height="100px"/></td>
                         <td>{pro.productDescrip}</td>
                        
                         <td>{pro.productProducer}</td>
                         <td><span style={{color:'green',fontWeight:'bold'}}>Rs.{pro.productCost}</span></td>
                         <td> <Button  className="btn btn-danger" onClick={()=>Deleteproduct(pro._id)} >&nbsp;Delete   <i class="fa fa-trash-o"></i></Button><br/><br/>  <Button  className="btn btn-warning"  onClick={()=> {setModalShow(true);Updateproduct(pro)}} >Update<i class="fa fa-edit"></i></Button> </td>

                       
                         <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      
         
                       </tr>
 
                     </tbody>
                     
                      )
                     }
                      
                    
                    
                    </Table>
                   

                     
                     
                      
                 
<div>
                      </div>
                       
                    </Accordion.Body>
                
                               
                                </Accordion.Item>
                                
                                </Accordion>
                                </div>
                                    )
                                    }
            </Container>

            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={EditData}>
                        <div class="form-group">
                     <label for="cc-number" class="control-label">Product Name</label>
                      <input  type="text" class="input-lg form-control" name="productName"  ref={ProNameInput} defaultValue={productdetails.productName} onChange={handleError} /> </div>
                      {
                  <span style={{color:"red"}}>{Errors.productName}</span>}  
                      <div class="form-group">
                     <label for="cc-number" class="control-label">Product Producer</label>
                      <input  type="text" class="input-lg form-control" name="productProducer"  ref={proProducerInput} defaultValue={productdetails.productProducer}  onChange={handleError}  /> </div>
                      {
                  <span style={{color:"red"}}>{Errors.productProducer}</span>}  
                      <div class="form-group">
                     <label for="cc-number" class="control-label">Product Cost</label>
                      <input  type="text" class="input-lg form-control" name="productCost"  ref={ProCost} defaultValue={productdetails.productCost}  onChange={handleError}  /> </div>
                      {
                  <span style={{color:"red"}}>{Errors.productCost}</span>}  
                      <div class="form-group">
                     <label for="cc-number" class="control-label">Product Description</label>
                      <input  type="text" class="input-lg form-control" name="productDescrip"  ref={proDesc} defaultValue={productdetails.productDescrip}  onChange={handleError}  /> </div>
                      {
                  <span style={{color:"red"}}>{Errors.productDescrip}</span>}  
                        <div className='text-center'>
                     <Button variant="success" type='submit'  style={{marginTop:'20px'}}  >Update Details</Button>
                     </div>
                        </form>
        </Modal.Body>
    
      </Modal>


      <Modal show={show1} onHide={handleClose1} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Update Profile Image and SubImages</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div >
            <div>
            <h5 className='text-center' >Change SubImage</h5>
            <div className='text-center'>
                        <Button variant="outline-warning"  onClick={()=>{handleShow2();handleClose1()}}  >Update SubImages</Button>{' '} &nbsp;&nbsp;
                        </div>

            </div><br/>
            <h5 className='text-center'>Change Profile Image</h5>
          <Table striped bordered hover size="sm" responsive>
                <thead>
                  <tr>
                    <th>Sr Number</th>
                    <th>Product SubImage</th>
                    <th>Action</th>
                  
                  </tr>
                </thead>
                {
                  productdetails.subImages !== undefined && productdetails.subImages.map((imgs,index) =>
              
                <tbody>
                  <tr>
                    <td>{index+1}</td>
                    <td><img src={imgs.subimage} height="100px" width="100px"/></td>
                    <td>
                    <div class="form-check">
              <input class="form-check-input" type="radio" name='mainimage' value={index} id="flexRadioDefault2"  defaultChecked={imgs.mainimg}
              onChange={
                (e) => {
                    console.log(e.target.value)
                    // setradiodata()
                    console.log(productdetails)
                    ChangeProfile({ id: productdetails._id,  index: e.target.value,subimageId:productdetails.subImages[e.target.value].subimgid })
                        .then(res => {

                            if (res.data.err == 0) {
                                success(res.data.message)
                                // setProDetails(res.data.data)
                                refresh()
                              

                            }
                            else {
                                failure(res.data.message)
                            }

                        })
                }
            } 
              />
            
            </div>
                    </td>
                   
                  </tr>
                 
                </tbody>
                  )}
              </Table>
          </div>
               
                      
                  
                  



         


      
        </Modal.Body>
    
      </Modal>
      
      <Modal show={show2} onHide={handleClose2}  size="lg" >
        <Modal.Header closeButton>
          <Modal.Title>Change Sub Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Row>
        <Col  xs={12} >
         <div>
       <Container>
       <div>
          <div className="row d-flex justify-content-around">
           {  productdetails.subImages !== undefined &&
               productdetails.subImages.map((imgs,index) =>
              <div className="col-lg-4 " key={imgs.id}>
              <div>
               <img alt="sofa" src={imgs.subimage} style={{ width: "100px", height: "100px", margin: '10px' }} />
               <form>
                   <input type="file"  accept=".png, .jpg, .jpeg" onChange={handlePhoto}  name="photo"  /><br/><br/>

                  
                 </form>
               </div><br/>
             
               <div>
                 <Button variant='primary' onClick={()=>{EditSubImage(index,imgs.mainimg)}}>Update </Button>
                 </div>

             
               </div>
                
               )
                }
                  </div>
              </div>
            
       </Container>
        
             
              </div>


                        </Col>
                      
                    </Row>
        
        </Modal.Body>
    
      </Modal>

           
    
     

        </div>
    </div>
  )
}

export default AllProducts