import React, { useContext } from 'react'
import { baseUrl } from './shared/baseUrl'
import {CartContext} from "./CartContext"
import { useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input,Card, CardImg,
    CardText, CardBody, CardTitle, CardSubtitle, } from "reactstrap";
const ShowProduct=(props)=>{
    const auth=props.auth.isAuthenticated;
    const {dispatch}=useContext(CartContext);
    const history=useHistory();
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
    // const getCAT=()=>{
    // props.getcategory(props.location.state)
    // }
    if(props.location.state.products===null){
        return(
            <>
                <div>
                    <h5>No Products to show right now</h5>
                </div>
            </>
        )
    }
    else{
    return(
    <>
        <div className="container">
            <div className="row">
                    
                        {/* {getCAT()} */}
                        
                        {props.location.state.products.map((product)=>(
                            <div className="column">
                            <Card height="70%"key={product._id} style={{ width: '22rem' }} >
                            <CardImg top width="100%" height="70%" src={baseUrl+product.image} alt="Card image cap"  onClick={()=>handleClick(product)}/>
                            <CardBody>
                                <CardTitle tag="h5">{product.name}</CardTitle>
                                <CardSubtitle tag="h5">Rs.{product.price}.00</CardSubtitle>
        
                                {cartShow(product,auth)}
                            </CardBody>
                        </Card>
                        </div>
                        ))}
                    
                </div>
        </div>
    </>
    )}
}

export default ShowProduct;