import React, { useContext } from 'react'
import { baseUrl } from './shared/baseUrl'
import {CartContext} from "./CartContext"

const ViewProduct=(props)=>{
    console.log(props.location.state);
    const ID = props.location.state;
    const {dispatch}=useContext(CartContext);
    props.getProduct(ID);
    const product=props.product
    return(
        <>
            <div className="products">
                <div className="product" key={product.product._id}>
                    
                    <div className="product-img">
                        <img src={baseUrl+product.product.image} alt="not found" />
                    </div>
                    <div className="product-details">
                        <div className="product-name">{product.product.name}</div>
                        <div className="product-price">Rs.{product.product.price}.00</div>
                    </div>
                   
                    <div className="add-to-cart" onClick={()=>dispatch({type:'ADD_TO_CART',id:product.product._id,product})} > add to cart</div>
                    {product.status==='Hot'?<div className="hot">Hot</div>:""}
                    {product.status==='New'?<div className="new">New</div>:""}
                </div>
        </div>
        </>
    )
}

export default ViewProduct;