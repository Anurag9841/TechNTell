import React,{useContext} from "react";
import {CartContext} from "./CartContext";
import {baseUrl} from './shared/baseUrl';
import {useHistory} from "react-router-dom";
import { Button, Form, FormGroup, Label, Input,Card, CardImg,
    CardText, CardBody, CardTitle, CardSubtitle, } from "reactstrap";

    
const Products=(props)=>{
    const auth=props.auth.isAuthenticated;
    const history = useHistory();
    const {dispatch}=useContext(CartContext);
    const products = props.productsFeatured;
    
    const handleClick=(product)=>{
        history.replace({pathname:"/viewProduct",state:product});
    }

    const cartShow=(product,auth)=>{
        if(auth){
            return <Button className="add-to-cart" onClick={()=>dispatch({type:'ADD_TO_CART',id:product._id,product})}>Add to cart</Button>
         }
         else{
             return(<div></div>)
         }
    }
    return(
        <>
        <div className="products" >
                       
                {products.map((product)=>(
                    <Card key={product._id} style={{ width: '22rem' }} >
                    <CardImg top width="100%" height="70%" src={baseUrl+product.image} alt="Card image cap"  onClick={()=>handleClick(product)}/>
                    <CardBody>
                        <CardTitle tag="h5">{product.name}</CardTitle>
                        <CardSubtitle tag="h5">Rs.{product.price}.00</CardSubtitle>

                        {cartShow(product,auth)}
                    </CardBody>
                </Card>))}
                {/* // <div className="product" key={product._id}>
                //     <div className="product-img">
                //         <img src={baseUrl+product.image} alt="not found" key={product._id} onClick={()=>handleClick(product)}/>
                //     </div>
                //     <div className="product-details">
                //         <div className="product-name">{product.name}</div>
                //         <div className="product-price">Rs.{product.price}.00</div>
                //     </div>
                   
                //     <div className="add-to-cart" onClick={()=>dispatch({type:'ADD_TO_CART',id:product._id,product})} > add to cart</div>
                //     {product.status==='Hot'?<div className="hot">Hot</div>:""}
                //     {product.status==='New'?<div className="new">New</div>:""}
                // </div> */}
            
        </div>
        </>
    )
}
export default Products;