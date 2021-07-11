import react,{useState} from "react"
import { Button,Card,Badge, CardBody, CardTitle, CardSubtitle, CardImg, } from "reactstrap";
import { baseUrl } from './shared/baseUrl'
// function RenderOneProduct  ({product}){
//     return(
//     <react.Fragment>
//         <Media as="li">
//             <Media.Body>
//                 <h5>{product.name}</h5>
//             </Media.Body>
//         </Media>
//     </react.Fragment>
//     )
// }
// function RenderProducts (props){
//     const oneProduct = props.products.product.map((product) => {

//         return (
//             <RenderOneProduct product={product} key={product._id}/>
//         );
        
//     });
//     return (
//         <div>
//             <ul className="list-unstyled" >
//                 {oneProduct}
//             </ul>
//         </div>);
// }
const Order= (props)=>{
    const handleClick=(oId,odId)=>{
        console.log(oId,odId);
        props.deleteOrder(oId,odId);
        window.location.reload(false);
    }
    return(
    <>
    <h1 align="center"><Badge color="secondary">Your Orders</Badge></h1>
        <div className="container">
        
            <div className="row">
                {props.orders.order.map((order)=>(
                    <div className="column">
                    <Card style={{ width: '22rem' }}>
                            <CardBody>
                                <CardImg top width="100%" height="70%" src={baseUrl + order.products.image }></CardImg>
                                <CardTitle tag="h6">{"Product Name: "+ order.products.name}</CardTitle>
                                <CardSubtitle tag="h6">{"Quantity: "+order.orderDetails[0].quantity}</CardSubtitle>
                            </CardBody>
                            
                            <CardBody>
                                <CardTitle tag="h5"> {"User :" + order.customer.fname}</CardTitle>
                                <CardSubtitle tag="h6">{order.to_be_suppliedDate}</CardSubtitle>
                                <CardSubtitle tag="p"> {"Order date: "+new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(order.orderDetails[0].orderDate)))}</CardSubtitle>
                                <CardSubtitle tag="p"> {order.customer.email}</CardSubtitle>
                                <CardSubtitle tag="p">{"Shipped Status: "+order.orderDetails[0].shipped}</CardSubtitle>
                                <CardSubtitle tag="p">{"total Price: Rs "+order.orderDetails[0].totalPrice}</CardSubtitle>                                
                                <Button color="danger" onClick={()=>handleClick(order._id,order.orderDetails[0]._id)}>Delete</Button>
                            </CardBody>
                        </Card>
                        </div>
                        ))}
                </div>
            </div>
    </>
    )
}

export default Order;