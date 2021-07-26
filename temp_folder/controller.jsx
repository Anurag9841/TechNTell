import React from 'react'
import ProductContext2Provider from "./ProductContext2"
import Product2 from "./Product2"
const controller=()=>{
    return(
        <>
         <h1 className="top_product">Games and Controller</h1>
        < ProductContext2Provider>
        
        <Product2/>
       
        </ProductContext2Provider>
        </>
    
    )
}
export default controller;