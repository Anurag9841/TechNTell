import React,{useContext} from "react";
import {ProductContext5} from "./ProductContext5"
import {CartContext} from "./CartContext"
const System=()=>{
    const {products}=useContext(ProductContext5);
    const {dispatch}=useContext(CartContext);
    

    return(
      
        <div>
      
        <div className="container-fluid text-center">
            <div className="row">
                <div className="col-10 col-lg-3">
                    <div className="head">Product</div>
                </div>
                <div className="col-10 col-lg-3">
                    <div className="head">Name</div>
                </div>
                <div className="col-10 col-lg-3">
                    <div className="head">Price</div>
                     </div>
            </div>
        </div>
        
        {products.map((product)=>(
        <div className="container-fluid text-center">
            
            <div className="row">
             <div className="col-10 col-lg-3">
                 <span className="cart-image"><img src={product.image} alt="not found"/></span>
             
                </div>
                <div className="col-10 col-lg-3">
             <div className="product-name1">{product.name} </div>
                </div>
                <div className="col-10 col-lg-3">
            Rs. {product.price} 
                </div>
                <div className="col-10 col-lg-3">
                <div className="add" onClick={()=>dispatch({type:'ADD_TO_CART',id:product.id,product})} > add</div>
                </div>
                 </div> 
                 
            
        
        </div>
))}

    </div>

    )
}
export default System;