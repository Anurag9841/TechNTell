import React, { useContext,useState } from 'react'
import { baseUrl } from './shared/baseUrl'
import {CartContext} from "./CartContext"
import { Button, Form, FormGroup, Label, Input,Card, CardImg,
    CardText, CardBody, CardTitle, CardSubtitle, } from "reactstrap";
const ViewProduct=(props)=>{

    const [data, setData] = useState({
        comment: "",
        rating: 0,
    });

    const ChangeEvent = (event) => {
        const { name, value } = event.target;

        setData((preVal) => {
            return {
                ...preVal,
                [name]: value,
            };
        });

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Comment is ${data.comment}.and the rating is ${data.rating}`);
    };
    const product = props.location.state;
    console.log(props.location.state);
    //const ID = props.location.state;
    const {dispatch}=useContext(CartContext);
    // props.getProduct(ID);
    //const product=props.product
    return(
        <>
            <div className="products">
                <div className="product" key={props.location.state._id}>
                    <Card>
                        <CardImg top width="100%" src={baseUrl+props.location.state.image} alt="Card image cap" />
                        <CardBody>
                            <CardTitle tag="h5">{props.location.state.name}</CardTitle>
                            <Button className="add-to-cart" onClick={()=>dispatch({type:'ADD_TO_CART',id:props.location.state._id,product})}>Add to cart</Button>
                        </CardBody>
                    </Card>
                    <div className="my-5">
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                            <Label for="exampleText">Comment</Label>
                            <Input type="textarea" value={data.comment} name="comment" onChange={ChangeEvent} id="exampleText" />
                            <Label for="exampleSelect">Rating</Label>
                            <Input type="select" value={data.rating} onChange={ChangeEvent} name="rating" id="exampleSelect">
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Input>
                            <Button type="submit">Submit</Button>
                            </FormGroup>                            
                        </Form>
                    </div>
                </div>
                <div className="product-details">
                        <div className="product-description">{props.location.state.description}</div>
                        <div className="product-price">Rs.{props.location.state.price}.00</div>
                </div>    
            </div>
        </>
    );
};

export default ViewProduct;