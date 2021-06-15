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
import {authUser,getUser,logoutUser, getProducts, postProduct, getCategories, 
    postCategory, getOrders, postOrder, deleteOrder, getOrderDetails, 
    updateProduct, getcategory , getProduct, deleteProduct
    ,delCategory,getproductsFromCategory,deleteproductsFromCategory
    ,updateOrder,
    signUp} from './redux/ActionCreators';
import { connect } from 'react-redux'
import PostCategory from './postCategory'
import PostProduct from './postProduct'
import UpdateProduct from './updateProduct'
import Order from './order';
import Login from "./Login";
import ShowProduct from './showProduct';
import Register from './register'
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
        signup:(fname,lname,username,email,password)=>dispatch(signUp(fname,lname,username,email,password)), 
        //
        getProducts: () => dispatch(getProducts()),
        getProduct: (productId) => dispatch(getProduct(productId)),
        postProduct:(categId,productName,description,unitPrice,unitsInStock,image,featured) => dispatch(postProduct(categId,productName,description,unitPrice,unitsInStock,image,featured)),
        updateProduct:(productId,productName,description,unitPrice,unitsInStock,image,featured)=>dispatch(updateProduct(productId,productName,description,unitPrice,unitsInStock,image,featured)),
        deleteProduct: (categId,productId)=>dispatch(deleteProduct(categId,productId)),
        //
        getCategories: () => dispatch(getCategories()),
        getcategory: (categId)=>dispatch(getcategory(categId)),
        delCategory: (categId)=>dispatch(delCategory(categId)),
        getproductsFromCategory:(categId)=>dispatch(getproductsFromCategory(categId)),
        deleteproductsFromCategory:(categId)=>dispatch(deleteproductsFromCategory(categId)),
        postCategory: (categoryName) => dispatch(postCategory(categoryName)),
        //
        getOrders: () => dispatch(getOrders()),
        postOrder: (productId,quantity, to_be_suppliedDate,shippedDate) => dispatch(postOrder(productId,quantity, to_be_suppliedDate,shippedDate)),
        deleteOrder: (orderId) => dispatch(deleteOrder(orderId)),
        updateOrder : (orderId,orderDetailsId,quantity, to_be_suppliedDate,shippedDate)=> dispatch( updateOrder(orderId,orderDetailsId,quantity, to_be_suppliedDate,shippedDate)),
        getOrderDetails: ()=> dispatch(getOrderDetails())
    }
)
class Main extends Component{
    componentDidMount(){
        this.props.getUser();
        this.props.getProducts();
        this.props.getCategories();
        this.props.getOrders();
        this.props.getOrderDetails();
    }
    
    

    render(){
        return(
       <div>
       <CartContextProvider>
       <Navbar category={this.props.category}/>
       <div className="main">
        <Switch>
        <Route exact path="/"component={() => <Home productsFeatured={this.props.products.product.filter((prod) => prod.featured)}/>}>            
        </Route>
        
            <Route exact path="/Order" component={()=><Order getProduct={this.props.getProduct} products={this.props.products} PostOrder={this.props.postOrder} />}></Route>
            <Route exact path="/PostCategory" component={()=><PostCategory postCategory= {this.props.postCategory} />}></Route>
            <Route exact path="/PostProduct" component={()=><PostProduct postProduct={this.props.postProduct}
            category={this.props.category}/>}></Route>
            <Route exact path="/UpdateProduct" component={()=><UpdateProduct updateProduct = {this.props.updateProduct}
            products={this.props.products}/>}></Route>
            //////////////////////////
            <Route  exact path="/contact"component={Contact}></Route>
            <Route exact path="/login" component={
                () => 
                <Login auth={this.props.authState} authUser={this.props.authUser} logoutUser={this.props.logoutUser}/>
                
            }></Route>
            <Route  exact path="/signup"component={()=><Register signup={this.props.signup}/>}></Route>
            <Route  exact path="/showProduct" component={()=><ShowProduct/>}></Route>
            <Route  exact path="/ourservice"component={OurService}></Route>
            <Route  exact path="/systembuilt"component={systembuild}></Route>
            <Route  exact path="/phone"component={Phone}></Route>
            <Route  exact path="/TV"component={TV}></Route>
            <Route  exact path="/controller"component={controller}></Route>
            <Route  exact path="/computer"component={computercomp}></Route>
            <Route  exact path="/printer"component={Printer}></Route>
            <Route  exact path="/cart" component={Cart}></Route>

        </Switch>
        </div>
    
        </CartContextProvider>
        </div>
    )
}

}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));