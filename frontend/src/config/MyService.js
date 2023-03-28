import axios from 'axios';
import { MAIN_URL } from './Url';

export function addCategory(data){
    console.log(data)
    return axios.post(`${MAIN_URL}posts/addcategory`,data);
}
export function addsubcategory(data){
    console.log(data)
    return axios.post(`${MAIN_URL}posts/addsubcategory`,data);
}

export function getCategory(){
    return axios.get(`${MAIN_URL}posts/getcategory`);
}
export function getsubCategory(){
    return axios.get(`${MAIN_URL}posts/getsubcategory`);
}
export function DeleteSubCategory(data){
    console.log(data)
    return axios.post(`${MAIN_URL}posts/delsubcategory`,data);
}
export function EditSubcategory(data){
    console.log(data)
    return axios.post(`${MAIN_URL}posts/editsubcategory`,data);
}
export function Deletecategory(data){
    console.log(data)
    return axios.post(`${MAIN_URL}posts/deletecategory`,data);
}
export function ProductDetails(data){
    console.log(data)
    return axios.post(`${MAIN_URL}posts/prodetails`,data);
}

export function getAllProducts(){
    return axios.get(`${MAIN_URL}posts/getproducts`);
}

export function ProductImage(data){
    console.log(data)
    return axios.post(`${MAIN_URL}posts/productimage`,data);
}
export function ProductMultImage(data){
    console.log(data)
    return axios.post(`${MAIN_URL}posts/productmultimage`,data);
}
export function getProducts(){
    return axios.get(`${MAIN_URL}posts/getproduct`);
}

export function DeleteProduct(data){
    console.log(data)
    return axios.post(`${MAIN_URL}posts/deleteproduct`,data);
}
export function EditProduct(data){
    console.log(data)
    return axios.post(`${MAIN_URL}posts/editproduct`,data);
}

export function UpdateImage(data){
    console.log(data)
    return axios.post(`${MAIN_URL}posts/updateimage`,data);
}
export function UpdatesubImage(data){
    console.log(data)
    return axios.post(`${MAIN_URL}posts/updatesubimage`,data);
}
export function ChangeProfile(data){
    console.log(data)
    return axios.post(`${MAIN_URL}posts/changeprofile`,data);
}

export function Register(data){
    console.log(data)
    return axios.post(`${MAIN_URL}posts/register`,data);
}
export function getAll(){
    return axios.get(`${MAIN_URL}posts/getall`);
}
export function getUserData(data){
    console.log(data)
    return axios.post(`${MAIN_URL}posts/getuserdata`,data);
}
