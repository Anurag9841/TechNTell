import React,{useContext} from "react";
import {ProductContext} from "./ProductContext"
import {CartContext} from "./CartContext"
import {baseUrl} from "./shared/baseUrl";
const Products=(props)=>{
    // const {products}=useContext(ProductContext);
    const {dispatch}=useContext(CartContext);
    const products = props.productsFeatured;
    return(
        <div className="products">
            {products.map((product)=>(
                <div className="product" key={product._id}>
                    
                    <div className="product-img">
                        <img src={baseUrl + product.image} alt="not found"/>
                    </div>
                    <div className="product-details">
                        <div className="product-name">{product.name}</div>
                        <div className="product-price">Rs.{product.price}.00</div>
                    </div>
                   
                    <div className="add-to-cart" style={{alignSelf:"center"}} onClick={()=>dispatch({type:'ADD_TO_CART',id:product._id,product})} > add to cart</div>
                    {product.status==='Hot'?<div className="hot">Hot</div>:""}
                    {product.status==='New'?<div className="new">New</div>:""}
                </div>
            ))}
        </div>
    )
}
export default Products;