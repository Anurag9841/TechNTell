import React from 'react'
import Banner from "../src/Banner"
import ProductContextProvider from './ProductContext';
import Products from "./product";
const Home=()=>{
    return(
        <>
        <Banner/>
        <h1 className="top_product">Our Top Products</h1>
        < ProductContextProvider>
        <div className="container">
        <Products/>
        </div>
        </ProductContextProvider>
        </>
    )
}
export default Home;