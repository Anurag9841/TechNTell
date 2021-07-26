import React,{useContext} from "react";
import {ProductContext3} from "./ProductContext3"
import {CartContext} from "../../CartContext"

const Product3=()=>{
    const {products}=useContext(ProductContext3);
    const {dispatch}=useContext(CartContext);
   

    return(
        <div className="products">
            {products.map((product)=>(
                <div className="product" key={product.id}>
                    
                    <div className="product-img">
                        <img src={product.image} alt="not found"/>
                    </div>
                    <div className="product-details">
                        <div className="product-name">{product.name}</div>
                        <div className="product-price">Rs.{product.price}.00</div>
                    </div>
                   
                    <div className="add-to-cart" onClick={()=> dispatch({type:'ADD_TO_CART',id:product.id,product})}> add to cart</div>
                    {product.status==='Hot'?<div className="hot">Hot</div>:""}
                    {product.status==='New'?<div className="new">New</div>:""}
                </div>
            ))}
        </div>
    )
}
export default Product3;