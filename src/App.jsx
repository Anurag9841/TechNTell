import React from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { Route, Switch } from 'react-router-dom'
import Home from "./Home"
import Login from "./Login"
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
const App=()=>{
    return(
       <> 
       <CartContextProvider>
       <Navbar/>
        <Switch>
            <Route  exact path="/"component={Home}>
          
            </Route>
            <Route  exact path="/contact"component={Contact}></Route>
            <Route  exact path="/login"component={Login}></Route>
            <Route  exact path="/ourservice"component={OurService}></Route>
            <Route  exact path="/systembuilt"component={systembuild}></Route>
            <Route  exact path="/phone"component={Phone}></Route>
            <Route  exact path="/TV"component={TV}></Route>
            <Route  exact path="/controller"component={controller}></Route>
            <Route  exact path="/computer"component={computercomp}></Route>
            <Route  exact path="/printer"component={Printer}></Route>
            <Route  exact path="/cart" component={Cart}></Route>

        </Switch>
        
        </CartContextProvider>
        
        </>
    )
}
export default App;

