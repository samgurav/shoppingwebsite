import React,{useState,useEffect,useRef} from 'react'
import AdminNavbar from '../../Admin/AdminNavbar'
import {Container,Form,Row,Col,Card,FormControl,Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { getCategory, getsubCategory, ProductDetails } from '../../../config/MyService';
const regForName = RegExp(/^[a-zA-Z ]{2,30}$/);
const regForDesc = RegExp(/^[a-zA-Z ]{2,1000}$/);
const regForCost=RegExp(/^[0-9]*$/);
function Products() {
            const navigate=useNavigate()
            const [category,setCategory]=useState([]);
            const [subcategory,setsubCategory]=useState([]);
            const [subCatId,setCatId]=useState([]);
            const[flag,setFlag]=useState(false)
            const[flag1,setFlag1]=useState(false)
            const[data,setData] =useState({
              productName:'',
              productDescrip:'',
              productProducer:'',
              productCost:'',
              categoryId:'',
              subcategoryName:'',
              productRating:''
            });
            const [select,setSelect]=useState()
            const [Errors,SetError]=useState({
              productName:'',
              productDescrip:'',
              productProducer:'',
              productCost:'',
              categoryId:'',
              subcategoryName:'',
              productRating:''
            })
            const catInput=useRef(null);
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

          const handler=(event)=>{
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

                      case 'categoryId':
                           localStorage.setItem("CategoryId",value)
                           for(let i=0;i<category.length;i++){    
                            if(category[i]._id==value){
                                console.log(category[i])
                                setsubCategory(category[i])
                                setFlag1(true)
                                break;
                            }
                        }
                        
                       
                        break;

                     
            }
            setSelect({Errors,[name]:value},()=>{
              console.log(Errors)
            })
            setData({...data,[name]:value})
            console.log(event.target.value)
           
        }
    
        const validate=(errors)=>{
          let valid = true;
          Object.values(errors).forEach((val)=> 
              val.length>0 && (valid = false));
              return valid;
              }
            
                  //submit product details
              const submit=(e)=>{
                e.preventDefault();
                console.log(data)
                if(!data.productName=="" && !data.productCost=="" && !data.productDescrip=="" && !data.productProducer=="" && validate(Errors)){
                      console.log(data)
                      ProductDetails(data).then(res=>{
                        if(res.data.err==1) {
                            alert(res.data.message)
                        }else{
                          alert(res.data.message)
                        console.log(res.data.data)
                        localStorage.setItem("ProductId",res.data.data)
                        setFlag(true)
                        }
                        
                    })
                }
                else{
                  alert('please filed all the required details')
                }
               
               
            }
            // console.log(data)


            
            if  (!localStorage.getItem('adminlogin')){
              window.location.replace('/login')
            }

  return (
    <div >
        <AdminNavbar/>
        <Container className='mt-5'>

        <Card className='p-5'>
   
     <Form  onSubmit={submit}>
                    <h4 >Product Details</h4>
                    <hr/>
                   
                    <Row>
                <Col>
            <Form.Group className="mb-3" controlId="formBasiccategory">
            <Form.Label> Category Name</Form.Label>
            <Form.Select aria-label="Default select example" name="categoryId" onChange={handler}  >
            <option>Select category name..</option>
            { category.map((ele,index)=>
            <option value={ele._id}  >{ele.category}</option>
            )}

           
          </Form.Select>
        
           
        </Form.Group>
                </Col>
           
                <Col>
                <Form.Group className="mb-3" controlId="formBasicsubcat">
            <Form.Label>SubCategory Name</Form.Label>
            {
              flag1?
            
            <Form.Select aria-label="Default select example" name="subcategoryName" onChange={handler}  >
           <option>Select subcategory name...</option>
            {subcategory.subcategory.map((subcat,index)=>
            <option value={subcat.subcategory}>{subcat.subcategory}</option>
            )} 
         
          </Form.Select>:
          <div>
              <Form.Select aria-label="Default select example"   >
            <option>Select subcategory name...</option>
          
         
          </Form.Select>
          </div>
}
        </Form.Group>
                </Col>
               </Row>&nbsp;
               
                <Row>
                <Col>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalpname">
                    <Form.Label column sm={2}>
                    Product Name
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control  type="text" placeholder="Enter product name here..." name="productName" onChange={handler}  />
                    </Col>
                    {Errors.productName.length>0 &&
                  <span style={{color:"red"}}>{Errors.productName}</span>}  
                    </Form.Group>
                    
                </Col>
               
             
               </Row>&nbsp;
               <Row>
               <Form.Group as={Row} className="mb-3" controlId="formHorizontaladdress">
                    <Form.Label column sm={2}>
                    product Description
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control as="textarea" type="text" placeholder="Enter product description here..." name="productDescrip" onChange={handler}   />
                    </Col>
                    {Errors.productDescrip.length>0 &&
                  <span style={{color:"red"}}>{Errors.productDescrip}</span>}  
                    </Form.Group>
               </Row>&nbsp;
               
               <Row>
                <Col>
                <Form.Group className="mb-3" controlId="formBasicstate">
            <Form.Label>Product Cost</Form.Label>
            <Form.Control type="text" placeholder="Enter product cost here..." name="productCost" onChange={handler}   /> 
        </Form.Group>
          {Errors.productCost.length>0 &&
                  <span style={{color:"red"}}>{Errors.productCost}</span>}   
                </Col>
           
                <Col>
                <Form.Group className="mb-3" controlId="formBasicstate">
            <Form.Label> Producer Name</Form.Label>
            <Form.Control type="text" placeholder="Enter product producer name here..." name="productProducer" onChange={handler}   /> 
        </Form.Group>
          {Errors.productProducer.length>0 &&
                  <span style={{color:"red"}}>{Errors.productProducer}</span>}   
                </Col>
               </Row>&nbsp;
               <br/><br/>
               

               
        

               <Button variant="primary" type="submit" size="lg">
                   Submit Product Details
                  </Button>
                  {flag? navigate('/proimages'):null}  
                  
       
                    </Form>
    
        </Card>
     
        </Container>

        
    </div>
  )
}

export default Products