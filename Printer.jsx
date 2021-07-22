import React from 'react'
import ProductContext4Provider from "./ProductContext4"
import Product4 from "./Product4"
const Printer=()=>{
    return(
        <>
         <h1 className="top_product">Printer</h1>
        < ProductContext4Provider>
        
        <Product4/>
        
        </ProductContext4Provider>
        </>
    
    )
}
export default Printer;