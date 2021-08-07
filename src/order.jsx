import react,{useState} from "react"
import { Media,DropdownButton,Dropdown,Container, FormControl,Button,InputGroup} from 'react-bootstrap';
function RenderOneProduct  ({product}){
    return(
    <react.Fragment>
        <Media as="li">
            <Media.Body>
                <h5>{product.name}</h5>
            </Media.Body>
        </Media>
    </react.Fragment>
    )
}
function RenderProducts (props){
    const oneProduct = props.products.product.map((product) => {

        return (
            <RenderOneProduct product={product} key={product._id}/>
        );
        
    });
    return (
        <div>
            <ul className="list-unstyled" >
                {oneProduct}
            </ul>
        </div>);
}
const Order= (props)=>{
    const Products=["Select Product"]
    {props.products.product.map((product)=>{(Products.push(product))})}
    
    const [data2] = useState({
        productId: 0
    });

    const [data, setData] = useState({
        quantity:null,
    });
    const InputEvent2 = (event) => {
        
        const { value } = event.target;
        console.log(value)
        var product= 0
        for(var i=0;i<Products.length;i++){
            if(value===Products[i].name){product=Products[i]._id}
        }
        console.log(product)
        data2.productId=product
        
    };
    const InputEvent = (event) => {
        const { name, value } = event.target;

        setData((preVal) => {
            return {
                ...preVal,
                [name]: value,
            };
        });

    };

    const formSubmit = (e) => {
        console.log(data2.productId)
        props.PostOrder(data2.productId,data.quantity)
        e.preventDefault();
        alert(` QUANTITY: ${data.quantity}`);
    };
    const makeItem=(X)=>{
        return <option>{X.name}</option>
    }


    return(
        <>
            <div className="my-5">
                <h1 className="text-center">Place Order</h1>
            </div>
            <div className="container customise_div">
                <div className="row">
                    <div className="col-md-6 col-10 x-auto">
                        <select onChange={InputEvent2}>
                            {Products.map(makeItem)}
                        </select>
                        <h1>Product Detail</h1>
                        <Container>
                            {/* {props.getProduct(data2.productId)} */}
                            {/* <RenderProducts products={props.products}/> */}
                        </Container>
                        <form onSubmit={formSubmit}>
                        <div className="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Quantity</label>
                                <input
                                    type="number"
                                    class="form-control"
                                    id="exampleFormControlInput1"
                                    name="quantity"
                                    value={data.quantity}
                                    onChange={InputEvent}
                                    placeholder=" " />
                            </div>
                            <div className="col-12 py-2">
                                <button className="btn btn-outline-primary" type="submit">Order Now</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Order;