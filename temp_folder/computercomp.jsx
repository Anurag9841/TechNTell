import React from 'react'
import ProductContext3Provider from "./ProductContext3"
import Product3 from "./Product3"
const computercomp=()=>{
    return(
        <>
         <h1 className="top_product">Computer Components</h1>
        < ProductContext3Provider>
       
        <Product3/>
        
        </ProductContext3Provider>
        </>
    
    )
}
export default computercomp;