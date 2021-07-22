import React from 'react'
import ProductContext5Provider from "./ProductContext5"
import System from "./System"
const systembuild=()=>{
    return(
        <>
         <h1 className="top_product">System Build</h1>
        < ProductContext5Provider>
        <div className="container">
        <System/>
        </div>
        </ProductContext5Provider>
        </>
    
    )
}
export default systembuild;