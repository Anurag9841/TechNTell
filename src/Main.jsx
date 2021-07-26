import React, { Component } from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { Route, Switch, withRouter } from 'react-router-dom'
import Home from "./Home"
import Contact from './Contact'
import Navbar from "./Navbar"
import Cart from "./Cart"
import CartContextProvider from './CartContext'
import {
    authUser, getUser, logoutUser, getProducts, postProduct, getCategories,
    postCategory, getOrders, postOrder, deleteOrder, getOrderDetails,
    updateProduct, getcategory, getProduct, deleteProduct
    , delCategory, getproductsFromCategory, deleteproductsFromCategory
    , updateOrder,
    signUp,
    getComments,
    postComment,
    getCompProducts
} from './redux/ActionCreators';
import { connect } from 'react-redux'
import PostCategory from './postCategory'
import PostProduct from './postProduct'
import UpdateProduct from './updateProduct'
import Order from './order';

import OurService from './OurService';

import Signin from "./components/login/Signin";
import Signup from "./components/login/Signup";


// products
import TV from "./category_products/TV/TV"
import Phone from "./category_products/phone/Phone"
import controller from "./category_products/controller/controller"
import Printer from "./category_products/printer/Printer"
import computercomp from "./category_products/computercomp/computercomp"

//----

import ViewProduct from "./viewProduct"
import ShowProduct from './showProduct';
import Register from './register'
import Systembuild from './system_build/systembuild'
import ComponentTable from "./system_build/ComponentTable";


const mapStateToProps = (state) => {
    return {
        comments: state.comments,
        product: state.product,
        authState: state.auth,
        usersState: state.users,
        products: state.products,
        categorys: state.categorys,
        order: state.order,
        orderDetailsState: state.orderDetails,
        category: state.category,
        compProducts: state.compProducts
    }
}
const mapDispatchToProps = (dispatch) => ({
    authUser: (creds) => dispatch(authUser(creds)),
    logoutUser: () => dispatch(logoutUser()),
    getUser: () => dispatch(getUser()),
    signup: (fname, lname, username, email, password) => dispatch(signUp(fname, lname, username, email, password)),
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
    postOrder: (productId, quantity, totalPrice) => dispatch(postOrder(productId, quantity, totalPrice)),
    deleteOrder: (orderId, orderDetailsId) => dispatch(deleteOrder(orderId, orderDetailsId)),
    updateOrder: (orderId, orderDetailsId, quantity, to_be_suppliedDate, shippedDate) => dispatch(updateOrder(orderId, orderDetailsId, quantity, to_be_suppliedDate, shippedDate)),
    getOrderDetails: (Id) => dispatch(getOrderDetails(Id)),
    //
    getComments: () => dispatch(getComments()),
    postComment: (comment, rating, productId) => dispatch(postComment(comment, rating, productId)),
    //deleteComment: ()

    // Component products
    getCompProducts: () => dispatch(getCompProducts())
}
)
class Main extends Component {
    componentDidMount() {
        this.props.getUser();
        this.props.getProducts();
        this.props.getCategories();
        this.props.getOrderDetails();
        this.props.getComments();
        this.props.getOrders();
        this.props.getCompProducts();
        console.log("this.props.products [main.jsx] ", this.props.products);
    }
    render() {
        return (
            <div>
                <CartContextProvider>
                    <Navbar logout={this.props.logoutUser} user={this.props.usersState} auth={this.props.authState} product={this.props.product} user={this.props.usersState} getcategory={this.props.getcategory} category={this.props.category} categorys={this.props.categorys} />

                    <div className="main">
                        <Switch>
                            <Route exact path="/" component={() => <Home auth={this.props.authState} productsFeatured={this.props.products.product.filter((prod) => prod.featured)} />}>
                            </Route>

                            <Route exact path="/order" component={() => <Order getOdetails={this.props.getOrderDetails} orders={this.props.order} deleteOrder={this.props.deleteOrder} />}></Route>
                            {/* <Route exact path="/Orderad" component={()=><Orderad getOdetails={this.props.getOrderDetails} orders={this.props.order} deleteOrder={this.props.deleteOrder}/>}></Route> */}
                            <Route exact path="/PostCategory" component={() => <PostCategory postCategory={this.props.postCategory} />}></Route>
                            <Route exact path="/PostProduct" component={() => <PostProduct postProduct={this.props.postProduct}
                                category={this.props.categorys} />}></Route>
                            <Route exact path="/UpdateProduct" component={() => <UpdateProduct updateProduct={this.props.updateProduct}
                                products={this.props.products} />}></Route>
            //////////////////////////
                            <Route exact path="/contact" component={Contact}></Route>
                            <Route  exact path="/ourservice"component={OurService}></Route>
                            
                            <Route  exact path="/TV"component={TV}></Route>
                            <Route  exact path="/phone"component={Phone}></Route>
                            <Route  exact path="/controller"component={controller}></Route>
                            <Route  exact path="/computer"component={computercomp}></Route>
                            <Route  exact path="/printer"component={Printer}></Route>
                            {/*
            <Route  exact path="/systembuilt"component={systembuild}></Route>
            <Route  exact path="/cart" component={Cart}></Route>
        <Route exact path="/contact" component={Contact}></Route> */}
                            

                            <Route exact path="/signin" component={
                                () =>
                                    <Signin auth={this.props.authState} authUser={this.props.authUser} logoutUser={this.props.logoutUser} />

                            }></Route>

                            <Route exact path="/signup" component={() => <Signup signup={this.props.signup} />}></Route>

                            <Route exact path="/showProduct" component={(props) => <ShowProduct {...props} auth={this.props.authState} category={this.props.category} getcategory={this.props.getcategory} />}></Route>

                            <Route exact path="/viewProduct" component={(props) => <ViewProduct {...props} auth={this.props.authState} comments={this.props.comments} product={this.props.product} postComment={this.props.postComment} getProduct={this.props.getProduct} />}></Route>
                            <Route exact path="/cart" component={() => <Cart order={this.props.postOrder} />}></Route>

                            <Route exact path="/systembuilt" component={() => <Systembuild getCompProducts={this.props.getCompProducts} compProducts={this.props.compProducts} />} />
                            <Route exact path="/show_component" component={() => <ComponentTable compProducts={this.props.compProducts} />} />
                        </Switch>
                    </div>
                </CartContextProvider>
            </div>
        )
    }

}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));