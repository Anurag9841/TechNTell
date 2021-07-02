import React, { useContext,useState } from 'react'
import { baseUrl } from './shared/baseUrl'
import {CartContext} from "./CartContext"
import { Button, Form, FormGroup, Label, Input,Card, CardImg,
    CardText, CardBody, CardTitle, CardSubtitle, } from "reactstrap";
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
// import logo from "./image/images (1).png"
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
        props.postComment(data.comment,data.rating,props.location.state._id)
        alert(`Comment is ${data.comment}.and the rating is ${data.rating}`);
    };
    const product = props.location.state;
    
    const {dispatch}=useContext(CartContext);
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
                    
                </div>
                <div className="product-details">
                        <div className="product-description">{props.location.state.description}</div>
                        <div className="product-price">Rs.{props.location.state.price}.00</div>
                        
                        <div classname="comment">
                            <div>
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
                </div>    
                <div className="comments">
                <div className="center">
                <h5>Comments</h5>
                    {props.location.state.comments.map((comments)=>(
                            <Card bg="dark"  style={{ width: '18rem' }}>
                            <CardBody>
                                {/* <CardImg src={logo} alt="logo"/> */}
                                <CardTitle tag="h5">{comments.comment}</CardTitle>
                                <CardTitle tag="h6">{"rating: "+comments.rating+" stars"}</CardTitle>
                                <CardTitle tag="p">{"author: "+comments.author}</CardTitle>
                                <CardSubtitle tag="p"> {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comments.updatedAt)))}</CardSubtitle>
                            </CardBody>
                        </Card>
                        ))}
                </div>  
            </div>
            </div>
        </>
    );
};

export default ViewProduct;