import React from 'react'
import NavigationBar from './NavigationBar'
import {Carousel} from 'react-bootstrap'
import {Link} from 'react-router-dom'
function Home() {
  return (
  <div>
     <NavigationBar/>
      <Carousel style={{margin:'20px'}}>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://a.cdn-hotels.com/gdcs/production179/d586/cc1389d9-c3fd-40db-bbd7-29687b844fa9.jpg"
      alt="First slide"
      height="500px"
    />
    <Carousel.Caption>
    <h3 style={{fontWeight:'1000',color:'black',fontStyle:'italic'}}>Welcome To Neosoft Fashion</h3>
    <Link to="/" class="btn1" style={{textDecoration:'none',letterSpacing:'2px',transition:'0.5%',fontSize:'15px',color:'white',display:'inline-block',padding:'10px 30px',marginTop:'20px', marginRight:'30px',textTransform:'uppercase',fontWeight:'700'}} >Join Us</Link>

    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://img5.goodfon.com/wallpaper/nbig/0/89/stil-interer-mebel-divan-gostinaia-style-interior-furniture.jpg"
      alt="Second slide"
      height="500px"
    />

    <Carousel.Caption>
    <h3 style={{fontWeight:'1000',color:'black',fontStyle:'italic'}}>Welcome To Neosoft Fashion</h3>
    <a href="/" class="btn1" style={{textDecoration:'none',letterSpacing:'2px',transition:'0.5%',fontSize:'15px',color:'white',display:'inline-block',padding:'10px 30px',marginTop:'20px', marginRight:'30px',textTransform:'uppercase',fontWeight:'700'}} >Join Us</a>

    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://images.unsplash.com/photo-1481437156560-3205f6a55735?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c2hvcHBpbmd8ZW58MHx8MHx8&w=1000&q=80"
      alt="Third slide"
      height="500px"
    />

    <Carousel.Caption>
    <h3 style={{fontWeight:'1000',color:'black',fontStyle:'italic'}}>Welcome To Neosoft Fashion</h3>
    <a href="/" class="btn1" style={{textDecoration:'none',letterSpacing:'2px',transition:'0.5%',fontSize:'15px',color:'white',display:'inline-block',padding:'10px 30px',marginTop:'20px', marginRight:'30px',textTransform:'uppercase',fontWeight:'700'}} >Join Us</a>

    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
  </div>
  )
}

export default Home