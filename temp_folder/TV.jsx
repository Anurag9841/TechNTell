import React from 'react'
import ProductContext1Provider from "./ProductContext1"
import Product1 from "./Product1"
const TV=()=>{
    return(
        <>
         <h1 className="top_product">Smart Tv And Watch</h1>
        < ProductContext1Provider>
        
        <Product1/>
        
        </ProductContext1Provider>
        </>
    
    )
}
export default TV;