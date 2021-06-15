import React from 'react'
import Banner from "../src/Banner"
import ProductContextProvider from './ProductContext';
import CartContextProvider from './CartContext';
import Products from "./product";
const Home=(props)=>{
    return(
        <>
        <Banner/>
        <h1 className="top_product">Our Top Products</h1>
        <span></span>
        < ProductContextProvider>
        
        <div className="container">
        <Products productsFeatured={props.productsFeatured}/>
        </div>
        
        </ProductContextProvider>
        </>
    )
}
export default Home;