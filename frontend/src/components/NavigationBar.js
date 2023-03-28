import React from 'react'
import { useNavigate } from 'react-router-dom';
import {Navbar,Container,Offcanvas,Nav,Button,FormControl,NavDropdown,Form,Dropdown} from 'react-bootstrap'
import { Link } from 'react-router-dom'
function navigationBar() {

  const logout=(e)=>{
    e.preventDefault();
    alert('You have Successfully Logout from this device.')
    localStorage.removeItem("_token")
    localStorage.setItem('isLogged',false)
    
}
 



  return (
    <div>
    <div >
  

    <Navbar bg="light"  expand="lg"  style={{padding:'5px'}}>
  <Container >
    <Navbar.Brand href="/" style={{fontSize:'20px',color:'blue',marginLeft:'20px',fontStyle:'italic'}}>Neosoft <span style={{color:'#F71E0C',fontSize:'20px',fontWeight:'bold',fontStyle:'italic'}}>Fashion</span></Navbar.Brand>
   
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
    <Nav
        className="me-auto my-2 my-lg-0 menu"
        // style={{ maxHeight: '100px',marginLeft:'250px' }}
        navbarScroll
      >
       
          </Nav>   
          <Dropdown >
  <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic"  style={{height:'40px',width:'100px'}}>

  </Dropdown.Toggle>
  {localStorage.getItem('_token')?
  <Dropdown.Menu>
    <Dropdown.Item   ><Link to='/profile' style={{textDecoration:'none',color:'black'}}>Profile</Link></Dropdown.Item>
    <Dropdown.Item onClick={logout}><Link to='/login' style={{textDecoration:'none',color:'black'}}>Logout</Link></Dropdown.Item>
   
  </Dropdown.Menu>:
  <Dropdown.Menu>
     <Dropdown.Item   ><Link to='/login' style={{textDecoration:'none',color:'black'}}>Login</Link></Dropdown.Item>
    <Dropdown.Item ><Link to='/registration' style={{textDecoration:'none',color:'black'}}>Register</Link></Dropdown.Item>
   
  </Dropdown.Menu>
}
</Dropdown>
    </Navbar.Collapse>
                   

    
 
 </Container>
 </Navbar> 
    </div>
</div>
  )
}

export default navigationBar