import React from "react"; 
import { NavLink } from "react-router-dom"; 

// import rujan from "./img/customise.jpg";
// import luitel from baseUrl+"img/safe.jpg";
// import returns from baseUrl+"img/return.jpg";
// import open from baseUrl+"img/open.jpg";
import { baseUrl } from "./shared/baseUrl";

const rujan = baseUrl+"images/our_service/customise.jpg";
const luitel = baseUrl+"images/our_service/safe.jpg";
const returns = baseUrl+"images/our_service/return.jpg";
const open = baseUrl+"images/our_service/open.jpg";


const OurService = () => {
    return (
     <>
<div className="service py-5">
<div className="container-fluid">
<div className="row">
<div className="col-md-10 col-11 mx-auto">
<div className="mt-2 mb-4 text-center">
    <h1 className="top_product">Our Services</h1>
</div> 
<div className="row"> 
{/* left side data  */}
<div className="col-md-6 mt-md-2 m-0">
<span className="badge-info badge rounded-pill px-3 py-1 my-2 font-weight-light">
What's New 
</span> 
<h4>Experience the best shopping website</h4>
<h6 className="font-weight-light subtitle">We provide you the best product at cheapest price. You can 
customise your PC according to your Budget.
</h6> 
{/* one more grid for services  */} 
<div className="row mt-md-5">
<div className="col-md-6 mt-3">
<h6 className="font-weight-medium">Return and Refund</h6> 
<p>You can Return your product within 2 days of shopping</p>
</div>
<div className="col-md-6 mt-3">
<h6 className="font-weight-medium">24/7 Customer Service</h6> 
<p>You can buy products at any time from Nepal</p>
</div>
<div className="col-md-6 mt-3">
<h6 className="font-weight-medium">Safe Online Shopping</h6> 
<p>Experience Safe Online Shopping</p>
</div>
<div className="col-md-6 mt-3">
<h6 className="font-weight-medium">Customise your PC</h6> 
<p>Get your desired PC at Cheapest Price</p>
</div>
<div className="col-lg-12 my-4">
<NavLink to="#" className="btn btn-sm btn-info">
check more
</NavLink>
</div>
</div>



</div> 
{/* right side data  */}
<div className="col-md-6 mt-md-5 m-0">
<div className="row wrap-service"> 
{/* left side image */}
<div className="col-md-6">
<div className="row">
<div className="col-md-12 img-hover mb-4">
<img src={returns} className="rounded img-shadow img-fluid" alt="comp1"/>
</div> 
<div className="col-md-12 img-hover mb-4">
<img src={rujan} className="rounded img-shadow img-fluid" alt="img"/>
</div>
</div>
</div> 
{/* right side image */}
<div className="col-md-6 uneven-box">
<div className="row">
<div className="col-md-12 img-hover mb-4">
<img src={luitel} className="rounded img-shadow img-fluid" alt="img"/>
</div> 
<div className="col-md-12 img-hover mb-4">
<img src={open} className="rounded img-shadow img-fluid" alt="img"/>
</div>
</div>
</div>
</div> 

</div>
</div>
</div>
</div>
</div>
</div>



     </>
    );
};

export default OurService;