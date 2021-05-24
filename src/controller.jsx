import React from 'react'
import ProductContext2Provider from "./ProductContext2"
import Product2 from "./Product2"
const controller=()=>{
    return(
        <>
         <h1 className="top_product">Games and Controller</h1>
        < ProductContext2Provider>
        <div className="container">
        <Product2/>
        </div>
        </ProductContext2Provider>
        </>
    
    )
}
export default controller;