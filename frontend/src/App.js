import logo from './logo.svg';
import './App.css';
import Category from './components/Admin/Category/Category';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Subcategory from './components/Admin/Category/Subcategory';
import Products from './components/Admin/Product/Products';
import ViewCategory from './components/Admin/Category/ViewCategory';
import ProductImages from './components/Admin/Product/ProductImages';
import AllProducts from './components/Admin/Product/AllProducts';
import Registration from './components/User/Registration';
import NavigationBar from './components/NavigationBar';
import Login from './components/User/Login';
import Dashboard from './components/User/Dashboard/Dashboard.js';
function App() {
  return (
    <div className="App">

<BrowserRouter>

  <Routes>

  <Route path="/" element={<Home />} />
  <Route path="/category" element={<Category />} />
  <Route path="/subcategory" element={<Subcategory />} />
  <Route path="/addproduct" element={<Products />} />
  <Route path="/proimages" element={<ProductImages />} />
  <Route path="/viewcategory" element={<ViewCategory />} />
  <Route path="/products" element={<AllProducts />} />
  <Route path="/registration" element={<Registration />} />
  <Route path="/login" element={<Login/>} />
  <Route path="/navbar" element={<NavigationBar/>} />
  <Route path="/dashboard" element={<Dashboard/>} />
  </Routes>


</BrowserRouter>

    </div>
  );
}

export default App;
