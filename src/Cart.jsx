import React,{useContext} from 'react'
import {CartContext}from './CartContext'

const Cart=()=>{
    const data = useContext(CartContext);
    console.log(data);
    
    return(
        <div className="cart-container">
            <div className="cart-details" style={{marginTop:"50px"}}>
                <h2>Shopping Cart</h2>
            </div>
        </div>
    )
}
export default Cart;