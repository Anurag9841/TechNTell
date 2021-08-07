import React from 'react'
import  { useContext } from 'react'
import KhaltiCheckout from "khalti-checkout-web";
import config from "./khalticonfig";
import { CartContext } from '../../../CartContext';
export default function khalti() {
    let checkout = new KhaltiCheckout(config);
    const { shoppingCart, totalPrice, qty, dispatch } = useContext(CartContext);
    let buttonStyles={
        backgroundColor: "purple",
        padding: "10px",
        color:" white",
        cursor:"pointer",
        fontweight: "bold",
        border: "1px solid white",
      };
    return (
        <div>
            <button onClick={()=>checkout.show({amount: totalPrice})} style={buttonStyles}>Pay Via Khalti</button>
        </div>
    )
}
/* npm i axios*/