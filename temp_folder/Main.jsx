import React, { Component } from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { Route, Switch, withRouter } from 'react-router-dom'
import Home from "./Home"
import Signin from "./components/login/Signin";
import Signup from "./components/login/Signup";
import Contact from './Contact'
import OurService from './OurService'
import Phone from "./Phone"
import Navbar from "./Navbar"
import TV from "./TV"
import controller from "./controller"
import computercomp from "./computercomp"
import Printer from "./Printer"
import Cart from "./Cart"
import CartContextProvider from './CartContext'
import systembuild from './systembuild';
import {
    authUser, getUser, logoutUser, getProducts, postProduct, getCategories,
    postCategory, getOrders, postOrder, deleteOrder, getOrderDetails,
    updateProduct, getcategory, getProduct, deleteProduct
    , delCategory, getproductsFromCategory, deleteproductsFromCategory
    , updateOrder
} from './redux/ActionCreators';
import { connect } from 'react-redux'
import PostCategory from './postCategory'
import PostProduct from './postProduct'
import UpdateProduct from './updateProduct'

import Order from './order'
import ProductContextProvider from './ProductContext';



const mapStateToProps = (state) => {
    return {
        authState: state.auth,
        usersState: state.users,
        products: state.products,
        category: state.category,
        orderState: state.order,
        orderDetailsState: state.orderDetails
    }
}
const mapDispatchToProps = (dispatch) => ({
    authUser: (creds) => dispatch(authUser(creds)),
    logoutUser: () => dispatch(logoutUser()),
    getUser: () => dispatch(getUser()),
    //
    getProducts: () => dispatch(getProducts()),
    getProduct: (productId) => dispatch(getProduct(productId)),
    postProduct: (categId, productName, description, unitPrice, unitsInStock, image, featured) => dispatch(postProduct(categId, productName, description, unitPrice, unitsInStock, image, featured)),
    updateProduct: (productId, productName, description, unitPrice, unitsInStock, image, featured) => dispatch(updateProduct(productId, productName, description, unitPrice, unitsInStock, image, featured)),
    deleteProduct: (categId, productId) => dispatch(deleteProduct(categId, productId)),
    //
    getCategories: () => dispatch(getCategories()),
    getcategory: (categId) => dispatch(getcategory(categId)),
    delCategory: (categId) => dispatch(delCategory(categId)),
    getproductsFromCategory: (categId) => dispatch(getproductsFromCategory(categId)),
    deleteproductsFromCategory: (categId) => dispatch(deleteproductsFromCategory(categId)),
    postCategory: (categoryName) => dispatch(postCategory(categoryName)),
    //
    getOrders: () => dispatch(getOrders()),
    postOrder: (productId, quantity, to_be_suppliedDate, shippedDate) => dispatch(postOrder(productId, quantity, to_be_suppliedDate, shippedDate)),
    deleteOrder: (orderId) => dispatch(deleteOrder(orderId)),
    updateOrder: (orderId, orderDetailsId, quantity, to_be_suppliedDate, shippedDate) => dispatch(updateOrder(orderId, orderDetailsId, quantity, to_be_suppliedDate, shippedDate)),
    getOrderDetails: () => dispatch(getOrderDetails())
}
)
class Main extends Component {
    componentDidMount() {
        this.props.getUser();
        this.props.getProducts();
        this.props.getCategories();
        this.props.getOrders();
        this.props.getOrderDetails();
        console.log("this.props [main]: ", this.props);
    }


    render() {
        return (
            <div>
                <CartContextProvider>
                    <Navbar />
                    <div className="main">
                        <Switch>
                            <Route exact path="/" component={() => <Home auth={this.props.authState} productsFeatured={this.props.products.product.filter((prod) => prod.featured)} />}>
                            </Route>

                            <Route exact path="/Order" component={() => <Order getProduct={this.props.getProduct} products={this.props.products} PostOrder={this.props.postOrder} />}></Route>
                            <Route exact path="/PostCategory" component={() => <PostCategory postCategory={this.props.postCategory} />}></Route>
                            <Route exact path="/PostProduct" component={() => <PostProduct postProduct={this.props.postProduct}
                                category={this.props.category} />}></Route>
                            <Route exact path="/UpdateProduct" component={() => <UpdateProduct updateProduct={this.props.updateProduct}
                                products={this.props.products} />}></Route>
            //////////////////////////
                            <Route exact path="/contact" component={Contact}></Route>

                            <Route exact path="/signin" component={Signin}></Route>
                            <Route exact path="/signup" component={Signup}></Route>
                            <Route exact path="/ourservice" component={OurService}></Route>
                            <Route exact path="/systembuilt" component={systembuild}></Route>
                            <Route exact path="/phone" component={Phone}></Route>
                            <Route exact path="/TV" component={TV}></Route>
                            <Route exact path="/controller" component={controller}></Route>
                            <Route exact path="/computer" component={computercomp}></Route>
                            <Route exact path="/printer" component={Printer}></Route>
                            <Route exact path="/cart" component={Cart}></Route>

                        </Switch>
                    </div>

                </CartContextProvider>
            </div >
        )
    }

}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));