import React, { useContext } from 'react'
import { baseUrl } from './shared/baseUrl'
import {CartContext} from "./CartContext"

const ShowProduct=(props)=>{
    const {dispatch}=useContext(CartContext);
    console.log(props.location.state)
    props.getcategory(props.location.state)
    const products=props.category.category.products
    console.log("yggg"+products)
    return(
        <>
                   <div className="products">
            
            {props.category.category.products.map((product)=>(
                <div className="product" key={product._id}>
                    
                    <div className="product-img">
                        <img src={baseUrl+product.image} alt="not found" />
                    </div>
                    <div className="product-details">
                        <div className="product-name">{product.name}</div>
                        <div className="product-price">Rs.{product.price}.00</div>
                    </div>
                   
                    <div className="add-to-cart" onClick={()=>dispatch({type:'ADD_TO_CART',id:product.id,product})} > add to cart</div>
                    {product.status==='Hot'?<div className="hot">Hot</div>:""}
                    {product.status==='New'?<div className="new">New</div>:""}
                </div>
            ))}
        </div>

        </>
    )
}

export default ShowProduct;