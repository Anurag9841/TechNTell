import React,{useContext} from 'react'
import {CartContext}from './CartContext'

const Cart=()=>{
    const {shoppingCart,totalPrice,qty,dispatch} = useContext(CartContext);
    
    
    return(
        <div className="cart-container">
            <div className="cart-details" style={{marginTop:"50px"}}>
                {shoppingCart.length > 0 ? 
                shoppingCart.map(cart=>(
                <div className="cart" key={cart.id}>
                    <span className="cart-image"><img src= {baseUrl + cart.image} alt="not found"/></span>
                    <span className="cart-product-name">{cart.name}</span>
                    <span className="cart-product-price">Rs.{cart.price}</span>
                    <span className="inc"onClick={()=>dispatch({type:"INC",id:cart._id,cart})}><i className="fas fa-plus"></i></span>
                    <span className="product-quantity">{cart.qty}</span>
                    <span className="dec"onClick={()=>dispatch({type:"DEC",id:cart._id,cart})}><i className="fas fa-minus"></i></span>
                    <span className="product-totalprice">Rs.{cart.price*cart.qty}</span>
                    <span className="delete-product" onClick={()=>dispatch({type:"DELETE",id:cart._id,cart})}><i className="fas fa-trash-alt"></i></span>

                </div>
                ))
                :<h1 >sorry your cart is currently empty</h1>}
            </div>
        </div>
    )
}
export default Cart;