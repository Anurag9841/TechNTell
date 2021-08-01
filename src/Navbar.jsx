import React, { useContext } from 'react'
import { NavLink, useHistory } from "react-router-dom"
import { CartContext } from "./CartContext"
import styles from "./App.css"
const Navbar = (props) => {
    var i = 0;
    const { qty } = useContext(CartContext)
    const history = useHistory();
    const categories = [];
    
    { props.categorys.category.map((category) => (categories.push(category.categoryName))) }

    const makeItem = (X) => {
        return <li key={X} onClick={() => handleClick(X)} ><NavLink activeClassName='menu_active' className="dropdown-item" to="/showProduct">{X}</NavLink></li>
    }
    // const getcateg=(X)=>{
    //     props.getcategory(X)

    // }
    const rend = (X) => {
        history.push({ pathname: "/showProduct", state: X })
    }

    const handleClick = (X) => {
        props.getcategory(X);
        for (i = 0; i < props.categorys.category.length; i++) {
            if (props.categorys.category[i].categoryName === X) {
                rend(props.categorys.category[i]);
                break;
            }
        }
    }

    if(props.auth.isAuthenticated && props.user.users.admin){
        return(
        <nav >
            <div className="main">
            <div className="container-fluid nav_bg">
                <div className="row">
                    <div className="col-12 mx-auto">

                
                        <nav className="navbar navbar-expand-lg navbar-light bg-light" data-spy="affix" data-offset-top="197">
                            <div className="container-fluid">
                                <NavLink className="navbar-brand" to="/">Tech N Tell</NavLink>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                                    <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                                        <li className="nav-item">
                                            <NavLink activeClassName='menu_active' className="nav-link active" aria-current="page" to="/">Home</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink activeClassName='menu_active' className="nav-link" to="/contact">Contact</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink activeClassName='menu_active' className="nav-link" to="/ourservice">OurService</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink activeClassName='menu_active' className="nav-link" to="/systembuilt">SystemBuild</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink activeClassName='menu_active' className="nav-link" to="/" onClick={props.logout}>logout</NavLink>
                                        </li>
                                        <li className="nav-item dropdown">
                                        <NavLink  className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                AdminPanel
                                        </NavLink>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <li><NavLink activeClassName='menu_active' className="dropdown-item" to="/PostCategory">New category</NavLink></li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li><NavLink activeClassName='menu_active' className="dropdown-item" to="/UpdateProduct">Update Product</NavLink></li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li><NavLink activeClassName='menu_active' className="dropdown-item" to="/Orderad">Order</NavLink></li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li><NavLink activeClassName='menu_active' className="dropdown-item" to="/PostProduct">New Product</NavLink></li>
                                        </ul>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Category
                                            </NavLink>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                {categories.map(makeItem)}
                                            </ul>
                                        </li>
                                        <li ><NavLink to="/cart">
                                            <span className="shoppingcart"> <i className="fas fa-cart-plus"></i><span className="
                                      cartcount">{qty}</span> </span> </NavLink></li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                
                    </div>
                </div>
            </div>
            </div>
        </nav>
        )}
    
    else if(props.auth.isAuthenticated){
        return (
            <nav >
                <div className="main">
                <div className="container-fluid nav_bg">
                    <div className="row">
                        <div className="col-10 mx-auto">
                        <NavLink activeClassName='menu_active' className="nav-link active" aria-current="page" to="/viewProduct"></NavLink>
                            <nav className="navbar navbar-expand-lg navbar-light bg-light" data-spy="affix" data-offset-top="197">
                                <div className="container-fluid">
                                    <NavLink className="navbar-brand" to="/">Tech N Tell</NavLink>
                                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    
                                        <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                                            <li className="nav-item">
                                                <NavLink activeClassName='menu_active' className="nav-link active" aria-current="page" to="/">Home</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink activeClassName='menu_active' className="nav-link" to="/contact">Contact</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink activeClassName='menu_active' className="nav-link" to="/ourservice">OurService</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink activeClassName='menu_active' className="nav-link" to="/systembuilt">SystemBuild</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink activeClassName='menu_active' className="nav-link active" aria-current="page" to="/order">Order</NavLink>
                                            </li>
                                            <li className="nav-item">
                                            <NavLink activeClassName='menu_active' className="nav-link" to="/" onClick={props.logout}>logout</NavLink>
                                        </li>
    
                                            <li className="nav-item dropdown">
                                                <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Category
                                                </NavLink>
                                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                    {categories.map(makeItem)}
                                                </ul>
                                            </li>
    
                                            <li ><NavLink to="/cart">
                                                <span className="shoppingcart"> <i className="fas fa-cart-plus"></i><span className="
                                          cartcount">{qty}</span> </span> </NavLink></li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                    
                        </div>
                    </div>
                </div>
                </div>
            </nav>
        )}
    else{
        return(
            <>
            <nav>
            <div className="main">
            <div className="container-fluid nav_bg">
                <div className="row">
                    <div className="col-10 mx-auto">
                    <NavLink activeClassName='menu_active' className="nav-link active" aria-current="page" to="/viewProduct"></NavLink>
                        <nav className="navbar navbar-expand-lg navbar-light bg-light" data-spy="affix" data-offset-top="197">
                            <div className="container-fluid">
                                <NavLink className="navbar-brand" to="/">Tech N Tell</NavLink>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                                    <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                                        <li className="nav-item">
                                            <NavLink activeClassName='menu_active' className="nav-link active" aria-current="page" to="/">Home</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink activeClassName='menu_active' className="nav-link" to="/contact">Contact</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink activeClassName='menu_active' className="nav-link" to="/signin">Sign In</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink activeClassName='menu_active' className="nav-link" to="/signup">Sign Up</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink activeClassName='menu_active' className="nav-link" to="/ourservice">OurService</NavLink>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Category
                                            </NavLink>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                {categories.map(makeItem)}
                                            </ul>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </nav>
                
                    </div>
                </div>
            </div>
            </div>
        </nav>
            </>
        )
    }
}
export default Navbar;

