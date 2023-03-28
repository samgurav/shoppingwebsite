import React from 'react'
import {Navbar,Container,Offcanvas,Nav,Button,FormControl,NavDropdown,Form,Dropdown} from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
function AdminNavbar() {
  const navigate=useNavigate()

  const logout=(e)=>{
    e.preventDefault();
    alert('You have Successfully Logout from this device.')
     localStorage.clear();
   
    navigate("/login",{replace:true})
   
    
}


  return (
    <div>
    <div >

    <Navbar bg="light" expand={false}>
  <Container  >
    <Navbar.Brand href="/" style={{color:'blue',fontSize:'20px',fontStyle:'italic'}}><span style={{color:'red',fontSize:'20px',fontWeight:'bold',fontStyle:'italic'}}>Neosoft</span> fashion</Navbar.Brand>
  
    <Navbar.Toggle aria-controls="offcanvasNavbar" />
                   

    
    <Navbar.Offcanvas
      id="offcanvasNavbar"
      aria-labelledby="offcanvasNavbarLabel"
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title id="offcanvasNavbarLabel"style={{color:'blue',fontSize:'20px',fontStyle:'italic'}}><span style={{color:'red',fontSize:'20px',fontWeight:'bold',fontStyle:'italic'}}>Neosoft</span> fashion</Offcanvas.Title>
      </Offcanvas.Header>
      <h3 style={{color:'grey',fontStyle:'italic'}}>Welcome Admin</h3>
      <Offcanvas.Body>
        <Nav className="justify-content-end flex-grow-1 pe-3">
          <Link to="/category" style={{fontSize:'20px',textDecoration:'none'}}>Add Category</Link><br/>
          <Link to="/subcategory" style={{fontSize:'20px',textDecoration:'none'}}>Add Subcategory</Link><br/>
          <Link to="/viewcategory"  style={{fontSize:'20px',textDecoration:'none'}}>View All Category</Link><br/>
          <Link to="/addproduct" style={{fontSize:'20px',textDecoration:'none'}}>Add Products</Link><br/>
          <Link to="/products" style={{fontSize:'20px',textDecoration:'none'}}>View Products</Link><br/>
          <Link to="/login" style={{fontSize:'20px',textDecoration:'none'}} onClick={logout}>Admin Logout</Link>
        
         
        </Nav>
     
      </Offcanvas.Body>
    </Navbar.Offcanvas>
 </Container>
 </Navbar> 
    </div>
</div>
  )
}

export default AdminNavbar