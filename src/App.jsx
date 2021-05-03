import React from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { Route, Switch } from 'react-router-dom'
import Home from "./Home"
import Login from "./Login"
import Contact from "./Contact"
import Phone from "./Phone"
import Navbar from "./Navbar"


const App=()=>{
    return(
       <>
       <Navbar/>
        <Switch>npm
            <Route  exact path="/"component={Home}>
          
            </Route>
            <Route  exact path="/contact"component={Contact}></Route>
            <Route  exact path="/login"component={Login}></Route>
            <Route  exact path="/phone"component={Phone}></Route>
        </Switch>
         
        </>
    )
}
export default App;

