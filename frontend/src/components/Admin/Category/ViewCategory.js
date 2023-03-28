import React,{useEffect,useState,useRef} from 'react'
import { Deletecategory, DeleteSubCategory, EditSubcategory, getCategory, getsubCategory } from '../../../config/MyService'
import AdminNavbar from '../../Admin/AdminNavbar'
import {Container, Table,Accordion,Button,Modal} from 'react-bootstrap'
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
function ViewCategory() {
    const [data, setData] = useState()
    const SubcatInput=useRef(null);
    const [modalShow, setModalShow] = React.useState(false);
    const [category,setCategory]=useState([]);
    // const [subcategory,setsubCategory]=useState([]);
    const [subcatId,setSubCatId]=useState([])
    const[ subcat,setSubCat]=useState([]);
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


    //delete data
    const DeleteData=(subcatId,categoryData,subcatindex)=>{
        console.log(subcatId,categoryData)
   
        DeleteSubCategory({subcategoryId:subcatId,subindex:subcatindex,categoryId:categoryData._id}) .then(res=>{
            if(res.data.err==1) {
                failure(res.data.message)
            }else{
              success(res.data.message)
              refresh();
            }
          
        
    
        })  
     

    }

  //Update data set
    const UpdateData=(subcatId,category,data)=>{
        console.log(subcatId,category,data)
        setSubCat(category)
        setSubCatId(subcatId)
        setData(data)
    }

    //Edit function
    const editData=(e)=>{
        e.preventDefault();
        // alert(SubcatInput.current.value)
        EditSubcategory({subcategory:SubcatInput.current.value,subcatId:subcatId,categoryId:data._id}) .then(res=>{
            if(res.data.err==1) {
                failure(res.data.message)
                setModalShow(false)
            }
         else {
            success(res.data.message)
            setModalShow(false)
            refresh()
            
          }
        })  
    }

    //Delete Category
    const DeleteCategory=(CatId)=>{
        console.log(CatId)
        Swal.fire({
            title: 'Are You Sure, Do you want to Delete This product? ',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't Delete`,
          }).then((result) => {
         
            if (result.isConfirmed) {
            Deletecategory({categoryId:CatId}) .then(res=>{
            if(res.data.err==0) {
              alert(res.data.message)

            }else{
              alert(res.data.message)

            }
            window.location.reload(false)
       
           
        }) 
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })
      


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
              <form onSubmit={editData}>
                        <div class="form-group">
                     <label for="cc-number" class="control-label">Subcategory Name</label>
                      <input  type="text" class="input-lg form-control" name="subcategory"  ref={SubcatInput} defaultValue={subcat} required/> </div>
                        <div className='text-center'>
                     <Button variant="success" type='submit'  style={{marginTop:'20px'}} >Update Subcategory</Button>
                     </div>
                        </form>
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
        <div className="container " >
                    <div>

           <Container className="mt-5">

           <div className="container " >
                    <div>
                                    
                                        { category.map((ele,index)=>
                                        <div style={{margin:'10px'}}>       
                                <Accordion defaultActiveKey="0" key={index} >
                                <Accordion.Item eventKey="0">
                                <Accordion.Header ><span style={{fontSize:'25px',fontWeight:'bold'}}>{ele.category}</span></Accordion.Header>
                                 
                        <Accordion.Body>
                      
                      <Table striped bordered responsive hover variant="light">
                     
                    <thead>
                        <tr >
                        <th>sr No</th>
                        <th>SubCategory Name</th>
                        <th>Action</th>
                        </tr>
                    </thead>

                    {

                   ele.subcategory.map((subcat,index1)=>     

                    <tbody>
                        <tr >
                        <td>{index1+1}</td>
                        <td>{subcat.subcategory}</td>
                        <td> <Button  className="btn btn-danger" onClick={()=>DeleteData(subcat.subcategoryId,ele,index1)} >&nbsp;Delete <i class="fa fa-trash-o"></i></Button> &nbsp;  <Button  className="btn btn-warning"  onClick={()=> {setModalShow(true);UpdateData(subcat.subcategoryId,subcat.subcategory,ele)}} >&nbsp;Update <i class="fa fa-edit"></i></Button></td>

                      
                       
          <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
                      </tr>

                    </tbody>
                    
                      )}
                   
                   
</Table>
<div>
                    <Button  className=" text-center btn btn-primary" onClick={()=>DeleteCategory(ele._id)} >&nbsp;Delete Category <i class="fa fa-trash-o"></i></Button> &nbsp;
                      </div>
                       
                    </Accordion.Body>
                
                               
                                </Accordion.Item>
                                
                                </Accordion>
                                </div>
                                    )
                                    }

                    </div>
         
         
       
                   </div>   
               
               </Container>   
                            

                    </div>
         
         
       
                   </div>
                               
    </div>
    
  )
}

export default ViewCategory