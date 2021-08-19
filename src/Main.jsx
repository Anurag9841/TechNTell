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

import Systembuild from './system_build/systembuild'
import System from './system_build/System'

import ComponentTable from "./system_build/ComponentTable";


import {
    authUser, getUser, logoutUser, getProducts, postProduct, getCategories,
    postCategory, getOrders, postOrder, deleteOrder, getOrderDetails,
    updateProduct, getcategory, getProduct, deleteProduct
    , delCategory, getproductsFromCategory, deleteproductsFromCategory
    , updateOrder,
    signUp,
    getComments,
    postComment,
    getCompProducts,
    postCollection,
    getCollections,
} from './redux/ActionCreators';

import ShowProduct from './showProduct';

import { connect } from 'react-redux'
import PostCategory from './postCategory'
import PostProduct from './postProduct'
import UpdateProduct from './updateProduct'
import Order from './order'



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
        compProducts: state.compProducts,
        pcAndCustomCollections: state.pcAndCustomCollections
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
    getCompProducts: (indx) => dispatch(getCompProducts(indx)),

    postCollection: (collectionName, collectionDescription, prodChosen, collectionType, columnsComboName, columnsComboDescription, columnsChosen) => dispatch(postCollection(collectionName, collectionDescription, prodChosen, collectionType, columnsComboName, columnsComboDescription, columnsChosen)),

    getCollections: () => dispatch(getCollections()),
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
        this.props.getCollections();
        // this.props.getCompProducts();
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

                            <Route exact path="/Order" component={() => <Order getProduct={this.props.getProduct} products={this.props.products} PostOrder={this.props.postOrder} />}></Route>
                            <Route exact path="/PostCategory" component={() => <PostCategory postCategory={this.props.postCategory} />}></Route>
                            <Route exact path="/PostProduct" component={() => <PostProduct postProduct={this.props.postProduct}
                                category={this.props.category} />}></Route>
                            <Route exact path="/UpdateProduct" component={() => <UpdateProduct updateProduct={this.props.updateProduct}
                                products={this.props.products} />}></Route>
            //////////////////////////
                            <Route exact path="/contact" component={Contact}></Route>

                            <Route exact path="/signin" component={
                                () =>
                                    <Signin auth={this.props.authState} authUser={this.props.authUser} logoutUser={this.props.logoutUser} />

                            }></Route>
                            <Route exact path="/signup" component={() => <Signup signup={this.props.signup} />}></Route>

                            <Route exact path="/showProduct" component={(props) => <ShowProduct {...props} auth={this.props.authState} category={this.props.category} getcategory={this.props.getcategory} />}></Route>

                            <Route exact path="/ourservice" component={OurService}></Route>
                            {/* <Route exact path="/phone" component={Phone}></Route>
                            <Route exact path="/TV" component={TV}></Route>
                            <Route exact path="/controller" component={controller}></Route>
                            <Route exact path="/computer" component={computercomp}></Route>
                            <Route exact path="/printer" component={Printer}></Route> */}
                            <Route exact path="/cart" component={Cart}></Route>

                            <Route exact path="/systembuilt" component={() =>
                                <Systembuild
                                    getCompProducts={this.props.getCompProducts}
                                    compProducts={this.props.compProducts}
                                    getCollections={this.props.getCollections}
                                    pcAndCustomCollections={this.props.pcAndCustomCollections}
                                    postCollection={this.props.postCollection}

                                />} />

                            <Route exact path="/systembuilt/components" component={() =>
                                <System
                                    getCompProducts={this.props.getCompProducts}
                                    compProducts={this.props.compProducts}
                                    categorys={this.props.categorys}
                                    postCollection={this.props.postCollection}
                                />} />

                            <Route exact path="/show_component" component={() => <ComponentTable getCompProducts={this.props.getCompProducts} compProducts={this.props.compProducts} />} />
                        </Switch>
                    </div>

                </CartContextProvider>
            </div >
        )
    }

}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));